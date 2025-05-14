"use client";
import dynamic from "next/dynamic";

// Dynamically import ReactSwagger with SSR disabled
const ReactSwagger = dynamic(() => import("./react-swagger"), { ssr: false });

export default function IndexPage() {
  return (
    <section className="bg-white">
      <ReactSwagger />
    </section>
  );
}
