"use client";
import { Button } from "@/components/ui/button";
import { THEME } from "@/constants/theme.constant";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

export default function ThemeToggle() {
  
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  },[]);
  
  if (!isMounted) {
    return <Skeleton className="w-10 h-9" />;;
  }
  return (
    <Button
      variant="ghost"
      onClick={() => {
        setTheme((prev) =>
          prev === THEME.LIGHT.NAME ? THEME.DARK.NAME : THEME.LIGHT.NAME
        );
      }}
    >
      {theme === THEME.LIGHT.NAME ? <THEME.DARK.ICON /> : <THEME.LIGHT.ICON />}
    </Button>
  );
}
