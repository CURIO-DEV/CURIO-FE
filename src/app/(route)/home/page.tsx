"use client";

import Banner from "./_components/banner";

export default function Home() {
  const handleClick = () => {
    // TODO: 페이지 전환
  };

  const handleEdit = () => {
    // TODO: 페이지 전환
  };

  const array = ["사회", "경제", "정치", "연예"];

  return (
    <div className="mt-6 flex flex-col gap-6 pr-10">
      <Banner onClick={handleClick} />
      <div className="flex border-t border-b border-gray-200 py-4 pr-4.5 pl-18">
        {array.map((item, index) => (
          <button key={index} className="flex w-full justify-between">
            {item}
          </button>
        ))}
        <img src="/assets/edit.svg" alt="edit" onClick={handleEdit} />
      </div>
    </div>
  );
}
