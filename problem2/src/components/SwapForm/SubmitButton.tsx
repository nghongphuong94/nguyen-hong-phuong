// components/SubmitButton.tsx
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  isDisabled: boolean;
  isLoading: boolean;
  onClick: () => void;
}

const SubmitButton = ({ isDisabled, isLoading, onClick }: SubmitButtonProps) => {
  return (
    <button
      onClick={onClick} 
      disabled={isLoading || isDisabled}
      className="w-full rounded-xl bg-[#6B5FCD] py-4 text-white font-semibold hover:bg-[#5D53B3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin mx-auto" />
        </>
      ) : (
        'Confirm Swap'
      )}
    </button>
  );
};

export default SubmitButton;