import { APP_NAME } from "@/config/env.config";
import { LogoPath } from "@/constants/public-path.constant";
import { ROUTE } from "@/constants/route";
import { fredoka } from "@/styles/font";
import { ClipboardList, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import ThemeToggle from "./theme-toggle";
import UserMenu from "./user-menu";

export default function Header() {
  return (
    <header className="px-4 py-2 sticky border-b flex justify-between items-center">
      <Link href={ROUTE.HOME}>
        <div className="flex gap-2 items-center">
          <Image
            src={LogoPath}
            alt={`${APP_NAME} logo`}
            width={40}
            height={40}
          />
          <h3
            className={`${fredoka.className} text-primary text-2xl font-bold`}
          >
            {APP_NAME}
          </h3>
        </div>
      </Link>

      <div className="flex items-center gap-2">
        <Button variant={"ghost"} asChild>
          <Link href={ROUTE.TRANSACTION}>
            <ClipboardList />
          </Link>
        </Button>
        <Button variant={"ghost"} asChild>
          <Link href={ROUTE.CREATE_TRANSACTION}>
            <Plus />
          </Link>
        </Button>
        {/* <SearchButton /> */}
        <ThemeToggle /> 
        <UserMenu />
      </div>
    </header>
  );
}
