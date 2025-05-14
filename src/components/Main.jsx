import CurrencyRates from "./CurrencyRates";
import Form from "./Form";

function Main() {
  return (
    <main className="mx-auto mt-10 flex w-[70%] max-w-[75rem] flex-col gap-3 overflow-visible lg:max-h-[33rem] lg:flex-row">
      <Form />
      <CurrencyRates />
    </main>
  );
}

export default Main;
