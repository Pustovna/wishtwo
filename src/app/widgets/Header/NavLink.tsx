"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as S from "./Header.style";

type NavLinkProps = {
  href: string;
  label: string;
};
export default function NavLink({ href, label }: NavLinkProps) {
  const currentPath = usePathname();
  const isActive = currentPath === href;

  return (
    <Link href={href} passHref>
      <S.text isActive={isActive}>{label}</S.text>
    </Link>
  );
}
