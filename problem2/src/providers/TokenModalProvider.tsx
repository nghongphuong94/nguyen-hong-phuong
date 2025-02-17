import { ReactNode, useState } from 'react';

import { TokenModalContext } from '../contexts/TokenModalContext';
import { CryptoPrice } from '../types';

const TokenModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [onTokenSelect, setOnTokenSelect] = useState<((token: string) => void)>(() => {});
  const [onTokenSelect, setOnTokenSelect] = useState<((token: string) => void) | null>(null);
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const openModal = (
    callback: (token: string) => void,
    prices: CryptoPrice[],
  ) => {
    setOnTokenSelect(() => callback); // Wrap in a function to ensure we're not calling it during render
    setPrices(prices);
    setSearchQuery('');
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setOnTokenSelect(null);
  };

  return (
    <TokenModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,

        onTokenSelect: onTokenSelect!,
        prices,

        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </TokenModalContext.Provider>
  );
};

export default TokenModalProvider;