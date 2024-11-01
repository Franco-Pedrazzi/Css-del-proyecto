import React from 'react'; 
import Banner from '../assets/catalogo.jpeg';
import './Categorias.css';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
// Importar Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Componente de Font Awesome
import { faRandom, faSearch } from '@fortawesome/free-solid-svg-icons'; // Importar iconos específicos

function Categorias() {

  const navigate = useNavigate(); // Inicializa useNavigate

  // Función para redirigir a la página de Preguntas
  const handleRedirect = () => {
    navigate('/preguntas'); // Redirige a la ruta de Preguntas
  };

  return (
    <div className="app-container"> {/* Contenedor principal de la aplicación */}
      <img src={Banner} alt="Banner" className="banner" /> {/* Banner de la aplicación */}
      <div className="text-container"> {/* Contenedor para el texto */}
        <h1 className="title">Categorias</h1> {/* Título principal */}
        <p className="description">Aquí puedes explorar diferentes categorías.</p> {/* Descripción */}
        <div className="button-group"> {/* Contenedor para los botones */}
          {/* Botón Aleatorio con icono */}
          <button className="random-button" onClick={handleRedirect}> {/* Agrega onClick para redirigir */}
            <FontAwesomeIcon icon={faRandom} /> Aleatoria {/* El icono se añade aquí */}
          </button>
          {/* Botón Específico con icono */}
          <button className="specific-button">
            <FontAwesomeIcon icon={faSearch} /> Específica {/* El icono se añade aquí */}
          </button>   
        </div>
      </div>
      
    </div>
  );
}

export default Categorias; 