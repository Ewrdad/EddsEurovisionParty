import { WebSocketServer, WebSocket } from "ws";
import http from "http";

export interface ServerState {
  actId: string | null;
  showId: string;
  isLive: boolean;
}

interface ExtendedWebSocket extends WebSocket {
  isAlive: boolean;
}

export function setupWebSocket(server: http.Server) {
  const wss = new WebSocketServer({ server });
  
  let currentState: ServerState = {
    actId: "NONE",
    showId: "grand-final",
    isLive: false
  };

  const clients = new Set<ExtendedWebSocket>();

  function broadcastState(ws?: ExtendedWebSocket) {
    const actMessage = JSON.stringify({ type: "ACT_CHANGE", actId: currentState.actId });
    const showMessage = JSON.stringify({ type: "SHOW_CHANGE", showId: currentState.showId });
    const liveMessage = JSON.stringify({ type: "LIVE_STATUS", isLive: currentState.isLive });
    
    if (ws) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(actMessage);
        ws.send(showMessage);
        ws.send(liveMessage);
      }
      return;
    }

    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(actMessage);
        client.send(showMessage);
        client.send(liveMessage);
      }
    });
  }

  // Heartbeat interval to check for stale connections
  const interval = setInterval(() => {
    clients.forEach((ws) => {
      if (ws.isAlive === false) {
        console.log("[WS] Terminating stale connection");
        return ws.terminate();
      }
      ws.isAlive = false;
      ws.ping();
    });
  }, 30000);

  wss.on("connection", (ws: ExtendedWebSocket, req) => {
    ws.isAlive = true;
    clients.add(ws);
    
    console.log(`[WS] New client connected from ${req.socket.remoteAddress}. Total: ${clients.size}`);
    
    // Send current state immediately upon connection
    broadcastState(ws);

    ws.on("pong", () => {
      ws.isAlive = true;
    });

    ws.on("close", () => {
      clients.delete(ws);
      console.log(`[WS] Client disconnected. Total: ${clients.size}`);
    });

    ws.on("error", (error) => {
      console.error("[WS] Socket error:", error);
      clients.delete(ws);
    });
  });

  wss.on("close", () => {
    clearInterval(interval);
  });

  return {
    setAct: (actId: string | null) => {
      if (currentState.actId !== actId) {
        console.log(`[State] Act Change: ${currentState.actId} -> ${actId}`);
        currentState.actId = actId;
        broadcastState();
      }
    },
    setShow: (showId: string) => {
      if (currentState.showId !== showId) {
        console.log(`[State] Show Change: ${currentState.showId} -> ${showId}`);
        currentState.showId = showId;
        broadcastState();
      }
    },
    setLive: (isLive: boolean) => {
      if (currentState.isLive !== isLive) {
        console.log(`[State] Live Status Change: ${currentState.isLive} -> ${isLive}`);
        currentState.isLive = isLive;
        broadcastState();
      }
    },
    getState: () => ({ ...currentState }),
    getConnectionCount: () => clients.size,
    broadcastMessage: (message: any) => {
      console.log(`[Message] Broadcasting: "${message.text}"`);
      const payload = JSON.stringify({ 
        type: "MESSAGE", 
        id: message.id || Math.random().toString(36).substring(2, 15),
        text: message.text,
        imageUrl: message.imageUrl,
        message_type: message.type || "info",
        duration: message.duration || 5000
      });
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(payload);
        }
      });
    },
    close: () => {
      clearInterval(interval);
      wss.clients.forEach(c => c.close());
      wss.close();
    }
  };
}
