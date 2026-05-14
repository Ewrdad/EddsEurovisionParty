import dotenv from "dotenv";
dotenv.config();

async function simulate() {
  const port = process.env.PORT || "8080";
  const url = `http://localhost:${port}/admin/state`;
  const token = process.env.ADMIN_TOKEN || "development_fallback_token";

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };

  // Up-to-date acts from the 2026 event
  const acts = [
    "NONE", 
    "moldova-2026", 
    "sweden-2026", 
    "croatia-2026", 
    "greece-2026", 
    "portugal-2026",
    "georgia-2026",
    "finland-2026",
    "estonia-2026",
    "israel-2026",
    "belgium-2026",
    "lithuania-2026",
    "ukraine-2026",
    "norway-2026"
  ];
  let currentIndex = 0;

  console.log("\x1b[35m%s\x1b[0m", "===========================================");
  console.log("\x1b[35m%s\x1b[0m", "🚀 Eurovision Detection Server Simulation");
  console.log("\x1b[35m%s\x1b[0m", "===========================================");
  console.log(`Target: ${url}`);
  console.log(`Token:  ${token.substring(0, 4)}...${token.substring(token.length - 4)}`);
  console.log("Press Ctrl+C to exit.\n");

  setInterval(async () => {
    const actId = acts[currentIndex];
    const showId = "grand-final";
    const isLive = actId !== "NONE";
    
    // Occasionally send a message with an image
    const message = currentIndex === 2 ? {
      text: "Voting will open soon! Get your points ready 🎶",
      type: "info",
      duration: 6000
    } : currentIndex === 7 ? {
       text: "Finland is bringing the fire! 🇫🇮",
       type: "success",
       imageUrl: "https://images.unsplash.com/photo-1527333656061-ca7adf608ae1?q=80&w=500",
       duration: 7000
    } : currentIndex === 12 ? {
      text: "Support for Ukraine remains strong 🇺🇦",
      type: "warning",
      duration: 5000
    } : undefined;

    console.log(`[\x1b[36m${new Date().toLocaleTimeString()}\x1b[0m] Pushing update -> Act: \x1b[33m${actId}\x1b[0m | Live: \x1b[34m${isLive}\x1b[0m${message ? ` | Msg: \x1b[32m${message.text}\x1b[0m` : ""}`);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({ actId, showId, isLive, message })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`\x1b[32m✔ Success:\x1b[0m`, JSON.stringify(data.state));
      } else {
        const errorText = await response.text();
        console.error(`\x1b[31m✘ Error ${response.status}:\x1b[0m`, errorText);
      }
    } catch (e) {
      console.error(`\x1b[31m✘ Connection failed.\x1b[0m Is the SyncServer running?`);
    }

    currentIndex = (currentIndex + 1) % acts.length;
  }, 5000); 
}

simulate();
