import React from "react";
import { Table, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import useLista from "../store/listaStore";
import "../styles/lista.css";

export const Lista = () => {
  const { items, removeItem } = useLista();

  const dataSource = items.map((item) => ({
    key: item.id,
    id: item.id,
    padron: item.padron,
    hora: item.hora,
    nombre: item.nombre,
  }));

  const handleEditar = (id) => {
    // Lógica para editar el elemento con el ID proporcionado
    console.log(`Editar elemento con ID ${id}`);
  };

  const handleEliminar = (id) => {
    // Lógica para eliminar el elemento con el ID proporcionado
    removeItem(id);
  };
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
        </Space>
      ),
    },
  ];

  return (
    <div className="container-lista">
      <div className="wraper-list">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};
