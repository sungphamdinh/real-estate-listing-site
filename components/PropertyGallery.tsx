"use client";

import { useState } from "react";
import PropertyImage from "./PropertyImage";

const THUMB_WINDOW = 4;

export default function PropertyGallery({
  images,
  alt,
  galleryCols,
}: {
  images: string[];
  alt: string;
  galleryCols: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbStart, setThumbStart] = useState(0);

  const hasMultiple = images.length > 1;
  const hasMoreThanWindow = images.length > THUMB_WINDOW;
  const visibleThumbs = images.slice(thumbStart, thumbStart + THUMB_WINDOW);

  function goTo(i: number) {
    setActiveIndex(i);
    if (i < thumbStart) setThumbStart(Math.max(0, i - THUMB_WINDOW + 1));
    else if (i >= thumbStart + THUMB_WINDOW) setThumbStart(i - THUMB_WINDOW + 1);
  }

  function prevThumbs() {
    setThumbStart((s) => Math.max(0, s - 1));
  }

  function nextThumbs() {
    setThumbStart((s) => Math.min(images.length - THUMB_WINDOW, s + 1));
  }

  return (
    <div>
      <div
        style={{
          position: "relative",
          borderRadius: 14,
          overflow: "hidden",
          width: "100%",
          aspectRatio: "16/10",
          maxHeight: 420,
        }}
      >
        <PropertyImage src={images[activeIndex]} alt={alt} placeholder="Ảnh chính căn nhà" />
        {hasMultiple && (
          <div
            style={{
              position: "absolute",
              bottom: 10,
              right: 12,
              background: "oklch(0.2 0.01 250 / 0.6)",
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
              padding: "3px 10px",
              borderRadius: 6,
            }}
          >
            {activeIndex + 1}/{images.length}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
          {hasMoreThanWindow && (
            <button
              onClick={prevThumbs}
              disabled={thumbStart === 0}
              style={{ ...thumbNavStyle, opacity: thumbStart === 0 ? 0.3 : 1 }}
              aria-label="Xem ảnh trước"
            >
              ‹
            </button>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(galleryCols, THUMB_WINDOW)}, minmax(0,1fr))`,
              gap: 10,
              flex: 1,
            }}
          >
            {visibleThumbs.map((src, i) => {
              const realIndex = thumbStart + i;
              const isActive = realIndex === activeIndex;
              return (
                <button
                  key={src}
                  onClick={() => goTo(realIndex)}
                  style={{
                    position: "relative",
                    borderRadius: 10,
                    overflow: "hidden",
                    aspectRatio: "1/1",
                    padding: 0,
                    border: isActive ? "2px solid var(--accent)" : "2px solid transparent",
                    cursor: "pointer",
                  }}
                  aria-label={`Xem ảnh ${realIndex + 1}`}
                >
                  <PropertyImage src={src} alt={`${alt} - ảnh ${realIndex + 1}`} placeholder="Ảnh" />
                </button>
              );
            })}
          </div>
          {hasMoreThanWindow && (
            <button
              onClick={nextThumbs}
              disabled={thumbStart + THUMB_WINDOW >= images.length}
              style={{ ...thumbNavStyle, opacity: thumbStart + THUMB_WINDOW >= images.length ? 0.3 : 1 }}
              aria-label="Xem ảnh tiếp theo"
            >
              ›
            </button>
          )}
        </div>
      )}
    </div>
  );
}

const thumbNavStyle: React.CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: "50%",
  border: "1px solid oklch(0.85 0.01 250)",
  background: "#fff",
  fontSize: 20,
  cursor: "pointer",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
