import React from "react";
import { useState, useEffect } from "react";
import { Table, Button, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import useLista from "../store/listaStore";
import "../styles/lista.css";

export const Lista = () => {
  const { items, removeItem, updateItemEstado } = useLista();
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

  useEffect(() => {
    console.log("Datos iniciales:", items);
  }, [items]);

  const handleEditar = (id) => {
    // Lógica para editar el elemento con el ID proporcionado
    console.log(`Editar elemento con ID ${id}`);
  };

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
          pagination={{ pageSize: 20 }}
          rowClassName={rowClassName}
        />
      </div>
    </div>
  );
};
