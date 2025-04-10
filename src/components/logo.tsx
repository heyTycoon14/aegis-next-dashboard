import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-8 max-w-[10.847rem]">
      <div className="flex gap-2">
        <Image
          src="/images/favicon.ico"
          width={80}
          height={50}
          // className="dark:hidden"
          alt="NextAdmin logo"
          role="presentation"
          quality={100}
        />
        <div className="text-heading-6 font-bold text-dark dark:text-white">Aegis Admin</div>
      </div>
    </div>
  );
}
