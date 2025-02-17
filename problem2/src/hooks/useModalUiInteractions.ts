import { useEffect, useRef } from "react";

const useModalUiInteractions = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus on input when modal is opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

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
  }, [closeModal]);

  return { modalRef, inputRef };
};

export default useModalUiInteractions;