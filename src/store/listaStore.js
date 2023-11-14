import { create } from "zustand";

const useLista = create((set) => ({
  items: [],
  // Función para agregar un nuevo elemento y actualizar el localStorage
  addItem: (newItem) =>
    set((state) => {
      const updatedItems = [...state.items, newItem];
      localStorage.setItem("listaItems", JSON.stringify(updatedItems));
      return { items: updatedItems };
    }),

  // Función para eliminar un elemento y actualizar el localStorage
  removeItem: (id) =>
    set((state) => {
      const updatedItems = state.items.filter((item) => item.id !== id);
      localStorage.setItem("listaItems", JSON.stringify(updatedItems));
      return { items: updatedItems };
    }),
  updateItemEstado: (id, nuevoEstado) =>
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, estado: nuevoEstado } : item
      );
      localStorage.setItem("listaItems", JSON.stringify(updatedItems));
      return { items: updatedItems };
    }),
  // Función para cargar los elementos desde el localStorage al inicio
  loadItemsFromLocalStorage: () => {
    const storedItems = localStorage.getItem("listaItems");
    if (storedItems) {
      set({ items: JSON.parse(storedItems) });
    }
  },
}));

export default useLista;
