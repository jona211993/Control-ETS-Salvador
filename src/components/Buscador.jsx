import { useState, useEffect } from "react";
import { AutoComplete, Button, Modal } from "antd";
import {FilePdfFilled} from '@ant-design/icons';
import {jsPDF} from 'jspdf';
import "jspdf-autotable";
import data from "../data/data.json";
import "../styles/buscador.css";
import useLista from "../store/listaStore";

export const Buscador = () => {
  const { items, addItem, clearItems } = useLista();

  const [myOptions, setMyOptions] = useState(data.opciones);
  const [inputValue, setInputValue] = useState("");
  const [padronValue, setPadronValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const handleSearch = (value) => {
    // Filtra las opciones basándose en la entrada del usuario
    const filteredOptions = data.opciones.filter((option) =>
      option.value.toLowerCase().includes(value.toLowerCase())
    );

    // Actualiza las opciones del autocompletado
    setMyOptions(filteredOptions);
  };
  const handleSelect = (value) => {
    // Actualiza el estado con el valor seleccionado
    setInputValue(value);
    setSelectedValue(value);
  };
  const handlePadronChange = (e) => {
    // Manejador de cambios para el input del padron
    setPadronValue(e.target.value);
    console.log(padronValue);
  };
  const aniadirConductor = () => {
    if (inputValue.trim() !== "" && padronValue != "" && padronValue <= 138) {
      // Verificar si ya existe un elemento con el mismo nombre
      const nombreExistente = items.some(
        (item) => item.nombre === selectedValue
      );
      const padronExistente = items.some((item) => item.padron === padronValue);
      if (!nombreExistente && !padronExistente) {
        const now = new Date(); // Obtener la fecha y hora actuales
        const hora = now.toLocaleTimeString();
        const estadoDefecto = "Reten";
        console.log(hora);
        addItem({
          id: items.length + 1,
          padron: padronValue,
          nombre: inputValue,
          hora: hora,
          estado: estadoDefecto,
        });
        // Reinicia el valor del input después de añadir
        console.log("Añadido:", inputValue);
        setInputValue("");
        setSelectedValue(""); 
        Modal.success({
          title: "Añadido",
          content: "Registro Exitoso!!.",
        });
        
      } else {
        // Muestra el modal si el nombre ya existe
        setModalVisible(true);
      }
    }
  };
  const handleModalOk = () => {
    // Cierra el modal
    setModalVisible(false);
    setInputValue(""); // Reinicia el valor del input después de añadir
  };
  const vaciarLista=()=>{
    if(items.length>0)
    setModalVisible2(true);
  }
  const handleConfirmarVaciarLista = () => {
    // Lógica para vaciar la lista
    clearItems();

    // Cierra el nuevo modal de confirmación
    setModalVisible2(false);
  };
  const handleCancelarVaciarLista = () => {
    // Cierra el nuevo modal de confirmación
    setModalVisible2(false);
  };

  const generar_pdf =()=>{
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('COLA DE RETENES',doc.internal.pageSize.getWidth() / 2, 15, 'center');
    const currentDate = new Date().toLocaleDateString();
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`Fecha : ${currentDate}`,20,30)
    doc.autoTable({
      startY: 40,
      head: [['Orden', 'Padron', 'Nombre', 'Hora de llegada']],
      body: items.map(item => [item.id, item.padron, item.nombre, item.hora]),
    });

    // Descargar el PDF con un nombre específico
    doc.save(`RegistroDeLlegadaRetenes_${currentDate}.pdf`);

   console.log('pdf generado');
  }

  return (
    <div className="container-busqueda">
       <div className="container-pdf">
        <FilePdfFilled onClick={generar_pdf} style={{color: 'red', fontSize: '32px'}} />
        <h4>PDF</h4>
      </div>
      <div className="container-padron">
        <h2>Padrón: </h2>
        <input type="text" value={padronValue} onChange={handlePadronChange} />
      </div>
      <div>
        <AutoComplete
          style={{
            width: 318,
          }}
          options={myOptions}
          placeholder="Ingrese nombre dle conductor"
          onSearch={handleSearch}
          onSelect={handleSelect}
        />
      </div>

      <div className="container-btn">
        <Button type="primary" onClick={aniadirConductor}>
          Añadir
        </Button>
        <Button type="primary" danger onClick={vaciarLista}>
          Refrescar
        </Button>
      </div>
      <Modal
        title="Conductor Existente"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
      >
        El conductor o el padron ya está en cola. Por favor, ingrese un nombre
        diferente.
      </Modal>
      <Modal
        title="Confirmar"
        open={modalVisible2}
        onOk={handleConfirmarVaciarLista}
        onCancel={handleCancelarVaciarLista}
      >
        ¿Estas seguro de eliminar todos los datos de la tabla?
      </Modal>
    </div>
  );
};
