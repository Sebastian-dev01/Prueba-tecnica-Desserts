import { Outlet } from "react-router-dom";

import CartDrawer from "../../components/CartDrawer/CartDrawer";

type MainLayoutProps = {
  onConfirm: () => void;
}

const MainLayout = ({onConfirm}: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#fcf8f5]">
      <main className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-8 px-6 py-8 md:px-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <section className="min-w-0">
          <Outlet />
        </section>

        <aside className="w-full">
          <CartDrawer
            onConfirm={onConfirm}
          />
        </aside>
      </main>
    </div>
  );
};

export default MainLayout;
