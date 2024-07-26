import sizeOf from "buffer-image-size";
import sharp from "sharp";

export default async function resizeImage(file: Buffer): Promise<Buffer> {
  const dimensions = sizeOf(file);
  const width: number = dimensions.width;
  const height: number = dimensions.height;
  const min: number = Math.min(width, height);
  const max: number = Math.max(width, height);
  const ratio: number = max / min;
  let k = 0.1;
  while (width / (ratio * k) >= 300) {
    k += 0.1;
  }
  return await sharp(file)
    .resize(
      Math.floor(width / (ratio * (k - 0.1))),
      Math.floor(height / (ratio * (k - 0.1)))
    )
    .toBuffer();
}
