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
import {
  CreateBookmarkFolder,
  UpdateBookmarkFolder,
} from "@/apis/bookmark/bookmark";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { BOOKMARK_KEY } from "@/apis/bookmark/bookmark-queries";
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
  const lockRef = useRef(false); // 중복 실행 락
  const MAX_MEMBERS = 3;

  /* ---------- edit 모드 기본값 ---------- */
  useEffect(() => {
    if (mode === "edit") {
      setName(defaultName ?? "");
      setColor((defaultColor as ColorKey) ?? "red");
      setMembers(defaultMembers ?? []);
    }
  }, [mode, defaultName, defaultColor, defaultMembers]);

  console.log("mode 가 궁금해", mode);

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

  const queryClient = useQueryClient();
  const handleSave = async () => {
    if (lockRef.current) return;
    lockRef.current = true;
    setIsSubmitting(true);

    const payload = { name, color, members };

    try {
      if (mode === "create") {
        await CreateBookmarkFolder(payload);
      } else if (mode === "edit" && bookmarkId !== undefined) {
        await UpdateBookmarkFolder(bookmarkId, payload);
      }
      toast.success("변경사항이 저장되었습니다.");
      queryClient.invalidateQueries({ queryKey: BOOKMARK_KEY.FOLDER_LIST() }); // ← 추가
      onClick();
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? "저장에 실패했습니다.";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
      lockRef.current = false;
    }
  };

  const { mutate: patchBookmarkFolder } = usePatchBookmarkFolder(bookmarkId!);
  const { mutate: postBookmarkFolder } = usePostBookmarkFolder();

  // const handleSaveClick = () => {
  //   if (isSubmitting) return;

  //   const payload = { name, color, members };
  //   if (mode === "create") {
  //     postBookmarkFolder(payload);
  //   } else if (mode == "edit") {
  //     patchBookmarkFolder(payload);
  //   }
  // };

  const handlePostBookmark = () => {
    postBookmarkFolder({ name, color, members });
  };

  const handlePatchBookmark = () => {
    patchBookmarkFolder({ name, color, members });
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
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          mode === "create" ? handlePostBookmark() : handlePatchBookmark();
          // handleSaveClick();
        }}
        className={cn("mt-8", isSubmitting && "pointer-events-none opacity-50")}
        aria-disabled={isSubmitting}
      >
        {isSubmitting ? "저장 중…" : "저장하기"}
      </Button>
    </Modal>
  );
}
