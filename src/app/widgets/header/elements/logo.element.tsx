import Image from "next/image";
import { Link } from "@/pkg/libraries/locale";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-0">
        <Image
          src="/assets/images/logo.png"
          alt="MindForge"
          width={64}
          height={45}
          className="w-[64px] h-auto object-contain"
        />
        <span className="text-3xl text-secondary font-bold">Mind</span>
        <span className="text-3xl text-primary font-bold">Forge</span>
      </div>
    </Link>
  );
};
