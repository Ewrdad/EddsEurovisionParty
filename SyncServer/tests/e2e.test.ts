import { app, server, wsHandler } from "../src/index";
import { WebSocket } from "ws";
import { describe, it, expect, beforeAll, afterAll } from "vitest";

describe("SyncServer E2E", () => {
  let port: number;
  let wsClient: WebSocket;

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
    if (wsClient) {
      wsClient.close();
    }
    wsHandler.close();
    await new Promise<void>((resolve) => {
      server.close(() => resolve());
    });
  });

  it("should send initial state on connect", () => {
    return new Promise<void>((resolve) => {
      wsClient = new WebSocket(`ws://localhost:${port}`);
      
      const receivedMessages: any[] = [];
      
      wsClient.on("message", (data) => {
        const msg = JSON.parse(data.toString());
        receivedMessages.push(msg);
        
        if (receivedMessages.length === 3) {
          const actMsg = receivedMessages.find(m => m.type === "ACT_CHANGE");
          const showMsg = receivedMessages.find(m => m.type === "SHOW_CHANGE");
          const liveMsg = receivedMessages.find(m => m.type === "LIVE_STATUS");
          
          expect(actMsg).toBeDefined();
          expect(actMsg.actId).toBe("NONE");
          
          expect(showMsg).toBeDefined();
          expect(showMsg.showId).toBe("grand-final");

          expect(liveMsg).toBeDefined();
          expect(liveMsg.isLive).toBe(false);
          
          resolve();
        }
      });
    });
  });

  it("should broadcast live status changes when admin updates state", () => {
    return new Promise<void>(async (resolve) => {
      // Setup a listener for the change
      wsClient.on("message", (data) => {
        const msg = JSON.parse(data.toString());
        if (msg.type === "LIVE_STATUS" && msg.isLive === true) {
          resolve();
        }
      });

      // Send authorized admin request
      const res = await fetch(`http://localhost:${port}/admin/state`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer development_fallback_token" 
        },
        body: JSON.stringify({ isLive: true })
      });
      
      expect(res.status).toBe(200);
      const resData = await res.json();
      expect(resData.success).toBe(true);
      expect(resData.state.isLive).toBe(true);
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
    return new Promise<void>(async (resolve) => {
      // Setup a listener for the change
      wsClient.once("message", (data) => {
        const msg = JSON.parse(data.toString());
        if (msg.type === "ACT_CHANGE") {
          expect(msg.actId).toBe("spain-2026");
          resolve();
        }
      });

      // Send authorized admin request
      const res = await fetch(`http://localhost:${port}/admin/state`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer development_fallback_token" 
        },
        body: JSON.stringify({ actId: "spain-2026" })
      });
      
      expect(res.status).toBe(200);
      const resData = await res.json();
      expect(resData.success).toBe(true);
      expect(resData.state.actId).toBe("spain-2026");
    });
  });
});
