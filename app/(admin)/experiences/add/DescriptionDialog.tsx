"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

import { Card, CardContent } from "@/components/ui/card";

import { useEffect, useRef } from "react";

export default function ShowDescriptionDialog({
  descriptions,
  open,
  onOpenChange,
}: {
  descriptions: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && dialogRef.current) {
      setTimeout(() => {
        dialogRef.current?.focus();
      }, 10);
    }
  }, [open]);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent ref={dialogRef} tabIndex={-1}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Detail Job description yang sudah kamu tambahkan
          </AlertDialogTitle>
          <AlertDialogDescription>
            Kamu bisa menambahkan job description dengan lebih detail untuk
            menarik perhatian pelihat portofolio kamu.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Card className="py-2">
          <CardContent className="flex flex-row flex-wrap py-1">
            {descriptions.map((desc, index) => (
              <Badge variant={"secondary"} key={index} className="mx-1 my-1">
                {index + 1}. {desc}
              </Badge>
            ))}
          </CardContent>
        </Card>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => onOpenChange(false)}>
            Oke
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
