const currencyFormatter = (symbol, amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: symbol,
  }).format(amount);
};

export default currencyFormatter;
