import type { ReactNode } from 'react';
import CartDrawer from '../../components/CartDrawer/CartDrawer';
import type { CartItem } from '../../types/cart.types';

type MainLayoutProps = {
  children: ReactNode
  cartItems: CartItem[]
  onConfirm: ()=> void
};

const MainLayout = ({ children, cartItems, onConfirm }: MainLayoutProps) => {

  return (
    <div className="min-h-screen bg-[#fcf8f5]">

      <main className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-8 px-6 py-8 md:px-8 lg:grid-cols-[minmax(0,1fr)_380px]">

        <section className="min-w-0">
          {children}
        </section>

        <aside className="w-full">
          <CartDrawer
            items={cartItems}
            onConfirm={onConfirm}
          />
        </aside>

      </main>

    </div>
  );
};

export default MainLayout;
