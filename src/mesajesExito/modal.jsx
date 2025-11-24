import React from "react";
import "./exito.css";

export default function ModalFuturista({ open, title, message, onClose }) {
    if (!open) return null;

    return (
        <div className="mf-overlay" onClick={onClose}>
            <div className="mf-container" onClick={(e) => e.stopPropagation()}>
                <h2 className="mf-title">{title}</h2>
                <p className="mf-message">{message}</p>

                <button className="mf-btn" onClick={onClose}>
                    Cerrar
                </button>
            </div>
        </div>
    );
}
