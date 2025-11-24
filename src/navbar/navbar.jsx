import "./navbar.css";
import enviar from "./IMG/pagar.png"
export default function Navbar({ onBuyClick }) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h2 className="font">Expo Bengala 2025</h2>

        <div className="input-group" onClick={onBuyClick}>
          <p className="font">Buy Tickets</p>
          <button><img src={enviar} alt="" /></button>
        </div>
      </div>
    </nav>
  );
}
