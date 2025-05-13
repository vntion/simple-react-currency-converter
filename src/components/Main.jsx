import CurrencyRates from "./CurrencyRates";
import Form from "./Form";

function Main() {
  return (
    <main className="mx-auto mt-10 flex w-[70%] max-w-[75rem] flex-wrap gap-3">
      <Form />
      <CurrencyRates />
    </main>
  );
}

export default Main;
