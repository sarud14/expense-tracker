"use client";

import { signOutUser } from "@/lib/actions/auth.action";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <button className="flex gap-2 items-center w-full" onClick={signOutUser}>
      <LogOut />
      <span>Sign Out</span>
    </button>
  );
}
