import { useEffect, useState } from "react";

import { CRYPTO_PRICES_API_URL } from "../constants";
import { CryptoPrice } from "../types";

const usePrices = () => {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(CRYPTO_PRICES_API_URL);
        const data = await response.json();
        setPrices(data);
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    fetchPrices();

    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, []);

  return prices;
};

export default usePrices;