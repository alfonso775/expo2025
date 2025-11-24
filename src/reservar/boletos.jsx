import { useEffect, useState } from "react";
import "./boletos.css";

export default function TicketModal({
    open,
    onClose,
    setShowModal,
    setModalTitle,
    setModalMessage
}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [date, setDate] = useState("");
    const [tickets, setTickets] = useState(1);
    const [errors, setErrors] = useState({});

    // ⏳ Tiempo en segundos (3 minutos)
    const INITIAL_TIME = 3 * 60;
    const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

    // Precios
    const TICKET_PRICE = 550;

    // Reset del temporizador cuando se abre el modal
    useEffect(() => {
        if (open) {
            setTimeLeft(INITIAL_TIME);
        }
    }, [open]);

    // ⏳ Cuenta regresiva
    useEffect(() => {
        if (!open) return;

        if (timeLeft <= 0) {
            setModalTitle("Tiempo agotado");
            setModalMessage("El tiempo para completar el registro ha expirado.");
            setName("");
            setEmail("");
            setPhone("");
            setDate("");
            setTickets(1);
            setShowModal(true);
            onClose();
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft, open]);

    // Formato mm:ss
    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    // Cerrar con tecla ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!open) return null;

    // Validaciones
    const validate = () => {
        const newErrors = {};

        if (!name.trim() || name.length < 3)
            newErrors.name = "El nombre debe tener al menos 3 letras.";

        if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/.test(name))
            newErrors.name = "El nombre solo puede contener letras.";

        if (!email.includes("@") || !/\S+@\S+\.\S+/.test(email))
            newErrors.email = "Correo electrónico no válido.";

        if (!/^\d{10,}$/.test(phone))
            newErrors.phone = "El número debe tener al menos 10 dígitos.";

        if (!date)
            newErrors.date = "Debes seleccionar una fecha.";

        if (tickets < 1 || tickets > 10)
            newErrors.tickets = "Puedes comprar entre 1 y 10 boletos.";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleBuy = async () => {
        if (!validate()) return;

        const total = tickets * TICKET_PRICE;
        const cardNumber = 1234456778911234;
        const exp = "2025";
        const cvv = 947;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("date", date);
        formData.append("tickets", tickets);
        formData.append("cardNumber", cardNumber);
        formData.append("exp", exp);
        formData.append("cvv", cvv);

        const res = await fetch("https://bengalaexpo2025.infinityfree.me/BENGALA-BACKEND/guardar_compra.php", {
            method: "POST",
            body: formData
        });

        const text = await res.text();

        if (text.includes("success")) {
            setName("");
            setEmail("");
            setPhone("");
            setDate("");
            setTickets(1);
            setModalTitle("Compra Exitosa");
            setModalMessage("¡Tu compra ha sido registrada correctamente!");
            setShowModal(true);
            onClose();
        } else {
            setModalTitle("Error");
            setModalMessage("Hubo un error al guardar la compra: " + text);
            setShowModal(true);
        }
    };

    const stopPropagation = (e) => e.stopPropagation();

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={stopPropagation}>



                <h2>Compra de boletos</h2>
                <p>Completa los datos para procesar tu compra.</p>

                {/* Nombre */}
                <label>Nombre completo</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                />
                {errors.name && <span className="error">{errors.name}</span>}

                {/* Correo */}
                <label>Correo electrónico</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@example.com"
                />
                {errors.email && <span className="error">{errors.email}</span>}

                {/* Teléfono */}
                <label>Número telefónico</label>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10 dígitos"
                />
                {errors.phone && <span className="error">{errors.phone}</span>}

                {/* Boletos */}
                <label>Cantidad de boletos</label>
                <input
                    type="number"
                    min="1"
                    max="10"
                    value={tickets}
                    onChange={(e) => setTickets(parseInt(e.target.value))}
                />
                {errors.tickets && <span className="error">{errors.tickets}</span>}

                {/* Fecha */}
                <label>Fecha disponible</label>
                <select value={date} onChange={(e) => setDate(e.target.value)}>
                    <option value="">Selecciona una fecha...</option>
                    <option value="15 enero">📅 15 de Enero</option>
                    <option value="16 enero">📅 16 de Enero</option>
                    <option value="17 enero">📅 17 de Enero</option>
                </select>
                {errors.date && <span className="error">{errors.date}</span>}

                {/* Total */}
                <p className="total">
                    Total: <strong>${tickets * TICKET_PRICE} MXN</strong>
                </p>

                <button className="buy-button" onClick={handleBuy}>
                    Comprar
                </button>

                <button className="close-button" onClick={onClose}>
                    Cerrar
                </button><br /><br />
                <div className="timer">
                    Tiempo restante: <strong>{formatTime(timeLeft)}</strong>
                </div>
            </div>
        </div>
    );
}
