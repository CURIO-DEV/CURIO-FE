"use client";

import { useEffect, useRef, useState } from "react";
import {
  FolderNameIcon,
  CoAutherIcon,
  TagIcon,
  InfoIcon,
  CheckIcon,
  MemberDelIcon,
} from "assets";
import { ColorKey, colorMap } from "@/constants/color";
import Input from "@/components/input";
import Modal from "@/components/modal";
import Button from "@/components/button";
import { cn } from "@/utils/cn";

import { toast } from "sonner";
import {
  usePatchBookmarkFolder,
  usePostBookmarkFolder,
} from "@/hooks/use-bookmark";

interface FolderUpsertModalProps {
  onClick: () => void; // 모달 닫기
  mode: "create" | "edit";
  bookmarkId?: number;
  defaultName?: string;
  defaultColor?: string;
  defaultMembers?: string[];
}

export default function FolderUpsertModal({
  onClick,
  mode,
  bookmarkId,
  defaultName,
  defaultColor,
  defaultMembers,
}: FolderUpsertModalProps) {
  /* ---------- state ---------- */
  const [name, setName] = useState("");
  const [color, setColor] = useState<ColorKey>("red");
  const [members, setMembers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [limitReached, setLimitReached] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const MAX_MEMBERS = 3;

  /* ---------- edit 모드 기본값 ---------- */
  useEffect(() => {
    if (mode === "edit") {
      setName(defaultName ?? "");
      setColor((defaultColor as ColorKey) ?? "red");
      setMembers(defaultMembers ?? []);
    }
  }, [mode, defaultName, defaultColor, defaultMembers]);

  /* ---------- 공동 작업자 입력 ---------- */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || inputValue.trim() === "") return;
    e.preventDefault();

    if (members.length >= MAX_MEMBERS) {
      setLimitReached(true);
      return;
    }

    const email = inputValue.trim();
    if (!members.includes(email)) {
      setMembers([...members, email]);
    }
    setInputValue("");
    setLimitReached(false);
  };

  const removeMember = (email: string) => {
    const next = members.filter((m) => m !== email);
    setMembers(next);
    if (next.length < MAX_MEMBERS) setLimitReached(false);
  };

  const { mutate: patchBookmarkFolder } = usePatchBookmarkFolder();
  const { mutate: postBookmarkFolder } = usePostBookmarkFolder();

  // 중복 제출 방지를 위한 ref 추가
  const isSubmittingRef = useRef(false);

  const handleSubmit = () => {
    // ref를 사용하여 중복 제출 방지
    if (isSubmittingRef.current || isSubmitting) return;
    isSubmittingRef.current = true;
    setIsSubmitting(true);

    const payload = { name, color, members };

    if (mode === "create") {
      postBookmarkFolder(payload, {
        onSuccess: () => {
          toast.success("북마크 폴더가 성공적으로 생성되었습니다.");
          isSubmittingRef.current = false;
          setIsSubmitting(false);
          onClick(); // 모달 닫기
        },
        onError: (error: any) => {
          console.error("폴더 생성 실패:", error);
          toast.error("폴더 생성에 실패했습니다. 다시 시도해주세요.");
          isSubmittingRef.current = false;
          setIsSubmitting(false);
        },
        onSettled: () => {
          isSubmittingRef.current = false;
          setIsSubmitting(false);
        },
      });
    } else if (mode === "edit" && bookmarkId !== undefined) {
      patchBookmarkFolder(
        {
          bookmarkId,
          body: payload,
        },
        {
          onSuccess: () => {
            toast.success("북마크 폴더가 성공적으로 수정되었습니다.");
            isSubmittingRef.current = false;
            setIsSubmitting(false);
            onClick(); // 모달 닫기
          },
          onError: (error: any) => {
            console.error("폴더 수정 실패:", error);
            toast.error("폴더 수정에 실패했습니다. 다시 시도해주세요.");
            isSubmittingRef.current = false;
            setIsSubmitting(false);
          },
          onSettled: () => {
            isSubmittingRef.current = false;
            setIsSubmitting(false);
          },
        },
      );
    } else {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
      toast.error("폴더 정보가 올바르지 않습니다.");
    }
  };

  // 이벤트 버블링 방지를 위한 함수
  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit();
  };

  /* ---------- UI ---------- */
  return (
    <Modal
      title={mode === "create" ? "폴더 추가하기" : "폴더 수정하기"}
      onClick={onClick}
    >
      <div className="mt-8 flex w-80 flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <FolderNameIcon />
            <span className="body1 font-semibold">이름</span>
          </div>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="폴더 이름 입력"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <TagIcon />
            <span className="body1 font-semibold">폴더색상</span>
          </div>
          <div className="flex gap-2">
            {(Object.keys(colorMap) as ColorKey[]).map((c) => (
              <div
                key={c}
                onClick={() => setColor(c)}
                className={cn(
                  "relative h-6.25 w-6.25 cursor-pointer rounded",
                  colorMap[c].bg,
                )}
              >
                {color === c && (
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <CheckIcon />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-1.5">
            <CoAutherIcon />
            <span className="body1 font-semibold">공동 작업자</span>
            <InfoIcon className="ml-1" />
            <p className="caption2 text-gray-300">
              엔터 키 입력 시 추가됩니다.
            </p>
          </div>

          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="이메일 입력 후 Enter"
          />

          <div className="h-22.75">
            <div className="flex flex-wrap gap-1">
              {members.map((email) => (
                <div
                  key={email}
                  className="bg-primary-100 flex items-center gap-2.5 rounded-xs px-1 py-0.5"
                >
                  <span className="caption2 text-primary-600">{email}</span>
                  <MemberDelIcon
                    type="button"
                    onClick={() => removeMember(email)}
                  />
                </div>
              ))}
              {limitReached && (
                <p className="caption2 text-primary-500">
                  ⚠️ 공동 작업자는 최대 3명까지 추가할 수 있습니다.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={handleButtonClick}
        className={cn("mt-8", isSubmitting && "pointer-events-none opacity-50")}
        aria-disabled={isSubmitting}
      >
        {isSubmitting ? "저장 중…" : "저장하기"}
      </Button>
    </Modal>
  );
}
