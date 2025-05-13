import Select from "react-select";
import { HiMiniArrowPath } from "react-icons/hi2";
import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE;

function Form() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState({
    value: "USD",
    label: "United States Dollar",
  });
  const [to, setTo] = useState({
    value: "GBP",
    label: "British Pound",
  });
  const [supportedCurrency, setSupportedCurrency] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const getSupportedCurrency = async () => {
      try {
        const res = await fetch(`${API_BASE}/currencies`);
        if (!res.ok) throw new Error("Smething wrong");
        let data = await res.json();
        data = Object.entries(data).map(([value, label]) => ({
          value,
          label,
        }));
        setSupportedCurrency(data);
      } catch (err) {
        console.error(err);
      }
    };

    getSupportedCurrency();
  }, []);

  const handleSubmit = async function (e) {
    e.preventDefault();
    try {
      const res = await fetch(
        `${API_BASE}/latest?base=${from.value}&symbols=${to.value}`,
      );
      if (!res.ok) throw new Error("Something wrong");
      const data = await res.json();
      const convertedAmount = (amount * data.rates[to.value]).toFixed(2);
      setResult({
        result: convertedAmount,
        to: to.value,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleRevert = function () {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="shadow-1 basis-[70%] self-start rounded-2xl bg-white p-4">
      <h1 className="border-b border-b-gray-300 pb-1 text-2xl font-bold">
        Currency converter
      </h1>

      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="from">From</label>
          <Select
            isSearchable={true}
            id="from"
            onChange={setFrom}
            value={from}
            defaultValue={from}
            options={supportedCurrency}
          />
        </div>

        <div className="mt-4 text-center *:transition">
          <button
            onClick={handleRevert}
            type="button"
            className="cursor-pointer rounded-full border border-gray-600 p-1.5 hover:border-gray-500/80 hover:*:text-gray-500/80"
          >
            <HiMiniArrowPath className="size-6 text-gray-600" />
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="to">To</label>
          <Select
            isSearchable={true}
            id="to"
            onChange={setTo}
            defaultValue={to}
            value={to}
            options={supportedCurrency}
          />
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <label htmlFor="amount">Amount</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="amount..."
            min={0}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div className="result flex h-28 items-center justify-center">
          {result ? (
            <p>
              {result.result} {result.to}
            </p>
          ) : (
            <p>The result will be shown here</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-3 cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-center text-white transition hover:bg-blue-600"
        >
          Convert
        </button>
      </form>
    </div>
  );
}

export default Form;
