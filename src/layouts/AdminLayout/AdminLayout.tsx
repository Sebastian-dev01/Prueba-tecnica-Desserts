import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#fcf8f5]">
      <header className="border-b border-[#eadfd8] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to="/" className="font-bold text-[#260f08]">
            Desserts <span className="text-[#c73a0f]">/ Admin</span>
          </Link>

          <Link
            to="/"
            className="text-sm font-semibold text-[#c73a0f] hover:underline"
          >
            Volver a la tienda
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
