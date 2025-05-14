import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export const cloudinaryUploader = async (imageFile: File) => {
  let imageUrl: string | undefined;

  if (!imageFile) {
    console.error("Tidak ada file gambar yang dipilih.");
    return { error: "Gambar wajib diunggah." };
  }

  if (imageFile) {
    try {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise<UploadApiResponse>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream((error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result as UploadApiResponse);
              }
            })
            .end(buffer);
        }
      );

      if (uploadResult?.secure_url) {
        imageUrl = uploadResult.secure_url;
        console.log("Gambar berhasil di unggah ke cloudinary", imageUrl);
      } else {
        console.error("Gagal mengunggah gambar ke Cloudinary.");
        return { error: "Gagal mengunggah gambar." };
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengunggah ke Cloudinary:", error);
      return { error: "Terjadi kesalahan saat mengunggah gambar." };
    }
  }
  return imageUrl;
};

export const deleteImage = async (imageUrl: string) => {
  try {
    const imagePublicId: string | undefined = imageUrl
      ?.split("/")
      .pop()
      ?.split(".")[0];

    if (imagePublicId) {
      const result = await cloudinary.uploader.destroy(imagePublicId);
      console.log("Hasil penghapusan gambar:", result);
      if (result.result === "ok") {
        console.log("Gambar berhasil dihapus dari Cloudinary");
      } else {
        console.error("Gagal menghapus gambar dari Cloudinary");
      }
    } else {
      console.error("Gagal menghapus gambar: imagePublicId tidak valid.");
    }
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};
