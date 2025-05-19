"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function Loading() {
   const { progress, active } = useProgress();
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // If nothing is being loaded (active is false) and progress is 0,
    // we can assume there are no models to load
    if (!active && progress === 0) {
      setIsDone(true);
      hidePreLoading();
      
    } else if (progress >= 100 && !isDone) {
      setIsDone(true);
      hidePreLoading();
    }
  }, [progress, active, isDone]);

  const hidePreLoading = () => {
  setTimeout(() => {
    const preLoadingDiv = document.getElementById("pre-loading");
    if (preLoadingDiv) {
      preLoadingDiv.classList.add("hidden");
      preLoadingDiv.classList.remove("flex");
    }
  }, 600);
  };

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
