"use client";

import Stepper from "@/components/ui/stepper/stepper";
import { usePathname } from "next/navigation";

export default function CheckoutStepWrapper() {
  const pathname = usePathname();

  const currentStep =
    pathname.includes("identificacion") ? 0 :
    pathname.includes("entrega") ? 1 :
    pathname.includes("pago") ? 2 :
    0;

  return (
    <Stepper
      currentStep={currentStep}
      stepTitles={["Identificación", "Envío", "Método de pago"]}
    />
  );
}
