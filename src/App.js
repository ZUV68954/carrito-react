import React, {useEffect, useState} from 'react';
import AwesomeButtonStyles from 'react-awesome-button/src/styles/styles.scss';
import {AwesomeButton} from "react-awesome-button";

function App() {
    const [articulos, setArticulos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [showCart, setShowCart] = useState(false);

    // Carga los artículos desde el archivo JSON
    useEffect(() => {
        fetch('/articulos_navideños.json')
            .then((response) => response.json())
            .then((data) => setArticulos(data))
    }, []);

    // Añade el artículo al carrito
    const añadirAlCarrito = (articulo) => setCarrito([...carrito, articulo]);

    // Muestra y oculta el carrito
    const toggleCart = () => setShowCart(!showCart);

    return (
        <div>
            <h1 style={{marginLeft: '2px'}}>Artículos Navideños</h1>

            {/* Botón para mostrar el carrito */}

            <AwesomeButton style={{ marginLeft: '1%'}} type={"youtube"} onPress={toggleCart}>
                Carrito de Compras
            </AwesomeButton>


            {/* Lista de artículos */}
            <ul>
                {articulos.map((articulo) => (<li key={articulo.id}>
                        <h3>{articulo.nombre}</h3>
                        <p>{articulo.descripcion}</p>
                        <p>Precio: {articulo.precio}€</p>
                        <AwesomeButton type={"secondary"} onPress={() => añadirAlCarrito(articulo)}>Añadir al Carrito</AwesomeButton>
                    </li>))}
            </ul>

            {/* Pop-up del carrito */}
            {showCart && (<div style={popupStyle}>
                    <h2>Carrito de Compras</h2>
                    <ul>
                        {carrito.map((item, index) => (<li key={index}>
                                {item.nombre} - {item.precio}€
                            </li>))}
                    </ul>
                    <AwesomeButton  onPress={toggleCart}>Cerrar</AwesomeButton>
                </div>)}
        </div>);
}

// Estilo para el pop-up
const popupStyle = {
    position: 'fixed', top: '40%', left: '40%', padding: '20px', border: '1px solid #ddd',
};

export default App;