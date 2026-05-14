import { WebSocketServer, WebSocket } from "ws";
import http from "http";
import { config } from "./config";

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

  if (config.debug) {
    console.log("[Debug] WebSocket server initialized and attached to HTTP server");
  }
  
  let currentState: ServerState = {
    actId: "NONE",
    showId: "grand-final",
    isLive: false
  };

  const clients = new Set<ExtendedWebSocket>();

  function broadcastState(ws?: ExtendedWebSocket) {
    const actId = currentState.actId || "NONE";
    
    // Individual messages for legacy support and granular updates
    const actMessage = JSON.stringify({ type: "ACT_CHANGE", actId });
    const showMessage = JSON.stringify({ type: "SHOW_CHANGE", showId: currentState.showId });
    const liveMessage = JSON.stringify({ type: "LIVE_STATUS", isLive: currentState.isLive });
    
    // Unified state message for more efficient UI updates and smoother transitions
    const stateUpdateMessage = JSON.stringify({ 
      type: "STATE_UPDATE", 
      state: { 
        ...currentState, 
        actId 
      } 
    });
    
    const sendAll = (client: ExtendedWebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(actMessage);
        client.send(showMessage);
        client.send(liveMessage);
        client.send(stateUpdateMessage);
      }
    };

    if (ws) {
      sendAll(ws);
      return;
    }

    clients.forEach(sendAll);
  }

  // Heartbeat interval to check for stale connections
  const interval = setInterval(() => {
    if (config.debug && clients.size > 0) {
      console.log(`[Debug] WS Heartbeat: checking ${clients.size} clients`);
    }
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
    
    const clientIp = req.socket.remoteAddress;
    console.log(`[WS] New client connected from ${clientIp}. Total: ${clients.size}`);
    
    if (config.debug) {
      console.log(`[Debug] WS Connection headers from ${clientIp}:`, JSON.stringify(req.headers));
    }

    // Send current state immediately upon connection
    broadcastState(ws);

    ws.on("pong", () => {
      ws.isAlive = true;
      if (config.debug) {
        console.log(`[Debug] WS Pong received from ${clientIp}`);
      }
    });

    ws.on("close", (code, reason) => {
      clients.delete(ws);
      console.log(`[WS] Client disconnected from ${clientIp}. Code: ${code}. Total: ${clients.size}`);
      if (config.debug && reason && reason.length > 0) {
        console.log(`[Debug] WS Disconnect reason: ${reason}`);
      }
    });

    ws.on("error", (error) => {
      console.error(`[WS] Socket error from ${clientIp}:`, error);
      clients.delete(ws);
    });
  });

  wss.on("close", () => {
    clearInterval(interval);
  });

  return {
    updateState: (updates: Partial<ServerState>) => {
      let changed = false;
      if (updates.actId !== undefined && currentState.actId !== updates.actId) {
        console.log(`[State] Act Change: ${currentState.actId} -> ${updates.actId}`);
        currentState.actId = updates.actId;
        changed = true;
      }
      if (updates.showId !== undefined && currentState.showId !== updates.showId) {
        console.log(`[State] Show Change: ${currentState.showId} -> ${updates.showId}`);
        currentState.showId = updates.showId;
        changed = true;
      }
      if (updates.isLive !== undefined && currentState.isLive !== updates.isLive) {
        console.log(`[State] Live Status Change: ${currentState.isLive} -> ${updates.isLive}`);
        currentState.isLive = updates.isLive;
        changed = true;
      }
      
      if (changed) {
        broadcastState();
      }
    },
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
        msg_type: message.type || "info", // Add variants for safety
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
