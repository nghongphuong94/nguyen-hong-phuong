import { useContext } from 'react';

import { CommonModalContext } from '../contexts/CommonModalContext';

const useCommonModal = () => {
  const context = useContext(CommonModalContext);
  if (!context) throw new Error("useCommonModal must be used within a CommonModalProvider");
  return context;
};

export default useCommonModal;
