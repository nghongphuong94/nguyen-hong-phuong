interface WalletBalance {
  currency: string;
  amount: number;
}

// 4. the `FormattedWalletBalance` is re-defined (not DRY) where it should extends the `WalletBalance` instead.
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // 1. The function getPriority should be refactored to use a map instead of a switch statement. Also the type `blockchain` should be `string` instead of `any`.
  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100
      case 'Ethereum':
        return 50
      case 'Arbitrum':
        return 30
      case 'Zilliqa':
        return 20
      case 'Neo':
        return 20
      default:
        // 2. `-99` is a magic number, it should be replaced with a constant.
        return -99
    }
  }

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain);
      // 2. `-99` is a magic number, it should be replaced with a constant.
      // 5. there is no `lhsPriority` defined in the filter. The filter also has unexpected logic when it tries to filter `balance.amount <= 0`.
      if (lhsPriority > -99) {
         if (balance.amount <= 0) {
           return true;
         }
      }
      return false
    }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
      // 4. The WalletBalance interface doesn't include the `blockchain` property, but it's used in the code.
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);
      // 3. avoid the pattern `if (condition) { return result } else { return anotherResult }` since the `else` is not necessary.
      if (leftPriority > rightPriority) {
        // 6. the sort comparator function can return `rightPriority - leftPriority`. In my opinion, this is cleaner to read.
        return -1;
      } else if (rightPriority > leftPriority) {
        return 1;
      }
    });
    // 8.  The `useMemo` of `sortedBalance` has an unnecessary dependencies `prices` which can be removed
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  // 7. The `formattedBalances` is assigned a value but never used but the original `sortedBalanced` is used to calculate `rows`.
  // We can also do the mapping right away, together with the filter and sort in order to get the `formattedBalances`.
  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        // 9. The `index` is being used for the `key` which is not reccommended as the order of the list may change over time and can cause confusing issues.
        // This is officially stated in react docs: https://react.dev/learn/rendering-lists#why-does-react-need-keys.
        // Instead, we can use a combination of currency and blockchain as the key.
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}