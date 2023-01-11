import React, { useEffect, useState } from 'react';
import "./HttpDog.css"

function RandomDog() {
    const [imageUrl, setImageUrl] = useState('');

    const handleRefresh = () => {
        fetch('https://random.dog/woof.json')
            .then(response => response.json())
            .then(data => {
                setImageUrl(data.url);
                console.log(data.url);
            })
            .catch(error => {
                console.error(error);
            });
    };
    
    useEffect(() => {
            handleRefresh();
    }, [])

    return (
        <div className="random-dog-container">
            <button className="refresh-button" onClick={handleRefresh}>Atualizar</button>
            {imageUrl && <img src={imageUrl} type='video/mp4' alt="Um cachorro aleatório" className="random-dog-image" />}
            <button className="back-button" onClick={() => window.location.href='/MainPage'}>Página principal</button>
        </div>
    );
}

export default RandomDog;