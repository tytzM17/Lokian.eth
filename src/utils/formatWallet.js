const formatWallet = (account) => {
  return `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
};

export default formatWallet;
