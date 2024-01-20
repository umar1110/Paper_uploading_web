import cloudinary from "cloudinary";
import fs from "fs";

export const cloudinaryUpload = async (localFilePath, fileName) => {
  // const __filename = fileURLToPath(import.meta.url);
  // const __dirname = dirname(__filename);

  try {
    const uniqueFilename = `${fileName}-${Date.now()}`;
    const response = await cloudinary.v2.uploader.upload(localFilePath, {
      resource_type: "raw",
      allowed_formats: ["pdf", "docx", "doc"],
      public_id: uniqueFilename,
      folder: "Journals",
    });

    // try {

    //     fs.unlinkSync(localFilePath, (err) => {
    //       if (err) {
    //         console.error("Error deleting file:", err);

    //       }
    //     });

    // } catch (error) {
    //   console.log("Error in deleting from public/temp")
    // }
    return response;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};
