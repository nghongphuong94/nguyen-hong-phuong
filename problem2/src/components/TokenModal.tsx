import { X } from 'lucide-react';

import useTokenModal from '../hooks/useTokenModal';
import useModalUiInteractions from '../hooks/useModalUiInteractions';

const TokenModal = () => {
  const { isOpen, closeModal, onTokenSelect, prices, searchQuery, setSearchQuery } = useTokenModal();

  const {
    modalRef,
    inputRef,
  } = useModalUiInteractions({ isOpen, closeModal });

  const filteredTokens = prices
    // filter by search query
    .filter(({ currency }) => currency.toLowerCase().includes(searchQuery.toLowerCase()))
    // remove duplicates by currency
    .filter((token, index, self) => index === self.findIndex((t) => t.currency === token.currency));

  const handleSelectToken = (token: string) => {
    if (onTokenSelect) onTokenSelect(token);
    closeModal();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed left-1/2 top-1/2 w-11/12 max-w-lg min-w-[280px] h-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-3xl p-6 bg-[#1B1B26] shadow-lg overflow-y-hidden"
      role="listbox"
    >
      <div className="flex justify-between items-center mb-4">
        <h6 className="text-white text-lg font-semibold">Select a token</h6>
        <button
          onClick={closeModal}
          className="text-white"
        >
          <X size={24} />
        </button>
      </div>
      <input
        ref={inputRef}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full mb-2 p-3 bg-[#252538] text-white placeholder-gray-400 outline-none rounded-xl"
        placeholder="Search token"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      />
      <div className="flex-1 overflow-y-auto max-h-[calc(100%-116px)] mt-2">
        {filteredTokens.map(({ currency }) => (
          <div
            key={currency}
            role="option"
            className="flex items-center gap-2 p-3 hover:bg-[#252538] cursor-pointer"
            onClick={() => handleSelectToken(currency)}
          >
            <img
              src={`/assets/tokens/${currency}.svg`}
              alt={currency}
              className="h-8 w-8 rounded-full"
            />
            <span className="text-white">{currency}</span>
          </div>
        ))}
      </div>
    </div>
  )
};

export default TokenModal;