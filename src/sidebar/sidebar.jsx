import { useState } from "react";
import "./sidebar.css";
import iconoHome from "./IMG/globo.png"
import contac from "./IMG/contacto.png"
import aboutUs from "./IMG/sobre-nosotros.png"

const menuD = [
    { icono: iconoHome, texto: "Home", key: "home" },
    { icono: contac, texto: "Contacto", key: "contact" },
    { icono: aboutUs, texto: "Nosotros", key: "about" }
];

export default function Sidebar({ onSectionChange }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <div
            className={`sidebar ${expanded ? "expanded" : ""}`}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}>
            <ul>
                {menuD.map((item, i) => (
                    <li key={i} onClick={() => onSectionChange(item.key)}>
                        <img src={item.icono} alt="" className="icon"  />
                        {expanded && <span className="label">{item.texto}</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
}
