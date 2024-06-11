import Link from "next/link";
import Image from "next/image";

const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="items-center hidden lg:flex">
        <Image src="logo.svg" alt="Logo" height={38} width={38}></Image>
        <p className="font-semibold text-white text-2xl ml-2.5">MyFinances</p>
      </div>
    </Link>
  );
};

export default HeaderLogo;
