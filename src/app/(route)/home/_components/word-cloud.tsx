"use client";

import React from "react";
import { Wordcloud } from "@visx/wordcloud";
import { scaleLog } from "d3-scale";
import seedrandom from "seedrandom";
import { useGetIntertestKeywords } from "@/hooks/use-trends";

export default function WordCloudClient() {
  const { data } = useGetIntertestKeywords();

  const fontScale = scaleLog().domain([40, 90]).range([12, 60]);
  const rng = seedrandom("fixed-seed");

  const words =
    data?.map(({ keyword, weight }) => ({
      text: keyword,
      value: weight,
    })) ?? [];

  const getColorByWeight = (value: number) => {
    if (value >= 85) return "var(--color-primary-600)";
    if (value >= 75) return "var(--color-primary-500)";
    if (value >= 65) return "var(--color-primary-400)";
    if (value >= 55) return "var(--color-primary-300)";
    return "var(--color-primary-200)";
  };

  const wordMap = new Map(words.map((w) => [w.text, w.value]));

  return (
    <svg width={648} height={380}>
      <Wordcloud
        words={words}
        width={648}
        height={400}
        font="pretendard"
        fontSize={(d) => fontScale(d.value)}
        spiral="archimedean"
        padding={2}
        rotate={() => 0}
        random={() => rng()}
      >
        {(cloudWords) =>
          cloudWords.map((w, i) => (
            <text
              key={i}
              textAnchor="middle"
              transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
              fontSize={w.size}
              fontFamily={w.font}
              fontWeight={800}
              fill={getColorByWeight(wordMap.get(w.text ?? "") ?? 0)}
            >
              {w.text}
            </text>
          ))
        }
      </Wordcloud>
    </svg>
  );
}
