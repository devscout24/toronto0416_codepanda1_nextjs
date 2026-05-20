"use client";

import { useEffect } from "react";

function scrollToCurrentHash() {
  const hash = window.location.hash;
  if (!hash) return;

  const id = decodeURIComponent(hash.slice(1));
  if (!id) return;

  const target = document.getElementById(id);
  if (!target) return;

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function HashScrollHandler() {
  useEffect(() => {
    let attempts = 0;

    const tryScroll = () => {
      attempts += 1;
      scrollToCurrentHash();

      if (window.location.hash && attempts < 20) {
        const id = decodeURIComponent(window.location.hash.slice(1));
        if (!document.getElementById(id)) {
          window.setTimeout(tryScroll, 100);
        }
      }
    };

    // Delay slightly so async sections have time to mount after navigation.
    window.setTimeout(tryScroll, 0);

    const onHashChange = () => scrollToCurrentHash();
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return null;
}
