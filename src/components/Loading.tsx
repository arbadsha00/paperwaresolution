// src/components/ui/SimpleLoader.tsx
"use client";

import { useProgress } from "@react-three/drei";

export default function Loading() {
  const { progress } = useProgress();
  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span className="absolute inset-0 grid place-items-center text-xs font-bold text-white">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}