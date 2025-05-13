import { useState } from "react";
import Main from "./Main";
import Footer from "./Footer";
import CurrencyRates from "./CurrencyRates";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Main />
      <Footer />
    </>
  );
}

export default App;
