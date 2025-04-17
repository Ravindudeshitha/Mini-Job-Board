"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type PopupContextType = {
  isOpen: boolean;
  openPopup: (data?: popup) => void;
  closePopup: () => void;
  popupData: popup | null;
};

interface popup{
  jobId: number;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupData, setPopupData] = useState<popup | null>(null);

  const openPopup = (data?: popup) => {
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
