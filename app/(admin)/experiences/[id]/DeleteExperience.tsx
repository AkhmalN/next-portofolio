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
import { Button } from "@/components/ui/button";
import { deleteExperience } from "@/lib/action/experience/deleteExperience";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function ShowDialogDelete({
  id,
  open,
  onOpenChange,
}: {
  id: string | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleFormSubmit = async (formData: FormData) => {
    const result = await deleteExperience(formData);
    if (result.success) {
      toast.success(result.message);
      router.push("/experiences");
    } else {
      toast.error(result.message);
    }
  };

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
          <AlertDialogTitle>Hapus Pengalaman Ini?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah kamu yakin ingin menghapus pengalaman ini? Tindakan ini tidak
            dapat dibatalkan dan semua informasi terkait pengalaman tersebut
            akan hilang dari portofolio kamu.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => onOpenChange(false)}>
            Batal
          </AlertDialogAction>
          <form
            action={async (formData: FormData) => {
              await handleFormSubmit(formData);
            }}
          >
            <input type="hidden" defaultValue={id} name="id" />
            <Button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Ya, Hapus
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
