"use client";

import LoadingSpinner from "@/components/loading-spinner";
import dynamic from "next/dynamic";

const WordCloudClient = dynamic(() => import("./word-cloud"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

export default function WordCloudtWrapper() {
  return <WordCloudClient />;
}
