import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import './global.css';

function LoginScreen() {
    const location = useLocation();

    useEffect(() => {
        document.title = "Sharenergy Login";

        // Obtém os dados de usuário e senha armazenados no localStorage
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        // Lógica para implementar a função remember me
        if (storedUsername && storedPassword) {
            // Verifica se os elementos existem antes de atribuir valores a eles
            if (document.getElementById('username') && document.getElementById('password') && document.getElementById('rememberme')) {
                document.getElementById('username').value = storedUsername;
                document.getElementById('password').value = storedPassword;
                document.getElementById('rememberme').checked = true;
            }
        }
    }, [location]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;
        const rememberMe = event.target.elements.rememberme.checked;

        if (username === 'desafiosharenergy' && password === 'sh@r3n3rgy') {
            if (rememberMe) {
                // Armazena os dados de usuário e senha no localStorage
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
            }
            window.location.href = "/MainPage";
        } else {
            alert("Nome de usuario ou senha incorretos");
        }
    }

    return (
        <div className="container">
            <header className="header">
                <img src="logo.png" width="189.15" height="20.53" alt="ShareEnergy Logo" />
                <span>Economize com a Energia Solar!</span>
            </header>

            <form onSubmit={handleSubmit}>
                <div className="inputContainer">
                    <label htmlFor="username">Usuário</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username" />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="***********" />
                </div>

                <label>
                    <input id="chkbox" type="checkbox" name="rememberme" /> Lembrar-me
                </label>
                <br />

                <button id="botaoBonito" className="button">
                    Entrar <img src="" alt="" />
                </button>
            </form>
        </div>
    );
}
export default LoginScreen;
