import "@/app/globals.css";
import Header from "@/components/layout/header/header";
import CheckoutStepWrapper from "./components/checkout-step-wrapper";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="layout-grid layout-checkout">
      <Header
        showLogo={false}
        showSearch={false}
        showCart={false}
        showBack={true}
        title="Proceso de Pago"
      />
      <div className="stepper">
        <CheckoutStepWrapper />
      </div>
      <main className="contenido no-scroll">{children}</main>
    </div>
  );
}
