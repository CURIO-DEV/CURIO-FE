"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

import Button from "@/components/button";
import { Exit_Reasons } from "@/constants/exit-reasons";
import { useDeleteAccount } from "@/hooks/use-delete-accout";

export default function DeleteAccount() {
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const deleteAccount = useDeleteAccount();

  const handleSubmit = () => {
    if (!selectedReason) {
      toast.warning("탈퇴 사유를 선택해 주세요.");
      return;
    }
    if (selectedReason === "other" && !customReason.trim()) {
      toast.warning("사유를 입력해 주세요.");
      return;
    }
    deleteAccount.mutate();
  };

  useEffect(() => {
    if (selectedReason === "other") textareaRef.current?.focus();
  }, [selectedReason]);

  return (
    <div className="flex justify-center">
      <div className="mt-10 rounded-xl border border-gray-300 px-8 pb-8">
        <div className="mt-6 flex h-14.25 border-b border-gray-200">
          <span className="subtitle1 mt-2.25 font-semibold">회원탈퇴</span>
        </div>

        <p className="body1 mt-8 ml-4.5 w-150 font-medium">
          회원 탈퇴를 진행하면 현재 사용 중이신 계정을 더 이상 사용할 수 없게
          됩니다.
          <br />
          또한 한 번 삭제한 계정은 이전 상태로 복구 불가능합니다.
          <br />한 번 탈퇴한 사용자라고 하더라도, 다시 CURIO에 가입할 수
          있습니다.
        </p>

        <p className="subtitle2 mt-10.5 font-medium">
          탈퇴하시는 이유를 알려주세요.
        </p>
        <div>
          {Exit_Reasons.map(({ value, label }) => (
            <div
              key={value}
              className={`w-150 py-3 ${value !== "other" && "border-b border-gray-200"}`}
            >
              <label
                className={`flex items-center gap-2.75 font-semibold ${
                  selectedReason === value ? "text-black" : "text-gray-500"
                }`}
              >
                <input
                  type="radio"
                  name="reason"
                  value={value}
                  checked={selectedReason === value}
                  onChange={() => setSelectedReason(value)}
                  className="accent-primary-600 ml-4.75"
                />
                {label}
              </label>
            </div>
          ))}
        </div>

        <textarea
          ref={textareaRef}
          className="body1 placeholder:body1 h-28.5 w-150 resize-none rounded-md border border-gray-200 px-4 py-2.5 font-semibold placeholder:font-semibold placeholder:text-gray-200"
          placeholder="입력해주세요"
          value={customReason}
          onChange={(e) => setCustomReason(e.target.value)}
          disabled={selectedReason !== "other"}
        />

        <ul className="body1 mt-8.5 list-disc pl-5 font-medium">
          <li>
            탈퇴 후에는 회원님의 모든 데이터가 삭제되므로, 다시 로그인할 수
            없습니다.
          </li>
          <li>탈퇴한 계정은 복구가 불가능합니다.</li>
          <li>
            탈퇴 후에도 일정 기간 동안 법적인 요구에 따라 일부 정보가 보관될 수
            있습니다.
          </li>
        </ul>

        <div className="mt-11 flex items-center justify-between font-semibold">
          <span className="subtitle2">탈퇴하시겠습니까?</span>
          <div className="flex gap-3">
            <Button
              onClick={handleSubmit}
              className="hover:bg-primary-50 body1 border border-gray-400 bg-white text-gray-400"
            >
              탈퇴하기
            </Button>
            <Button onClick={() => history.back()} className="body1">
              취소하고 서비스 이용하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
