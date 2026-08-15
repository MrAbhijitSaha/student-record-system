"use server";

import crypto from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export async function saveProfilePicture(file: File) {
  if (!(file instanceof File)) {
    throw new Error("Invalid image file.");
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Only JPEG, PNG and WebP images are allowed.");
  }

  const maxSize = 5 * 1024 * 1024;

  if (file.size > maxSize) {
    throw new Error("Image must be smaller than 5MB.");
  }

  const extension =
    file.type === "image/jpeg" ? "jpg"
    : file.type === "image/png" ? "png"
    : "webp";

  const fileName = `${crypto.randomUUID()}.${extension}`;

  const directory = path.join(process.cwd(), "public", "profilepicture");

  await mkdir(directory, {
    recursive: true,
  });

  const filePath = path.join(directory, fileName);

  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(filePath, buffer);

  return `/profilepicture/${fileName}`;
}
