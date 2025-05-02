"use client";

import { useState } from "react";
import Banner from "./_components/banner";
import Modal from "@/components/modal";
import Button from "@/components/button";
import Chip from "./_components/chip";
import { CATEGORIES, DEFAULT_CATEGORIES } from "@/constants/categories";
import ArticleCard from "@/components/article";
import { EditIcon } from "assets";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(DEFAULT_CATEGORIES);
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);

  const handleClick = () => {
    // TODO: 페이지 전환
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleApply = () => {
    setIsModalOpen(false);
    setCategories(selectedCategories);
  };

  const handleCategoryClick = (item: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      } else {
        if (prev.length < 4) {
          return [...prev, item];
        } else {
          return prev;
          //TODO: 토스트 이벤트
        }
      }
    });
  };

  const articles = Array.from({ length: 5 }, (_, i) => ({
    id: `${i + 1}`,
    title: `뉴스 기사 ${i + 1}`,
    summary: `이것은 뉴스 기사 ${i + 1}의 요약입니다.이것은 뉴스 기사 ${i + 1}의 요약입니다.이것은 뉴스 기사 ${i + 1}의 요약입니다.이것은 뉴스 기사 ${i + 1}의 요약입니다.이것은 뉴스 기사 ${i + 1}의 요약입니다.이것은 뉴스 기사 ${i + 1}의 요약입니다.이것은 뉴스 기사 ${i + 1}의 요약입니다.이것은 뉴스 기사 ${i + 1}의 요약입니다.이것은 뉴스 기사 ${i + 1}의 요약입니다.이것은 뉴스 기사 ${i + 1}의 요약입니다.이것은 뉴스 기사 ${i + 1}의 요약입니다.이것은 뉴스 기사 ${i + 1}의 요약입니다.이것은 뉴스 기사 ${i + 1}의 요약입니다.이것은 뉴스 기사 ${i + 1}의 요약입니다.`,
    imageUrl: "/images/newThums.png",
    publishedAt: "2025-04-20",
  }));

  return (
    <div className="mt-6 flex flex-col gap-6 pr-10">
      <Banner onClick={handleClick} />
      <div className="flex justify-between border-t border-b border-gray-200 py-4 pr-4.5 pl-18">
        <div className="grid w-full grid-cols-4">
          {categories.map((item, index) => (
            <button key={index} className="text-left hover:underline">
              {item}
            </button>
          ))}
        </div>
        <EditIcon onClick={handleEdit} />
      </div>
      <div className="flex flex-col gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      {isModalOpen && (
        <Modal title="카테고리 수정하기" onClick={handleClose}>
          <div className="my-7 flex w-102 flex-wrap justify-center gap-x-2 gap-y-3">
            {CATEGORIES.map((item) => (
              <Chip
                key={item}
                selected={selectedCategories.includes(item)}
                onClick={() => handleCategoryClick(item)}
              >
                {item}
              </Chip>
            ))}
          </div>
          <Button onClick={handleApply}>신청하기</Button>
        </Modal>
      )}
    </div>
  );
}
