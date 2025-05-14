"use client";

import { Loader } from "lucide-react";

export default function SimpleLoading() {
  return (
    <div className="flex flex-row items-center justify-center space-x-2 gap-y-4 border mt-10">
      <div className="flex flex-row w-[50%]">
        <span className="text-sm text-green-500 text-center">
          Data kamu sedang dimuat yaa...
        </span>
      </div>
      <Loader className="animate-spin text-green-500" />
    </div>
  );
}
