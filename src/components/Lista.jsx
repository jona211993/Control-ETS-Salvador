import React from "react";
import { useState, useEffect } from "react";
import { Table, Button, Space , Modal,Input} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import useLista from "../store/listaStore";
import "../styles/lista.css";

export const Lista = () => {
  const { items, removeItem, updateItemEstado, editPadron } = useLista();
  const [rowClasses, setRowClasses] = useState({});
  const [dataSource, setDataSource] = useState(
    items.map((item) => ({
      key: item.id,
      id: item.id,
      padron: item.padron,
      hora: item.hora,
      nombre: item.nombre,
      estado: item.estado, // Asegúrate de incluir el estado en la fuente de datos
    }))
  );

  useEffect(() => {
    setDataSource(
      items.map((item) => ({
        key: item.id,
        id: item.id,
        padron: item.padron,
        hora: item.hora,
        nombre: item.nombre,
        estado: item.estado,
      }))
    );
  }, [items]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [newPadron, setNewPadron] = useState("");

  const handleEditar = (id) => {
    setEditingItemId(id);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingItemId(null);
    setNewPadron("");
  };

  const handleModalOk = () => {
    if (!newPadron.trim()) {
      console.error("Error: El nuevo padron no puede estar vacío.");
      return;
    }

    // Validar que el nuevo padron no exista en otros registros
    const padronExistente = dataSource.some(
      (item) => item.padron === newPadron && item.id !== editingItemId
    );

    if (padronExistente) {
      Modal.error({
        title: "Error",
        content: "El nuevo padron ya existe en otro registro.",
      });
      return;
    }

    // Actualizar el padron utilizando la función editPadron
    editPadron(editingItemId, newPadron);

    // Cerrar el modal y limpiar el estado
    setModalVisible(false);
    setEditingItemId(null);
    setNewPadron("");
  };

  useEffect(() => {
    console.log("Datos iniciales:", items);
  }, [items]); 

  const handleEliminar = (id) => {
    // Lógica para eliminar el elemento con el ID proporcionado
    removeItem(id);
  };
  useEffect(() => {
    const tableRows = document.querySelectorAll(".ant-table-row");
    tableRows.forEach((row) => {
      const recordId = row.getAttribute("data-row-key");
      row.classList.toggle(
        "fila-celeste",
        rowClasses[recordId] === "Promovido"
      );
    });
  }, [rowClasses]);
  const columns = [
    {
      title: "Orden",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Padron",
      dataIndex: "padron",
      key: "padron",
      render: (text) => (
        <span style={{ fontSize: "22px", fontWeight: "bold", color: "red" }}>
          {text}
        </span>
      ),
    },
    {
      title: "Nombre del conductor",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Hora",
      dataIndex: "hora",
      key: "hora",
      render: (text) => (
        <span style={{ fontSize: "22px", fontWeight: "bold" }}>{text}</span>
      ),
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (text, record) => (
        <Space>
          
          <Button
            icon={<EditOutlined style={{ color: "green" }} />}
            onClick={() => handleEditar(record.id)}
          />
          <Button
            icon={<DeleteOutlined style={{ color: "red" }} />}
            onClick={() => handleEliminar(record.id)}
          />
          <Button
            icon={<ArrowUpOutlined style={{ color: "blue" }} />} // Reemplaza 'ChangeIcon' con el icono que desees para la acción de cambio
            onClick={() => handleChangeEstado(record.id, record.estado)}
          />
        </Space>
      ),
    },
  ];

  const rowClassName = (record) => {
    console.log("Estado de la fila:", record.estado);
    return record.estado === "Promovido" ? "fila-celeste" : null;
  };

  const handleChangeEstado = (id, estadoActual) => {
    // Lógica para cambiar el estado
    console.log(`el estado actual es: ${estadoActual}`);
    const nuevoEstado = estadoActual === "Promovido" ? "Reten" : "Promovido";
    updateItemEstado(id, nuevoEstado);

    // Actualizar las clases de estilo para la fila cambiada
    setRowClasses((prevRowClasses) => ({
      ...prevRowClasses,
      [id]: nuevoEstado,
    }));

    // Implementa la lógica para actualizar el estado del item con el ID proporcionado
    console.log(`Cambiar estado del elemento con ID ${id} a ${nuevoEstado}`);
  };
  console.log("Renderizando Lista component");
  return (
    <div className="container-lista">
      <div className="wraper-list">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 50 }}
          rowClassName={rowClassName}
        />
      </div>
      <Modal
        title="Editar Padron"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Input
          value={newPadron}
          onChange={(e) => setNewPadron(e.target.value)}
          placeholder="Nuevo Padron"
        />
      </Modal>
    </div>
  );
};
