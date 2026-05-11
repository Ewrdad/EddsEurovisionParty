async function simulate() {
  const url = "http://localhost:8080/admin/state";
  const token = "development_fallback_token";

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };

  const acts = ["NONE", "moldova-2026", "sweden-2026", "croatia-2026", "ukraine-2026", "norway-2026"];
  let currentIndex = 0;

  console.log("\x1b[35m%s\x1b[0m", "===========================================");
  console.log("\x1b[35m%s\x1b[0m", "🚀 Eurovision Detection Server Simulation");
  console.log("\x1b[35m%s\x1b[0m", "===========================================");
  console.log(`Target: ${url}`);
  console.log("Press Ctrl+C to exit.\n");

  setInterval(async () => {
    const actId = acts[currentIndex];
    const showId = "grand-final";
    
    // Occasionally send a message with an image
    const message = currentIndex === 2 ? {
      text: "Voting will open soon! Get your points ready 🎶",
      type: "info",
      duration: 6000
    } : currentIndex === 4 ? {
       text: "Sweden is bringing the house down! 🇸🇪",
       type: "success",
       imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=500",
       duration: 7000
    } : undefined;

    console.log(`[\x1b[36m${new Date().toLocaleTimeString()}\x1b[0m] Pushing update -> Act: \x1b[33m${actId}\x1b[0m${message ? ` | Msg: \x1b[32m${message.text}\x1b[0m` : ""}`);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({ actId, showId, message })
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
