import { Link } from "react-router-dom";
import './styleLandingPage.css'

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Are you looking for a new dog?</h1>
        <img src="/imagenes/fondoLandingPage.jpg" alt="imagen de fondo" />
        <Link to="/home">
          <button>Enter</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;

