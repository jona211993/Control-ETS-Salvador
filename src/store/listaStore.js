import { create } from "zustand";

export const useLista = create((set) => ({
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
  clearItems: () =>
  set(() => {
    localStorage.removeItem("listaItems");
    return { items: [] };
  }),

loadItemsFromLocalStorage: () => {
  const storedItems = localStorage.getItem("listaItems");
  if (storedItems) {
    set({ items: JSON.parse(storedItems) });
  }
},
editPadron: (id, nuevoPadron) =>
    set((state) => {
      // Verificar si el nuevo padron ya existe en otros registros
      const padronExistente = state.items.some((item) => item.padron === nuevoPadron);
      
      if (padronExistente) {
        // Si el nuevo padron ya existe, no realizar la edición
        console.error("Error: El nuevo padron ya existe en otro registro.");
        return { items: state.items };
      }

      // Realizar la edición del campo padron
      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, padron: nuevoPadron } : item
      );

      // Actualizar el localStorage
      localStorage.setItem("listaItems", JSON.stringify(updatedItems));

      // Retornar el nuevo estado
      return { items: updatedItems };
    }),
}));

export const useContador = create((set) => {
  const storedContador = localStorage.getItem("contador");
  const initialContador = storedContador ? parseInt(storedContador, 10) : 1;

  return {
    contador: initialContador,
    inc: () =>
      set((state) => {
        const nuevoContador = state.contador + 1;
        localStorage.setItem("contador", nuevoContador);
        return { contador: nuevoContador };
      }),
      reset: () =>
      set(() => {
        localStorage.setItem("contador", 1);
        return { contador: 1 };
      }),
  };
});

export default useLista;
