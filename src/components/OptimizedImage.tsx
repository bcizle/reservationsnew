import Image, { type ImageProps } from "next/image";

export type ImageVariant = "hero" | "card" | "thumbnail" | "logo";

const VARIANT_SIZES: Record<ImageVariant, { width: number; height: number; sizes: string }> = {
  hero: {
    width: 1920,
    height: 1080,
    sizes: "100vw",
  },
  card: {
    width: 640,
    height: 480,
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  },
  thumbnail: {
    width: 320,
    height: 240,
    sizes: "(max-width: 640px) 50vw, 320px",
  },
  logo: {
    width: 160,
    height: 60,
    sizes: "160px",
  },
};

type OptimizedImageProps = Omit<ImageProps, "width" | "height" | "sizes"> & {
  variant?: ImageVariant;
  width?: number;
  height?: number;
  sizes?: string;
};

const SHIMMER_SVG = (w: number, h: number) => `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#e5e7eb" offset="0%"/>
      <stop stop-color="#f3f4f6" offset="50%"/>
      <stop stop-color="#e5e7eb" offset="100%"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#e5e7eb"/>
  <rect id="r" width="${w}" height="${h}" fill="url(#g)"/>
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.4s" repeatCount="indefinite"/>
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str);

export function shimmerPlaceholder(width = 640, height = 480) {
  return `data:image/svg+xml;base64,${toBase64(SHIMMER_SVG(width, height))}`;
}

export default function OptimizedImage({
  variant = "card",
  width,
  height,
  sizes,
  alt,
  placeholder,
  blurDataURL,
  ...rest
}: OptimizedImageProps) {
  const preset = VARIANT_SIZES[variant];
  const finalWidth = width ?? preset.width;
  const finalHeight = height ?? preset.height;
  const finalSizes = sizes ?? preset.sizes;

  const finalPlaceholder = placeholder ?? "blur";
  const finalBlurData =
    blurDataURL ?? (finalPlaceholder === "blur" ? shimmerPlaceholder(finalWidth, finalHeight) : undefined);

  return (
    <Image
      {...rest}
      alt={alt}
      width={finalWidth}
      height={finalHeight}
      sizes={finalSizes}
      placeholder={finalPlaceholder}
      blurDataURL={finalBlurData}
    />
  );
}
