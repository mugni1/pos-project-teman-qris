"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  "aria-invalid"?: boolean;
}

export default function Editor({
  value,
  onChange,
  placeholder,
  "aria-invalid": ariaInvalid,
}: EditorProps) {

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  return (
    <div
      className={cn(
        "rounded-lg border bg-background overflow-hidden",
        ariaInvalid ? "border-destructive" : "border-input",
      )}
      aria-invalid={ariaInvalid}
    >
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
      />
    </div>
  );
}
