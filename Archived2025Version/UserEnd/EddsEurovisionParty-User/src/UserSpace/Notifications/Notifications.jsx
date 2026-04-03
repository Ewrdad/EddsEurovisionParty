import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { keydates } from "../keydates";

export const Notifications = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    console.log(now);

    for (const date of keydates) {
      const diff = date.date - now;
      const diffInMinutes = Math.floor(diff / 1000 / 60);
      if (diffInMinutes >= 5 && diffInMinutes <= 30) {
        toast.warning(`The ${date.name} is in ${diffInMinutes} minutes!`, {
          duration: 10000,
        });
      }
    }

    // Starting now alert
    for (const date of keydates) {
      const diff = date.date - now;
      const diffInMinutes = Math.floor(diff / 1000 / 60);
      if (diffInMinutes >= -3 && diffInMinutes <= 2) {
        toast.success(`The ${date.name} is starting now!`, {
          duration: 10000,
        });
      }
    }
  }, [now]);
  return <></>;
};
