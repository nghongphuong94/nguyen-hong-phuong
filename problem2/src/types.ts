export type CryptoPrice = {
  currency: string;
  price: number;
};

export type TokenSelectCallback = (token: string) => void;