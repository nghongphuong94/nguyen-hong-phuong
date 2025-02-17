import { useEffect } from 'react';
import { X } from 'lucide-react';

import useCommonModal from '../hooks/useCommonModal';
import useModalUiInteractions from '../hooks/useModalUiInteractions';

const CommonModal = () => {
  const { isOpen, closeModal, title, message } = useCommonModal();
  const { modalRef } = useModalUiInteractions({ isOpen, closeModal });

  // Close modal on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as any)) {
        closeModal();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal, modalRef]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed left-1/2 top-1/2 w-11/12 max-w-lg min-w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-3xl p-6 bg-[#1B1B26] shadow-lg overflow-y-hidden"
    >
      <div className="flex justify-between items-center mb-4">
        <h6 className="text-white text-lg font-semibold">
          {title}
        </h6>
        <button
          onClick={closeModal}
          className="text-white"
        >
          <X size={24} />
        </button>
      </div>
      <p className="text-white">{message}</p>
    </div>
  )
};

export default CommonModal;