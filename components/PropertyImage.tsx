import Image from "next/image";

interface PropertyImageProps {
  src?: string;
  alt: string;
  placeholder: string;
  radius?: number;
}

export default function PropertyImage({ src, alt, placeholder, radius = 0 }: PropertyImageProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: "cover", borderRadius: radius }}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: radius,
        background:
          "repeating-linear-gradient(135deg, oklch(0.95 0.005 250) 0px, oklch(0.95 0.005 250) 12px, oklch(0.92 0.005 250) 12px, oklch(0.92 0.005 250) 24px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 12,
      }}
    >
      <span style={{ fontSize: 12, color: "oklch(0.5 0.01 250)", fontWeight: 600 }}>
        {placeholder}
      </span>
    </div>
  );
}
