"use client";

import dynamic from "next/dynamic";

// dynamic import로 클라이언트에서만 WordCloud 로드
const WordCloudClient = dynamic(() => import("./word-cloud"), {
  ssr: false,
});

export default function WordCloudtWrapper() {
  return <WordCloudClient />;
}
