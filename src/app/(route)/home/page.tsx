"use client";

import Banner from "./_components/banner";

export default function Home() {
  const handleClick = () => {
    // TODO: 페이지 전환
  };
  return (
    <div className="mt-6 pr-10">
      <Banner onClick={handleClick} />
    </div>
  );
}
