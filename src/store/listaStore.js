import { create } from "zustand";

const useLista = create((set) => ({
  items: [],
  addItem: (newItem) => set((state) => ({ items: [...state.items, newItem] })),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
}));

export default useLista;
