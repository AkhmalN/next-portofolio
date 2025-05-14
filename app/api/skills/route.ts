import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";

const readCSV = (filePath: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => results.push(data)) // Menambahkan setiap baris ke dalam array results
      .on("end", () => resolve(results)) // Resolving promise ketika selesai membaca CSV
      .on("error", (error) => reject(error)); // Menangani error jika ada
  });
};

export const GET = async (req: NextRequest) => {
  try {
    const searchQuery = req.nextUrl.searchParams.get("search");
    // console.log(searchQuery);
    // Tentukan path file CSV di folder proyek (misalnya di folder 'public' atau di root)
    const filePath = path.resolve(process.cwd(), "it_skill.csv"); // Gunakan jalur ke file CSV Anda
    const skills = await readCSV(filePath); // Membaca file CSV dan mengonversinya ke JSON
    // console.log(skills.slice(0, 4));
    if (searchQuery) {
      const fillteredSkills = skills.filter((data: { Skill: string }) => {
        return data.Skill.toLowerCase().includes(searchQuery.toLowerCase());
      });
      // console.log(new Date().getMilliseconds());
      // console.log(fillteredSkills);
      return NextResponse.json(fillteredSkills);
    }
    return NextResponse.json(skills); // Mengembalikan data dalam format JSON
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read CSV file" },
      { status: 500 }
    ); // Menangani error jika terjadi
  }
};
