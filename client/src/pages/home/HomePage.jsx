import React, { useState, useEffect } from 'react';
import './UserGrid.css';

const API_URL = 'https://randomuser.me/api/';

function MainPage() {
    // array de todos os usuários que foram obtidos da API
    const [allUsers, setAllUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    // carrega os usuários da API quando a página é alterada

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch(`${API_URL}?page=${page}&results=10`);
            const data = await res.json();
            setAllUsers(data.results);
            setUsers(data.results);
        };

        fetchUsers();
    }, [page]);

    // filtra os usuários ao alterar o valor da busca
    useEffect(() => {
        setUsers(
            allUsers.filter((user) => {
                return (
                    user.name.first.toLowerCase().includes(search.toLowerCase()) ||
                    user.name.last.toLowerCase().includes(search.toLowerCase()) ||
                    user.email.toLowerCase().includes(search.toLowerCase()) ||
                    user.login.username.toLowerCase().includes(search.toLowerCase())
                );
            })
        );
    }, [search, allUsers]);

    return (
        
        <div className="main-page">
            
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Pesquisar por nome, email ou username"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                
            </div>
            
            
            <div className="user-grid">
                {users.map((user) => (
                    <div className="user-card" key={`${user.name.first}${user.name.last}`}>
                        <img src={user.picture.large} alt={`Foto de ${user.name.first} ${user.name.last}`} />
                        <div className="info">
                            <h3>{`${user.name.first} ${user.name.last}`}</h3>
                            {user.dob.age && <p>{`${user.dob.age} anos`}</p>}
                            <p>Email: {user.email}</p>

                            {user.login.username && <p>{`Username: ${user.login.username}`}</p>}

                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button onClick={() => setPage(page - 1)}>Anterior</button>
                <button onClick={() => setPage(page + 1)}>Próximo</button>
            </div>
        </div>
        
    )
};
export default MainPage;
