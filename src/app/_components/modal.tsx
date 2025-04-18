"use client";
import { ReactNode } from "react";

interface ModalProps {
  title: string;
  children: ReactNode;
  onClick: () => void;
}

export default function Modal({ title, children, onClick }: ModalProps) {
  return (
    <div className="fixed inset-0 z-10 flex h-full w-full items-center justify-center bg-black/50">
      <div className="relative flex w-145 flex-col items-center rounded-lg bg-white pt-10 pb-5">
        <h2 className="subtitle font-semibold">{title}</h2>
        {children}
        <img
          src="/assets/close.svg"
          className="absolute top-5 right-5"
          onClick={onClick}
        />
      </div>
    </div>
  );
}
