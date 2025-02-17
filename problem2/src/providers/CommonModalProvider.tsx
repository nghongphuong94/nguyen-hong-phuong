import { ReactNode, useState } from 'react';

import { CommonModalContext } from '../contexts/CommonModalContext';

const CommonModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const openModal = (
    title: string,
    message: string,
  ) => {
    setTitle(title);
    setMessage(message);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTitle('');
    setMessage('');
  };

  return (
    <CommonModalContext.Provider
      value={{
        isOpen,
        openModal,
        title,
        message,
        closeModal,
      }}
    >
      {children}
    </CommonModalContext.Provider>
  );
};

export default CommonModalProvider;