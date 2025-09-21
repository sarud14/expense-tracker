"use client";
import {
  DARK_IMAGE_PATH,
  LIGHT_IMAGE_PATH,
} from "@/constants/public-path.constant";
import { THEME } from "@/constants/theme.constant";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

export default function ExampleImage() {
  const { theme } = useTheme();
  const [isMouted, setIsMouted] = useState(false);
  useEffect(() => {
    setIsMouted(true);
  }, []);

  if (!isMouted) {
    return <Skeleton className="w-full aspect-[16/9] bg-accent/10" />;
  }
  return (
    <div className="w-full aspect-[16/9] relative border rounded-xl overflow-hidden">
      <Image
        src={theme === THEME.DARK.NAME ? DARK_IMAGE_PATH : LIGHT_IMAGE_PATH}
        alt="app theme example"
        fill
        priority
        sizes="60vw"
      />
    </div>
  );
}
