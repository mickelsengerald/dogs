import { Link } from "react-router-dom";


function LandingPage() {
  return (
    <div className="landing-page">
      <img src="imagen_de_fondo.jpg" alt="imagen de fondo" />
      <Link to="/home">
        <button>Ingresar</button>
      </Link>
    </div>
  );
}

export default LandingPage;
