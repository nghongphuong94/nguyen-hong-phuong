import { createContext } from "react";

interface CommonModalContextType {
  isOpen: boolean;
  openModal: (title: string, message: string) => void;
  closeModal: () => void;

  title: string;
  message: string;
}

export const CommonModalContext = createContext<CommonModalContextType | undefined>(undefined);