import Image from "next/image";
import Link from "next/link";

export default function SufisLogo({ size = 5 }: { size?: number }) {
  return (
    <section>
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={100}
          height={100}
          className="py-1"
          style={{ width: `${size}rem` }}
        />
      </Link>
    </section>
  );
}
