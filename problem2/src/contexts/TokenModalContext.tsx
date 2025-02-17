import { createContext } from "react";

import { CryptoPrice, TokenSelectCallback } from '../types';

interface TokenModalContextType {
  isOpen: boolean;
  openModal: (callback: TokenSelectCallback, prices: CryptoPrice[]) => void;
  closeModal: () => void;

  onTokenSelect: (token: string) => void;
  prices: CryptoPrice[];

  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const TokenModalContext = createContext<TokenModalContextType | undefined>(undefined);