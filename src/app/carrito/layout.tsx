"use client";

import "@/app/globals.css";
import Header from "@/components/layout/header/header";
import { useSearchParams } from "next/navigation";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();

  const from = searchParams.get("from");

  return (
    <div className="layout-grid">
      <Header
        showLogo={false}
        showSearch={false}
        showCart={false}
        showBack={true}
        title="Mi Carrito"
        backAbsolute={true}
        justify="center"
        backHref={from ?? "/"}
      />
      <main className="contenido">{children}</main>
    </div>
  );
}
