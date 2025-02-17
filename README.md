Hello! Thank you for reviewing my submission.

# Problem 1

Please run this node command to review the code result:

```bash
node problem1/index.js
```

# Problem 2

This project is using Vite, React and TypeScript. You can review it at: https://99tech-problem-2.web.app/


## Setup

For code reviewing and run/build checking, firstly change your directory to problem2:

```bash
cd problem2
```

Run this command to change your local node version to the version specified in `.nvmrc`:

```
nvm use
```

If you don't have `nvm` read, please visit https://nvm.sh and use the curl command to install it.

### Install dependencies

```
npm install
```

### Run for local development

```
npm run dev
```

Project will be running at http://localhost:5173

### Build

Build the project:

```
npm run build
```

# Problem 3

## Comments on given code

Here is my comments for the given code. I also added comments in the given code at `problem3/old-code.tsx` for your ease of reviewing.

1. The function getPriority should be refactored to use a map instead of a switch statement. Also the type `blockchain` should be `string` instead of `any`.

2. `-99` is a magic number, it should be replaced with a constant.

3. avoid the pattern `if (condition) { return result } else { return anotherResult }` since the `else` is not necessary.

4. The WalletBalance interface doesn't include the `blockchain` property, but it's used in the code (at the filter and the sort functions). Also, the `FormattedWalletBalance` is re-defined (not DRY) where it should extends the `WalletBalance` instead.

5. Regarding the filter, there is no `lhsPriority` defined in the filter. The filter also has unexpected logic when it tries to filter `balance.amount < 0`.

6. Regarding the sort, it can return `rightPriority - leftPriority`. In my opinion, this is cleaner to read.

7. The `formattedBalances` is assigned a value but never used but the original `sortedBalanced` is used to calculate `rows`. We can also do the mapping right away, together with the filter and sort in order to get the `formattedBalances`.

8. The `useMemo` of `sortedBalance` has an unnecessary dependencies `prices` which can be removed.

9. The `index` is being used for the `key` which is not reccommended as the order of the list may change over time and can cause confusing issues. This is officially stated in react docs: https://react.dev/learn/rendering-lists#why-does-react-need-keys. Instead, we can use a combination of currency and blockchain as the key.


## Refactored code

Please check the `problem3/refactored-code.tsx` file.