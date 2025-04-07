"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div>
        <strong>Lexis</strong>
      </div>
      <div>
        <Link href="/" className={pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link href="/about" className={pathname === "/about" ? "active" : ""}>
          Sobre
        </Link>
        <Link href="/books" className={pathname === "/books" ? "active" : ""}>
          Catálogo
        </Link>
        <Link href="/login" className="button light">
          Entrar
        </Link>
        <Link href="/register" className="button">
          Registrar
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
