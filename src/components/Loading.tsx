"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function Loading() {
  const { progress } = useProgress();
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Only mark as done when progress hits 100%
    if (progress >= 100 && !isDone) {
      setIsDone(true);

      // Hide external loader
      const preLoadingDiv = document.getElementById("pre-loading");
      if (preLoadingDiv) {
        preLoadingDiv.classList.add("hidden");
        preLoadingDiv.classList.remove("flex");
      }
    }
  }, [progress, isDone]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] items-center justify-center  ${
        progress < 100 ? "flex" : "hidden"
      }`}
    >
      <div className="w-46">
        <div
          className="h-2 bg-black transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
