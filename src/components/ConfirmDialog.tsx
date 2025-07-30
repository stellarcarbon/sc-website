"use client";

import { useEffect } from "react";
import Button from "./Button";

type ConfirmDialogProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-primary rounded-lg shadow-md p-6 w-full max-w-sm text-center space-y-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p>{message}</p>
        <div className="flex justify-center gap-4">
          <Button onClick={onCancel}>Cancel</Button>
          <Button
            className="bg-red-500 hover:bg-red-600 text-white border-0"
            onClick={onConfirm}
          >
            Yes, delete
          </Button>
        </div>
      </div>
    </div>
  );
}
