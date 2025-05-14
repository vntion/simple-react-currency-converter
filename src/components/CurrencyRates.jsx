import { useEffect, useState } from "react";
import CurrencyRatesItem from "./CurrencyRatesItem";

function CurrencyRates() {
  const [ratesData, setRatesData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowAll, setIsShowAll] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE}/latest?base=USD`,
        );
        if (!res.ok) throw new Error("Something went wrong");

        const data = await res.json();

        setRatesData(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  if (isLoading || !ratesData) return <p>Loading...</p>;

  let latestRates = Object.entries(ratesData.rates).map(([currency, rate]) => ({
    currency,
    rate: rate.toFixed(2),
  }));

  latestRates = isShowAll ? latestRates : latestRates.slice(0, 15);

  return (
    <div className="shadow-1 grow-1 rounded-2xl p-4">
      <h1 className="border-b border-b-gray-300 pb-1 text-2xl font-bold">
        Currency rates
      </h1>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            className="size-10 overflow-hidden rounded-xl"
            src={`${import.meta.env.VITE_API_FLAG}/us.svg`}
            alt="us flag"
          />
          <span>USD</span>
        </div>

        <div className="text-xs text-gray-500">{ratesData?.date}</div>
      </div>

      <div className="mt-4">
        <div className="mb-1 grid grid-cols-2 border-b border-gray-500 text-center text-xs text-gray-500">
          <div>Name</div>
          <div className="">Price</div>
        </div>

        <div className="grid grid-cols-2 gap-y-1 text-sm">
          {latestRates.map((item, i) => (
            <CurrencyRatesItem
              key={i}
              currency={item.currency}
              rate={item.rate}
            />
          ))}
          <button
            onClick={() => setIsShowAll((state) => !state)}
            className="w-max cursor-pointer border-b text-xs text-neutral-400 hover:text-neutral-600"
          >
            {isShowAll ? "Hide bank rates" : "View all bank rates"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CurrencyRates;
