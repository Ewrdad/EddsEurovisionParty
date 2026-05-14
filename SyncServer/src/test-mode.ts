import { setupWebSocket } from "./websocket";

// Mock list of acts matching frontend IDs for cycling in test mode
const mockActs = [
  "uk-2026",
  "sweden-2026",
  "croatia-2026",
  "ukraine-2026",
  "norway-2026",
  "NONE"
];

export function startTestMode(wsHandler: ReturnType<typeof setupWebSocket>) {
  let currentIndex = 0;

  // Every 10 seconds, change the act to the next one in the list
  setInterval(() => {
    const nextAct = mockActs[currentIndex];
    console.log(`[Test Mode] Changing act to: ${nextAct}`);

    wsHandler.setAct(nextAct);

    // REMOVED: Automatic show cycling to prevent overriding manual "Set Show" commands

    currentIndex = (currentIndex + 1) % mockActs.length;
  }, 10000); 
}
