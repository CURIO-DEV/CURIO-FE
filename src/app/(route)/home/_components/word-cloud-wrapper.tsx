"use client";

import dynamic from "next/dynamic";

const WordCloudClient = dynamic(() => import("./word-cloud"), {
  ssr: false,
});

export default function WordCloudtWrapper() {
  return <WordCloudClient />;
}
