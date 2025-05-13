function CurrencyRatesItem({ currency, rate }) {
  return (
    <>
      <div className="text-gray-500">{currency}</div>
      <div className="">{rate}</div>
    </>
  );
}

export default CurrencyRatesItem;
