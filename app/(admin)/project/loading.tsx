"use client";

import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="px-52 py-52 w-full flex flex-row items-center justify-center space-x-2 gap-y-4 mt-10">
      <Loader className="animate-spin text-green-500" />
      <div className="flex flex-row">
        <span className="text-sm text-center">Loading ...</span>
      </div>
    </div>
  );
}
