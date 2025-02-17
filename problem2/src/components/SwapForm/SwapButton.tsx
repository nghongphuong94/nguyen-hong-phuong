import { ArrowUpDown } from "lucide-react";

interface SwapButtonProps {
  onClick: () => void;
}

const SwapButton = ({ onClick }: SwapButtonProps) => {
  return (
    <div className="relative h-12 flex items-center">
      <div className="absolute w-full border-t border-[#3C356D4A]"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <button 
          onClick={onClick}
          className="flex items-center justify-center h-12 w-12 rounded-full border-2 border-[#3C356D4A] bg-[#13131F] hover:bg-[#252538] transition-colors group"
        >
          <ArrowUpDown className="h-6 w-6 text-[#6B5FCD] transition-transform group-hover:rotate-180" />
        </button>
      </div>
    </div>
  );
};

export default SwapButton;