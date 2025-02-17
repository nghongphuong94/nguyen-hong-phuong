import { USD_DISPLAY_PRECISION } from "../../constants";
import { CryptoPrice } from "../../types";

import TokenSelector from "./TokenSelector";

interface InputTokenProps {
  label: string;
  amount: number | '';
  onChange: (value: number | string) => void;
  token: string;
  setToken: (token: string) => void;
  prices: CryptoPrice[];
}

const InputToken = ({ label, amount, onChange, token, setToken, prices }: InputTokenProps) => {
  const price = prices.find(p => p.currency === token)?.price || 0;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent all keys except numbers, backspace, dot, arrow keys, and delete
    if (!/[\d.]|Backspace|Arrow/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <span className="text-sm text-gray-400">{label}</span>
      <div className="flex items-center justify-between mt-2">
        <input
          value={amount}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-4xl text-white placeholder-gray-600 outline-none"
          placeholder="0"
          inputMode="decimal"
        />
        <TokenSelector
          selected={token}
          onSelect={setToken}
          prices={prices}
        />
      </div>
      <div className="mt-2 text-sm text-gray-500">
        ${((amount || 0) * price).toFixed(USD_DISPLAY_PRECISION)}
      </div>
    </div>
  )
};

export default InputToken;