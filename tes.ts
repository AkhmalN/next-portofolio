// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;
//   const isAdminRoute = path.startsWith("/admin");
//   const isUserRoute = path === "/" || path.startsWith("/user"); // Sesuaikan jika ada rute lain di bawah @user

//   const accessToken = request.cookies.get("access_token")?.value;
//   // const role = request.cookies.get("role")?.value;
//   const role = "admin";

//   // Jika pengguna mencoba mengakses rute admin atau dashboard tanpa token atau bukan admin, redirect ke halaman login admin
//   if (isAdminRoute && (!accessToken || role !== "admin")) {
//     return NextResponse.redirect(new URL("/admin", request.url));
//   }

//   // Jika pengguna berada di rute root ("/") dan belum login atau bukan admin, arahkan ke halaman user
//   if (path === "/" && !accessToken) {
//     return NextResponse.redirect(new URL("/@admin", request.url)); // Atau '/@user' tergantung kebutuhan Anda
//   }

//   // Jika pengguna mencoba mengakses rute user setelah login sebagai admin, mungkin redirect ke dashboard
//   if (isUserRoute && accessToken && role === "admin") {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   // Biarkan permintaan dilanjutkan jika semua kondisi di atas tidak terpenuhi
//   return NextResponse.next();
// }

// // Konfigurasi matcher untuk rute yang ingin diproteksi
// export const config = {
//   matcher: [
//     "/admin/:path*",
//     "/user/:path*", // Jika ada rute lain di bawah @user yang perlu dipertimbangkan
//     "/", // Untuk menangani rute awal
//   ],
// };
