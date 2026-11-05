import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="flex min-h-[60vh] items-center justify-center py-8">
      <section className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-[#eadfd8] sm:p-10">
        <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-[#fcf8f5] text-3xl font-bold text-[#c73a0f]">
          404
        </span>

        <h1 className="mt-6 text-2xl font-bold text-[#260f08]">
          Página no encontrada
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#87635a]">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        <Link
          to="/"
          className="mt-7 inline-flex rounded-full bg-[#c73a0f] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#952c0c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c73a0f]"
        >
          Volver al catálogo
        </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
