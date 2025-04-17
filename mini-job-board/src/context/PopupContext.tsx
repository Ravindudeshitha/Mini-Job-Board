"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type PopupContextType = {
  isOpen: boolean;
  openPopup: (data?: any) => void;
  closePopup: () => void;
  popupData: any;
};

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupData, setPopupData] = useState<any>(null);

  const openPopup = (data?: any) => {
    setPopupData(data || null);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    setPopupData(null);
  };

  return (
    <PopupContext.Provider value={{ isOpen, openPopup, closePopup, popupData }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within PopupProvider");
  }
  return context;
};
