type ConfirmDeleteModalProps = {
  productName: string;
  isPending: boolean;
  errorMessage?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmDeleteModal = ({
  productName,
  isPending,
  errorMessage,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        aria-describedby="delete-description"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <h2
          id="delete-title"
          className="text-xl font-bold text-[#260f08]"
        >
          Eliminar producto
        </h2>

        <p
          id="delete-description"
          className="mt-3 text-sm leading-6 text-[#87635a]"
        >
          ¿Estás seguro de que deseas eliminar{" "}
          <strong>{productName}</strong>? Esta acción no se puede deshacer.
        </p>

        {errorMessage && (
          <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            No se pudo eliminar el producto: {errorMessage}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="rounded-xl border border-[#eadfd8] px-4 py-2.5 text-sm font-semibold text-[#260f08] hover:bg-[#fcf8f6] disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Eliminando..." : "Sí, eliminar"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default ConfirmDeleteModal;
