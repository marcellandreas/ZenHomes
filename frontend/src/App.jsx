import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/Header";
import Hero from "./components/Hero";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
