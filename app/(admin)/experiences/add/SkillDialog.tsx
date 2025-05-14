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

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useEffect, useRef } from "react";

export default function ShowSkillDialog({
  skills,
  open,
  onOpenChange,
}: {
  skills: string[];
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
            Data Keahlian yang sudah kamu tambahkan
          </AlertDialogTitle>
          <AlertDialogDescription>
            Kamu bisa menambahkan keahlian lebih banyak lagi untuk menarik
            perhatian pelihat portofolio kamu.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Card className="py-2">
          <CardContent className="flex flex-row flex-wrap py-1">
            {skills.map((skill, index) => (
              <Badge variant={"secondary"} key={index} className="mx-1 my-1">
                {skill}
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
