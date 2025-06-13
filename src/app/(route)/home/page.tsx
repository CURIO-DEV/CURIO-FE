"use client";

import { useEffect, useState } from "react";
import Banner from "./_components/banner";
import Modal from "@/components/modal";
import Button from "@/components/button";
import Chip from "./_components/chip";
import { CATEGORIES, DEFAULT_CATEGORIES } from "@/constants/categories";
import ArticleCard from "@/components/article";
import { EditIcon } from "assets";
import {
  useGetUserInterests,
  useGetUserInterestsNews,
  usePatchUserInterests,
} from "@/hooks/use-user";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: userInterests } = useGetUserInterests();
  const [categories, setCategories] = useState<string[]>(
    userInterests?.interests ?? DEFAULT_CATEGORIES,
  );

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    userInterests?.interests ?? DEFAULT_CATEGORIES,
  );

  const [selectedCategory, setSelectedCategory] = useState<string>(
    selectedCategories[0],
  );

  const { mutate } = usePatchUserInterests();

  const { data: userInterestsNews } = useGetUserInterestsNews(selectedCategory);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (userInterests?.interests) {
      setCategories(userInterests.interests);
      setSelectedCategories(userInterests.interests);
    }
  }, [userInterests]);

  const handleApply = () => {
    setIsModalOpen(false);
    setCategories(selectedCategories);
    mutate(selectedCategories);
    setSelectedCategory(selectedCategories[0]);
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

  const handleCategoryButtonClick = (item: string) => {
    setSelectedCategory(item);
  };

  return (
    <div className="mt-6 flex flex-col gap-6 pr-10">
      <Banner />
      <div className="flex justify-between border-t border-b border-gray-200 py-4 pr-4.5 pl-18">
        <div className="grid w-full grid-cols-4">
          {categories.map((item, index) => (
            <button
              key={index}
              className="text-left hover:underline"
              onClick={() => handleCategoryButtonClick(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <EditIcon onClick={handleEdit} className="cursor-pointer" />
      </div>
      <div className="flex flex-col gap-4">
        {userInterestsNews?.map((article) => (
          <ArticleCard key={article.articleId} article={article} />
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
          <Button onClick={handleApply}>수정하기</Button>
        </Modal>
      )}
    </div>
  );
}
