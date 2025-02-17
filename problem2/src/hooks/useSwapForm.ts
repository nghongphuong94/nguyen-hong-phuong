import { useState, useMemo, useCallback } from 'react';

import { TOKEN_PRECISION } from '../constants';
import { CryptoPrice } from '../types';
import useCommonModal from './useCommonModal';

interface FormValues {
  amount: number | '';
  token: string;
}

const useSwapForm = (prices: CryptoPrice[]) => {
  const { openModal } = useCommonModal();

  const [formValues, setFormValues] = useState<FormValues[]>([
    { amount: '', token: 'ATOM' },
    { amount: '', token: 'OSMO' },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const isDisabled = useMemo(() => {
    return !formValues[0].amount || !formValues[1].amount;
  }, [formValues]);

  const tokenPrices = useMemo(() => ({
    input: prices.find(p => p.currency === formValues[0].token)?.price || 0,
    output: prices.find(p => p.currency === formValues[1].token)?.price || 0
  }), [formValues, prices]);

  const calculateAmount = useCallback(
    (fromValue: number, fromToken: string, toToken: string) => {
      if (!fromValue || !fromToken || !toToken) return 0;

      const { input: fromPrice, output: toPrice } = tokenPrices;

      if (!fromPrice || !toPrice) return 0;

      const result = fromValue * fromPrice / toPrice;
      return Math.floor(result * Math.pow(10, TOKEN_PRECISION)) / Math.pow(10, TOKEN_PRECISION);
    },
    [tokenPrices],
  );

  const onAmountChange = (index: number, value: number | string) => {
    const newFormValues = [...formValues];

    newFormValues[index].amount = value as number;
    newFormValues[1 - index].amount = calculateAmount(
      value as number,
      newFormValues[index].token,
      newFormValues[1 - index].token
    );
    setFormValues(newFormValues);
  };

  const onTokenChange = (index: number, token: string) => {
    const newFormValues = [...formValues];

    newFormValues[index].token = token;
    newFormValues[1 - index].amount = calculateAmount(
      newFormValues[index].amount || 0,
      token,
      newFormValues[1 - index].token
    );
    setFormValues(newFormValues);
  };

  const onSwapButtonClick = () => {
    const newFormValues = [...formValues];
    [newFormValues[0], newFormValues[1]] = [newFormValues[1], newFormValues[0]];
    setFormValues(newFormValues);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // simulate submitting form
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(formValues);
      openModal('Submitted', 'Swap request submitted successfully');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formValues,
    isDisabled,
    isLoading,
    onAmountChange,
    onTokenChange,
    onSwapButtonClick,
    handleSubmit,
    tokenPrices
  };
};

export default useSwapForm;