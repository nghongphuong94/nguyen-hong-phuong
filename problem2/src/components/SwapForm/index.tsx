import { useState } from "react";

import { USD_DISPLAY_PRECISION } from "../../constants";
import usePrices from "../../hooks/usePrices";
import useSwapForm from "../../hooks/useSwapForm";
import { CryptoPrice } from "../../types";

import InputToken from "./InputToken";
import SubmitButton from "./SubmitButton";
import SwapButton from "./SwapButton";

const SwapForm = () => {
  const prices: CryptoPrice[] = usePrices();
  const [activeTab, setActiveTab] = useState('swap');

  const {
    formValues,
    isDisabled,
    isLoading,
    onAmountChange,
    onTokenChange,
    onSwapButtonClick,
    handleSubmit,
    tokenPrices
  } = useSwapForm(prices);

  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="bg-secondary-900 rounded-3xl bg-[#13131F] p-5">
        {/* Tab buttons */}
        <div className="flex w-max items-center gap-px rounded-3xl border border-gray-700">
          {['buy', 'sell', 'swap'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 rounded-3xl transition-colors sm:px-3 sm:py-1.5 capitalize
                ${activeTab === tab ? 'bg-[#6B5FCD] text-white' : 'text-gray-300 hover:bg-[#252538]'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-6">
          {/* From Section */}
          <InputToken
            label="From"
            amount={formValues[0].amount}
            onChange={(value) => onAmountChange(0, value)}
            token={formValues[0].token}
            setToken={(token) => onTokenChange(0, token)}
            prices={prices}
          />

          {/* Swap Button */}
          <SwapButton onClick={onSwapButtonClick} />

          {/* To Section */}
          <InputToken
            label="To"
            amount={formValues[1].amount}
            onChange={(value) => onAmountChange(1, value)}
            token={formValues[1].token}
            setToken={(token) => onTokenChange(1, token)}
            prices={prices}
          />

          {/* Confirm Swap Button */}
          <SubmitButton isDisabled={isDisabled} isLoading={isLoading} onClick={handleSubmit} />

          {/* Price Info */}
          <div className="text-sm text-gray-400">
            1 {formValues[0].token} ≈ {tokenPrices.input / tokenPrices.output} {formValues[1].token} (${tokenPrices.input.toFixed(USD_DISPLAY_PRECISION)})
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapForm;