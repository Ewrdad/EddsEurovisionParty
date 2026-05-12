import express from "express";
import http from "http";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { setupWebSocket } from "./websocket";
import { config } from "./config";
import { startTestMode } from "./test-mode";
import { StateUpdateSchema } from "./schemas";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Debug logging middleware
if (config.debug) {
  app.use((req, res, next) => {
    console.log(`[Debug] ${req.method} ${req.url} from ${req.ip}`);
    next();
  });
}

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Eurovision Sync Server API",
      version: "1.0.0",
      description: "Real-time synchronization server for Eurovision party events",
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: "Local development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
  },
  apis: ["./src/index.ts"], // files containing annotations
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Set up WebSocket server attached to the HTTP server
const wsHandler = setupWebSocket(server);

// Log WebSocket upgrade attempts in debug mode
if (config.debug) {
  server.on("upgrade", (req, socket, head) => {
    console.log(`[Debug] WS Upgrade request from ${req.socket.remoteAddress} for ${req.url}`);
  });
}

/**
 * @openapi
 * /admin/state:
 *   post:
 *     summary: Update the current Eurovision state or push a message
 *     description: Used by the Detection Server to update the live act, show, or send a global notification.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               actId:
 *                 type: string
 *                 nullable: true
 *                 example: "sweden-2026"
 *               showId:
 *                 type: string
 *                 example: "grand-final"
 *               message:
 *                 type: object
 *                 properties:
 *                   text:
 *                     type: string
 *                     example: "Voting starts in 5 minutes!"
 *                   type:
 *                     type: string
 *                     enum: [info, success, warning, error]
 *                     default: info
 *                   duration:
 *                     type: number
 *                     default: 5000
 *     responses:
 *       200:
 *         description: State updated or message sent successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid request body
 */
app.post("/admin/state", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${config.adminToken}`) {
    console.warn(`[Auth] Unauthorized access attempt from ${req.ip}`);
    return res.status(401).json({ error: "Unauthorized" });
  }

  const result = StateUpdateSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Invalid request", details: result.error.format() });
  }

  const { actId, showId, isLive, message } = result.data;
  
  if (actId !== undefined) {
    wsHandler.setAct(actId);
  }
  if (showId !== undefined) {
    wsHandler.setShow(showId);
  }
  if (isLive !== undefined) {
    wsHandler.setLive(isLive);
  }
  if (message !== undefined) {
    wsHandler.broadcastMessage(message);
  }

  res.json({ success: true, state: wsHandler.getState() });
});

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     responses:
 *       200:
 *         description: Server is healthy
 */
app.get("/health", (req, res) => {
  res.json({ status: "ok", connections: wsHandler.getConnectionCount() });
});

if (process.env.NODE_ENV !== "test") {
  server.listen(config.port, () => {
    console.log(`[Server] SyncServer listening on port ${config.port}`);
    console.log(`[Docs] API documentation available at http://localhost:${config.port}/docs`);
    console.log(`[Auth] Admin token: ${config.adminToken}`);
    
    if (config.isTestMode) {
      console.log("[Test Mode] Enabled: starting simulated live stream...");
      startTestMode(wsHandler);
    }
  });
}

export { app, server, wsHandler };
