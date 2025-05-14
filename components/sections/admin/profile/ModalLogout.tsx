"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { deleteExperience } from "@/lib/action/experience/deleteExperience";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function ShowDialogLogout({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { logout } = useAuth();

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
          <AlertDialogTitle>Logout dari halaman dashboard?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah kamu yakin ingin keluar dari aplikasi? Kamu harus login
            kembali untuk mengakses akunmu.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => onOpenChange(false)}>
            Batal
          </AlertDialogAction>

          <Button
            onClick={logout}
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Ya, Logout
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
