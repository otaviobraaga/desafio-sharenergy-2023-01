import React, { useState } from 'react';
import axios from 'axios';
import "./Register.css"

function ClientForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [cpf, setCpf] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const validate = () => {
        // Valide os campos do formulário aqui
        let tempErrors = {};
        if (!name) {
            tempErrors.name = 'O nome é obrigatório';
        }
        if (!email) {
            tempErrors.email = 'O email é obrigatório';
        }
        if (!phone) {
            tempErrors.phone = 'O telefone é obrigatório';
        }
        if (!address) {
            tempErrors.address = 'O endereço é obrigatório';
        }
        if (!cpf) {
            tempErrors.cpf = 'O CPF é obrigatório';
        }
        setErrors(tempErrors);
        // Retorne verdadeiro se não houver erros de validação
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = event => {
        // event.preventDefault();
        // Valide os campos do formulário
        const isValid = validate();
        if (!isValid) {
            return;
        }
        // Enviar os dados para o backend aqui
        const clientData = {
            name,
            email,
            phone,
            address,
            cpf,
        }
        axios.post('/ClientForm', clientData)
            .then(res => {
                console.log(res);
                setSuccess(true);
            })
            .catch(error => {
                console.error(error);
                if (error.response.status === 400) {
                    window.alert("Usuário ja cadastrado com esse e-mail ou CPF ");
                }
            });
    };

    return (
        <div>
            <header className='regheader' >
                <a href="/MainPage" onClick={() => window.location.href = '/MainPage'}>
                    <img src="logo.png" width="189.15" height="20.53" alt="ShareEnergy Logo" />
                </a>
            </header>
            <div>
                <div>Otavio</div>
            </div>
            <form className='client-form' onSubmit={handleSubmit}>
                {success && <div className='success'>Cadastro realizado com sucesso</div>}
                <label htmlFor="name">Nome:</label>
                <input
                    type="text"
                    id="name"
                    placeholder='Digite seu nome'
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
                {errors.name && <div className='error'>{errors.name}</div>}
                <br />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder='Digite seu nome'
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                {errors.email && <div className='error'>{errors.email}</div>}
                <br />

                <label htmlFor="phone">Telefone:</label>
                <input
                    type="tel"
                    id="phone"
                    placeholder='Digite seu telefone'
                    value={phone}
                    onChange={event => setPhone(event.target.value)}
                />
                {errors.phone && <div className='error'>{errors.phone}</div>}
                <br />

                <label htmlFor="address">Endereço:</label>
                <input
                    type="text"
                    id="address"
                    placeholder='Digite seu endereço'
                    value={address}
                    onChange={event => setAddress(event.target.value)}
                />
                {errors.address && <div className='error'>{errors.address}</div>}
                <br />

                <label htmlFor="cpf">CPF:</label>
                <input
                    type="text"
                    id="cpf"
                    placeholder='Digite seu CPF'
                    value={cpf}
                    onChange={event => setCpf(event.target.value)}
                />
                {errors.cpf && <div className='error'>{errors.cpf}</div>}
                <br />

                <button type="submit">Cadastrar</button>

                <button className="back-button1" onClick={() => window.location.href = '/MainPage'}>Página principal</button>
            </form>
        </div>

    );
}
export default ClientForm;

