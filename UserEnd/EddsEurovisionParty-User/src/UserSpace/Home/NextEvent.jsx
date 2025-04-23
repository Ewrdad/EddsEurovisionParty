import { useEffect, useState } from "react";
import { keydates } from "../keydates";

export const NextEvent = () => {
  const [now, setNow] = useState(new Date());
  const [nextEvent, setNextEvent] = useState(null);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 10000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    const timeTillNextEvent = () => {
      const now = new Date();
      const sortedKeydates = keydates.sort((a, b) => a.date - b.date);
      const nextEvent = sortedKeydates.find((event) => event.date > now);
      if (nextEvent) {
        const diff = nextEvent.date - now;
        const diffInMinutes = Math.floor(diff / 1000 / 60);
        return { diff: diffInMinutes, name: nextEvent.name };
      }
      return null;
    };
    setNextEvent(timeTillNextEvent());
  }, [now]);

  if (!nextEvent) {
    return null;
  }
  return (
    <p className="animate-pulse">
      Time till {nextEvent.name} : {Math.floor(nextEvent.diff / 60)} hr{" "}
      {nextEvent.diff % 60} min
    </p>
  );
};
