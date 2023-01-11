import React, {useState } from 'react';
import "./httpcat.css"

function HttpCat() {
    const [statusCode, setStatusCode] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleChange = event => {
        setStatusCode(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        fetch(`https://cors-anywhere.herokuapp.com/https://http.cat/${statusCode}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error loading image');
                }
                return response.blob();
            })
            .then(blob => {
                const imageUrl = URL.createObjectURL(blob);
                setImageUrl(imageUrl);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className='http-cat-container'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="statusCode">Status Code</label>
                <select name="statusCode" id="statusCode" onChange={handleChange}>
                    <option value="">Selecione um status code</option>
                    <option value="200">200 - OK</option>
                    <option value="404">404 - Not Found</option>
                    <option value="202">202 - Accepted</option>
                    <option value="500">500 - Internal Server Error</option>
                </select>
                <button className='catButton' type="submit">Exibir imagem</button>
            </form>
            <div className="center">
              {imageUrl && <img id='catolas' src={imageUrl} alt={`Status code: ${statusCode}`} />}
              <button className="back-button" onClick={() => window.location.href='/MainPage'}>Página principal</button>
            </div>
        </div>
    );
}

export default HttpCat;
