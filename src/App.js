import "./App.css";
import Callander from "./pages/Callander.jsx";
import CallanderFooter from "./pages/CallanderFooter.jsx";
import CallanderTop from "./pages/CallanderTop.jsx";
function App() {
  return (
    <main className="">
      <CallanderTop />
      <Callander />
      <CallanderFooter />
    </main>
  );
}

export default App;
