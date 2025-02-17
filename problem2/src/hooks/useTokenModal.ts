import { useContext } from 'react';

import { TokenModalContext } from '../contexts/TokenModalContext';

const useTokenModal = () => {
  const context = useContext(TokenModalContext);
  if (!context) throw new Error("useTokenModal must be used within a TokenModalProvider");
  return context;
};

export default useTokenModal;
