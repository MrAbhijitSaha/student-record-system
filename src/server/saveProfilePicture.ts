import "server-only";

import crypto from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const MAX_WIDTH = 4000;
const MAX_HEIGHT = 4000;

const ALLOWED_FORMATS = new Set(["jpeg", "png", "webp"]);

export async function saveProfilePicture(file: File) {
  if (!(file instanceof File)) {
    throw new Error("Invalid image file.");
  }

  if (file.size <= 0) {
    throw new Error("Image file is empty.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Image must be smaller than 5MB.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  let metadata;

  try {
    metadata = await sharp(buffer).metadata();
  } catch {
    throw new Error("Invalid image file.");
  }

  if (!metadata.format || !ALLOWED_FORMATS.has(metadata.format)) {
    throw new Error("Only JPEG, PNG and WebP images are allowed.");
  }

  if (
    !metadata.width ||
    !metadata.height ||
    metadata.width > MAX_WIDTH ||
    metadata.height > MAX_HEIGHT
  ) {
    throw new Error("Image dimensions are too large.");
  }

  const extension = metadata.format === "jpeg" ? "jpg" : metadata.format;

  const fileName = `${crypto.randomUUID()}.${extension}`;

  const directory = path.join(process.cwd(), "public", "profilepicture");

  await mkdir(directory, {
    recursive: true,
  });

  const filePath = path.join(directory, fileName);

  await writeFile(filePath, buffer);

  return `/profilepicture/${fileName}`;
}
