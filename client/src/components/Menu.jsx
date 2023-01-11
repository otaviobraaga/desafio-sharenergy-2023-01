import { useLocation } from "react-router-dom";
import "./Menu.css"

const Menu = () => {
  const location = useLocation();

  // Verifica se o usuário está na página principal
  if (location.pathname !== '/MainPage') {
    return null;
  }

  return (
    <div className="menu">
      <a href="/MainPage">Página principal</a>
      <a href="/HttpCat">Gatos</a>
      <a href="/RandomDog">Cachorros</a>
      <a href="/ClientForm">Cadastrar Usuário</a>
    </div>
  );
};

export default Menu;