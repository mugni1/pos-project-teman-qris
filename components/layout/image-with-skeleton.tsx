"use state";
import Image from "next/image";
import { useState } from "react";

export default function ImageWithSkeleton({
  src,
  alt,
  className,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
}) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 animate-pulse bg-muted rounded-md w-full h-full" />
      )}

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoadingComplete={() => setLoading(false)}
        className={`${className} ${loading ? "opacity-0" : "opacity-100"} transition w-full h-full object-cover rounded-md`}
      />
    </div>
  );
}
