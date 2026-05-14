import { server, wsHandler } from "../src/index";
import { WebSocket } from "ws";
import { describe, it, expect, beforeAll, afterAll } from "bun:test";

describe("SyncServer E2E", () => {
  let port: number;

  beforeAll(async () => {
    // Start server on a random ephemeral port
    await new Promise<void>((resolve) => {
      server.listen(0, () => {
        const address = server.address();
        if (address && typeof address === "object") {
          port = address.port;
        }
        resolve();
      });
    });
  });

  afterAll(async () => {
    wsHandler.close();
    server.close();
  });

  it("should send initial state on connect", () => {
    return new Promise<void>((resolve, reject) => {
      const wsClient = new WebSocket(`ws://localhost:${port}`);
      
      wsClient.on("message", (data) => {
        const msg = JSON.parse(data.toString());
        if (msg.type === "STATE_UPDATE") {
          const { state } = msg;
          try {
            expect(state.actId).toBe("NONE");
            expect(state.showId).toBe("grand-final");
            expect(state.isLive).toBe(false);
            wsClient.close();
            resolve();
          } catch (e) {
            wsClient.close();
            reject(e);
          }
        }
      });
    });
  });

  it("should broadcast live status changes when admin updates state", () => {
    return new Promise<void>(async (resolve, reject) => {
      const wsClient = new WebSocket(`ws://localhost:${port}`);
      let initialReceived = false;

      wsClient.on("message", async (data) => {
        const msg = JSON.parse(data.toString());
        if (msg.type === "STATE_UPDATE") {
          if (!initialReceived) {
            initialReceived = true;
            // Now trigger the update
            const res = await fetch(`http://localhost:${port}/admin/state`, {
              method: "POST",
              headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer development_fallback_token" 
              },
              body: JSON.stringify({ isLive: true })
            });
            if (res.status !== 200) reject(new Error("Failed to update state"));
          } else if (msg.state.isLive === true) {
            wsClient.close();
            resolve();
          }
        }
      });
    });
  });

  it("should block unauthorized admin requests", async () => {
    const res = await fetch(`http://localhost:${port}/admin/state`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ actId: "spain" })
    });
    
    expect(res.status).toBe(401);
  });

  it("should broadcast state changes when admin updates state", () => {
    return new Promise<void>(async (resolve, reject) => {
      const wsClient = new WebSocket(`ws://localhost:${port}`);
      let updateTriggered = false;

      wsClient.on("message", async (data) => {
        const msg = JSON.parse(data.toString());
        if (msg.type === "STATE_UPDATE") {
          if (msg.state.actId === "spain-2026") {
            wsClient.close();
            resolve();
          } else if (!updateTriggered) {
            updateTriggered = true;
            const res = await fetch(`http://localhost:${port}/admin/state`, {
              method: "POST",
              headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer development_fallback_token" 
              },
              body: JSON.stringify({ actId: "spain-2026" })
            });
            if (res.status !== 200) reject(new Error("Failed to update state"));
          }
        }
      });
    });
  });
});
