import { createContext, useContext, useState } from 'react';

const MenuModalContext = createContext({ open: false, openModal: () => {}, closeModal: () => {} });

export function MenuModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <MenuModalContext.Provider
      value={{ open, openModal: () => setOpen(true), closeModal: () => setOpen(false) }}
    >
      {children}
    </MenuModalContext.Provider>
  );
}

export function useMenuModal() {
  return useContext(MenuModalContext);
}
