import { Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/login/LoginForm";
import MainPage from "./pages/home/HomePage";
import HttpCat from "./pages/http-cat/HttpCat";
import ClientForm from "./pages/register/Register";
import Menu from "./components/Menu";
import RandomDog from "./pages/http-dog/HttpDog";

const App = () => {
  return (
    <div className="app">
      <Menu />
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/HttpCat" element={<HttpCat />} />
        <Route path="/ClientForm" element={<ClientForm />} />
        <Route path="/RandomDog" element={<RandomDog />} />
      </Routes>
    </div>
  );
};

export default App;
