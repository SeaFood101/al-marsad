import { createContext, useContext } from 'react';

export const LayoutContext = createContext({
  isPortrait: false,
  boxWidth: 0,
  boxHeight: 0,
  inventoryHeight: 0,
});

export const useLayout = () => useContext(LayoutContext);
