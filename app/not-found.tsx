"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <a
            href="/"
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400"
          >
            Next Explorer
          </a>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <AlertCircle className="w-16 h-16 text-green-500 mx-auto" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
            404
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-xl mx-auto">
            Halaman Tidak Ditemukan. Data yang Anda cari mungkin tidak ada.
          </p>
          <Button
            variant="default"
            size="lg"
            className={cn(
              "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
              "hover:from-green-600 hover:to-emerald-600",
              "px-8 py-3 rounded-full shadow-lg hover:shadow-xl",
              "transition-all duration-300"
            )}
            onClick={() => (window.location.href = "/about")}
          >
            Kembali ke Beranda
          </Button>
        </div>
      </main>

      <footer className="py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500 border-t border-gray-800">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Next Explorer. Hak cipta dilindungi.
        </p>
      </footer>
    </div>
  );
};

export default NotFoundPage;
