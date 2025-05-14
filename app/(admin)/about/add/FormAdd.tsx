"use client";

import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PiWarning } from "react-icons/pi";

export default function FormAddAbout() {
  const [text, setText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    autoResizeTextarea();
  }, [text]);

  return (
    <div className="flex flex-col justify-center  w-full mx-auto space-y-6">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-xl">Ringkasan</h1>
        <p className="text-sm">
          Tunjukkan pengalaman unik, ambisi, dan kelebihan Anda.
        </p>
      </div>
      <Textarea
        id="text"
        name="text"
        ref={textareaRef}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          autoResizeTextarea();
        }}
        placeholder="Tulis sesuatu tentang dirimu..."
        className="resize-none overflow-hidden w-full"
      />
      <div className="w-full flex flex-row items-center gap-2">
        <PiWarning />
        <p className="text-sm text-gray-500">
          Jangan sertakan informasi pribadi sensitif seperti dokumen identitas,
          kesehatan, ras, agama, atau data keuangan.
        </p>
      </div>
      <div className="w-full flex justify-end">
        <Button type="submit" disabled={text.length === 0}>
          <span>Simpan</span>
        </Button>
      </div>
    </div>
  );
}
