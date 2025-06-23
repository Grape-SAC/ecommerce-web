import "@/app/globals.css";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const CartLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default CartLayout;
