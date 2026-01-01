'use client';

import "@/app/globals.css";
import Header from "@/components/layout/header/header";
import CheckoutStepWrapper from "@/components/ui/checkout-step-wrapper/checkout-step-wrapper";
import { usePathname } from "next/navigation";

function getCheckoutBackHref(pathname: string): string {
  if (pathname.includes("/finalizar-compra/pago")) {
    return "/finalizar-compra/entrega";
  }

  if (pathname.includes("/finalizar-compra/entrega")) {
    return "/finalizar-compra/identificacion";
  }

  if (pathname.includes("/finalizar-compra/identificacion")) {
    return "/carrito";
  }

  // fallback seguro
  return "/";
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const backHref = getCheckoutBackHref(pathname);

  return (
    <div className="layout-grid layout-checkout">
      <Header
        showLogo={false}
        showSearch={false}
        showCart={false}
        showBack={true}
        title="Proceso de Pago"
        backAbsolute={true}
        justify="center"
        backHref={backHref}
      />
      <div className="stepper">
        <CheckoutStepWrapper />
      </div>
      <main className="contenido no-scroll">{children}</main>
    </div>
  );
}
