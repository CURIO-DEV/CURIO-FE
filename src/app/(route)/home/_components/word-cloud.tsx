"use client";

import React from "react";
import { Wordcloud } from "@visx/wordcloud";
import { scaleLog } from "d3-scale";
import seedrandom from "seedrandom";

const words = [
  { text: "대선", value: 40 },
  { text: "윤석열", value: 30 },
  { text: "대한민국", value: 25 },
  { text: "정부", value: 20 },
];

export default function WordCloudClient() {
  const fontScale = scaleLog().domain([5, 40]).range([10, 60]);

  const rng = seedrandom("fixed-seed");

  return (
    <svg width={648} height={400}>
      <Wordcloud
        words={words}
        width={500}
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
              fill="#5177ff"
            >
              {w.text}
            </text>
          ))
        }
      </Wordcloud>
    </svg>
  );
}
