import { useState, useEffect } from "react";
import img2 from "./assets/3.jpg";
import img3 from "./assets/1.jpg";
import img4 from "./assets/2.jpg";
import "./index.css"


const images = [
    {
        url: img2,
        title: "Expo Tencnologica Mundial ",
        desc: "Explora cómo la innovación redefine nuestras tradiciones. Sumérgete en un recorrido donde la creatividad humana se fusiona con herramientas digitales, mostrando cómo la tecnología transforma el arte, la educación y la forma en que conectamos con el mundo."
    },
    {
        url: img3,
        title: "Expo 2025 Osaka",
        desc: "Un vistazo a las ideas que darán forma al mañana. Descubre proyectos visionarios, avances científicos y soluciones sostenibles que marcarán el ritmo del futuro. En Osaka, el futuro no solo se imagina: se construye."
    }
    ,
    {
        url: img4,
        title: "Innovación Global",
        desc: "Un espacio donde las mentes brillantes del planeta convergen para transformar desafíos en oportunidades. Desde inteligencia artificial hasta energías renovables, aquí nacen las ideas que impulsarán el progreso mundial."
    }
];

const aboutUSInfo = {
    title: "Sobre la Expo Bengala 2025",
    desc: "La Expo Bengala 2025 reúne a expertos, empresas y entusiastas para explorar las tecnologías que transformarán el mundo. Un espacio donde la innovación y el futuro convergen."
};

const contacotInfo = {
    title: "Contacto",
    desc: "📩 Correo:\n info@expobengala.com\n\n📞 Teléfono:\n +52 55 1234 5678\n\n📍 Dirección:\n Centro de Innovación Tecnológica, CDMX."
};

export default function Carousel({ section }) {
    const isHome = section === "home";
    const isAbout = section === "about";
    const isContact = section === "contact";

    const [index, setIndex] = useState(0);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const rect = currentTarget.getBoundingClientRect();

        // pos relativa
        const x = ((clientX - rect.left) / rect.width - 0) * 20;
        const y = ((clientY - rect.top) / rect.height - 0) * 20;

        setTilt({ x, y });
    };

    const resetTilt = () => {
        setTilt({ x: 0, y: 0 });
    };

    //Detecta cambios en deslizamiento del carrousel
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
        touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();   
            else prevSlide();            
        }
    };
    // Funcion siguiente
    const nextSlide = () => {
        setIndex((i) => (i + 1) % images.length);
    };
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 8000);

        return () => clearInterval(interval);
    }, [index]);
    // Funcion anterior
    const prevSlide = () => {
        setIndex((i) => (i - 1 + images.length) % images.length);
    };

    // Ir a un slide especifico (dots)
    const goToSlide = (i) => {
        setIndex(i);
    };

    return (
        <div className="carousel" onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}>

            {isAbout && images.map((img, i) => (

                <div
                    key={i}
                    className={`slide ${i === index ? "active" : ""}`}
                    style={{ backgroundImage: `url(${img.url})` }}
                >
                    <div className="content" onMouseMove={handleMouseMove}
                        onMouseLeave={resetTilt}
                        style={{
                            transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                        }}>
                        <h1>{aboutUSInfo.title}</h1>
                        <p style={{ whiteSpace: "pre-line" }}>{aboutUSInfo.desc}</p>
                    </div>
                </div>

            ))}

            {isContact && images.map((img, i) => (

                <div
                    key={i}
                    className={`slide ${i === index ? "active" : ""}`}
                    style={{ backgroundImage: `url(${img.url})` }}
                >
                    <div className="content" onMouseMove={handleMouseMove}
                        onMouseLeave={resetTilt}
                        style={{
                            transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                        }}>
                        <h1>{contacotInfo.title}</h1>
                        <p style={{ whiteSpace: "pre-line" }}>{contacotInfo.desc}</p>
                    </div>
                </div>

            ))}
            {isHome && images.map((img, i) => (
                <div
                    key={i}
                    className={`slide ${i === index ? "active" : ""}`}
                    style={{ backgroundImage: `url(${img.url})` }}
                >
                    <div className="content" onMouseMove={handleMouseMove}
                        onMouseLeave={resetTilt}
                        style={{
                            transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                        }}>
                        <h1>{img.title}</h1>
                        <p>{img.desc}</p>
                    </div>
                </div>
            ))}

            {/* Boton anterior */}
            <button className="arrow left" onClick={prevSlide}>
                &#10094;
            </button>

            {/* Boton siguiente */}
            <button className="arrow right" onClick={nextSlide}>
                &#10095;
            </button>

            {/* Ccontenedor de puntos */}
            <div className="dots">
                {images.map((_, i) => (
                    <span
                        key={i}
                        className={`dot ${i === index ? "active" : ""}`}
                        onClick={() => goToSlide(i)}
                    ></span>
                ))}
            </div>
        </div>
    );
}
