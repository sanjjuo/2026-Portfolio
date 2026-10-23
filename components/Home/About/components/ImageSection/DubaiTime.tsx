"use client";
import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Dubai",
  hour: "numeric",
  minute: "2-digit",
});

const subscribe = (onTick: () => void) => {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
};

// The server has no visitor clock, so the time appears once the page loads in the browser.
export default function DubaiTime() {
  const time = useSyncExternalStore(
    subscribe,
    () => formatter.format(Date.now()),
    () => null,
  );

  return (
    <span>
      Dubai
      {time && (
        <>
          {" · "}
          <time>{time}</time>
        </>
      )}
    </span>
  );
}
