import { ChevronDown } from 'lucide-react';

import useTokenModal from '../../hooks/useTokenModal';
import { CryptoPrice } from '../../types';

const TokenSelector = ({ selected, onSelect, prices }: {
  selected: string;
  onSelect: (currency: string) => void;
  prices: CryptoPrice[];
}) => {
  const { openModal } = useTokenModal();

  return (
    <button
      onClick={() => openModal(onSelect, prices)}
      className="flex items-center gap-1 rounded-full bg-[#1B1B26] py-3 pl-3 pr-4 transition-colors hover:bg-[#252538] min-w-[140px]"
    >
      <img
        src={`/assets/tokens/${selected}.svg`}
        alt={`${selected} token`}
        className="h-10 w-10 rounded-full sm:h-6 sm:w-6"
      />
      <span className="ml-2 text-xl font-semibold text-white sm:text-lg">{selected}</span>
      <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
    </button>
  );
};

export default TokenSelector;