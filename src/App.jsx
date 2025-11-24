import { useState } from 'react'
import Carousel from "./carrousel.jsx";
import Sidebar from "./sidebar/sidebar.jsx";
import Navbar from "./navbar/navbar.jsx";
import Boletos from "./reservar/boletos.jsx"
import ModalExito from "./mesajesExito/modal.jsx";

import './App.css'
function App() {
  const [openModal, setOpenModal] = useState(false);
  const [section, setSection] = useState("home");


  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  return (
    <div className="carousel-item holo-enter">
      <Sidebar onSectionChange={setSection} />
      <div className="main-content">
        <Navbar onBuyClick={() => setOpenModal(true)} />
        <Carousel section={section} />


        <Boletos open={openModal} onClose={() => setOpenModal(false)} setShowModal={setShowModal}
          setModalTitle={setModalTitle}
          setModalMessage={setModalMessage}/>
        <ModalExito
          open={showModal}
          title={modalTitle}
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      </div>
    </div>
  )
}
export default App
