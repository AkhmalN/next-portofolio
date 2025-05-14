"use client";

import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { About } from "@/types";
import { PiWarning } from "react-icons/pi";

export default function FormEditAbout(data: About) {
  const [text, setText] = useState<string>(data.text);
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
    <div className="flex flex-col justify-center items-center w-full mx-auto space-y-6">
      <CardContent className="space-y-4 w-full">
        <div className="w-full">
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
            Jangan sertakan informasi pribadi sensitif seperti dokumen
            identitas, kesehatan, ras, agama, atau data keuangan.
          </p>
        </div>
        <div className="flex w-full justify-end">
          <Button disabled={text === data.text} className="w-full md:w-auto">
            Simpan
          </Button>
        </div>
      </CardContent>
    </div>
  );
}
