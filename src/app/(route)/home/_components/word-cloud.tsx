"use client";

import React from "react";
import { Wordcloud } from "@visx/wordcloud";
import { scaleLog } from "d3-scale";

const words = [
  { text: "React", value: 40 },
  { text: "Next.js", value: 30 },
  { text: "TypeScript", value: 25 },
  { text: "Node", value: 20 },
];

export default function WordCloudClient() {
  const fontScale = scaleLog().domain([5, 40]).range([10, 60]);

  return (
    <svg width={648} height={400}>
      <Wordcloud
        words={words}
        width={500}
        height={400}
        font="Impact"
        fontSize={(d) => fontScale(d.value)}
        spiral="archimedean"
        padding={2}
        rotate={() => 0}
        random={() => Math.random()}
      >
        {(cloudWords) =>
          cloudWords.map((w, i) => (
            <text
              key={i}
              textAnchor="middle"
              transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
              fontSize={w.size}
              fontFamily={w.font}
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
