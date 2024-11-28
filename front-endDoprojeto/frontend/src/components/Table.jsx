import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Table = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cpfData = queryParams.get("cpf");
  const dateData = queryParams.get("data");

  // Recupera os agendamentos do localStorage ou inicializa com dados padrão
  const [rows, setRows] = useState(() => {
    const savedRows = localStorage.getItem("rows");
    return savedRows ? JSON.parse(savedRows) : [
      { id: 1, cpf: cpfData || '', date: dateData }
    ];
  });

  // Função para calcular o cronômetro
  const calculateTimer = (startTime, endTime) => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    const startInMinutes = startHours * 60 + startMinutes;
    const endInMinutes = endHours * 60 + endMinutes;

    const diffInMinutes = Math.max(0, endInMinutes - startInMinutes); // Evita valores negativos
    const hours = Math.floor(diffInMinutes / 60).toString().padStart(2, "0");
    const minutes = (diffInMinutes % 60).toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  // Função para adicionar um novo agendamento
  const addAgendamento = (cpf, date, startTime, endTime) => {
    const newId = rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1;

    const newAgendamento = {
      id: newId,
      cpf,
      date,
      startTime,
      endTime,
      isEditing: false,
    };

    // Atualiza o estado com o novo agendamento
    const updatedRows = [...rows, newAgendamento];
    setRows(updatedRows);

    // Salva no localStorage
    localStorage.setItem("rows", JSON.stringify(updatedRows));
  };

  // Função para alternar o modo de edição
  const toggleEdit = (id) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, isEditing: !row.isEditing } : row
      )
    );
  };

  // Função para atualizar os campos de horários
  const handleEdit = (id, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
    localStorage.setItem("rows", JSON.stringify(rows)); // Salva os dados no localStorage
  };

  // Função para deletar uma linha
  const handleDelete = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
    localStorage.setItem("rows", JSON.stringify(updatedRows));
  };

  useEffect(() => {
    if (cpfData || dateData) {
      // Verifica se já existe um agendamento com os dados recebidos (cpf e date)
      const exists = rows.some(row => row.cpf === cpfData && row.date === dateData);

      if (!exists) {
        // Adiciona o novo agendamento apenas se ele ainda não estiver presente
        const newAgendamento = {
          id: rows.length + 1, // Incrementa o ID
          cpf: cpfData || '',
          date: dateData || "24/11/2024",
          startTime: "09:00",
          endTime: "10:00",
          isEditing: false,
        };

        // Adiciona o novo agendamento
        const updatedRows = [...rows, newAgendamento];
        setRows(updatedRows);
        localStorage.setItem("rows", JSON.stringify(updatedRows));
      }
    }
  }, [cpfData, dateData, rows]);

  return (
    <div style={styles.container}>
      <div style={styles.boxContainer}>
        <div style={styles.titleContainer}>
          <h1 style={styles.title}>DADOS DO CLIENTE</h1>
          <h1 style={styles.title}>DADOS DO ATENDIMENTO</h1>
        </div>

        {/* Cabeçalhos das colunas */}
        <div style={styles.headerRow}>
          <span style={styles.columnHeader}>CPF</span>
          <span style={styles.columnHeader}>DATA</span>
          <span style={styles.columnHeader}>HORÁRIO INÍCIO</span>
          <span style={styles.columnHeader}>HORÁRIO TÉRMINO</span>
          <span style={styles.columnHeader}>CRONÔMETRO</span>
          <span style={styles.columnHeader}>AÇÕES</span>
        </div>

        {/* Dados das linhas */}
        {rows.length > 0 ? (
          rows.map((row) => (
            <div key={row.id} style={styles.dataRow}>
              <span style={styles.cell}>{row.cpf}</span>
              <span style={styles.cell}>{row.date}</span>
              {row.isEditing ? (
                <input
                  type="text"
                  value={row.startTime}
                  style={styles.input}
                  onChange={(e) => handleEdit(row.id, "startTime", e.target.value)}
                />
              ) : (
                <span style={styles.cell}>{row.startTime}</span>
              )}
              {row.isEditing ? (
                <input
                  type="text"
                  value={row.endTime}
                  style={styles.input}
                  onChange={(e) => handleEdit(row.id, "endTime", e.target.value)}
                />
              ) : (
                <span style={styles.cell}>{row.endTime}</span>
              )}
              <span style={styles.cell}>
                {calculateTimer(row.startTime, row.endTime)}
              </span>
              <div style={styles.actions}>
                <img
                  src="/edit-icon.png"
                  alt="Editar"
                  style={styles.icon}
                  onClick={() => toggleEdit(row.id)}
                />
                <img
                  src="/delete-icon.png"
                  alt="Deletar"
                  style={styles.icon}
                  onClick={() => handleDelete(row.id)}
                />
              </div>
            </div>
          ))
        ) : (
          <div style={styles.noData}>Nenhum agendamento encontrado.</div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: "url('./background.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",  // A página ocupará no mínimo a altura da tela
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",  // Isso garante que o footer será empurrado para o final
    color: "#D4C9BE",
  },
  headerRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 0.5fr", // Divisão para 6 colunas
    width: "100%",
    textAlign: "center",
    padding: "10px 0",
    backgroundColor: "#130404",
    color: "#D4C9BE",
    borderBottom: "2px solid #D4C9BE",
  },
  dataRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 0.5fr", // Mesma divisão do cabeçalho
    width: "100%",
    textAlign: "center",
    padding: "10px 0",
    backgroundColor: "#46121C",
    color: "#D4C9BE",
    borderBottom: "1px solid #D4C9BE",
  },
  cell: {
    padding: "5px",
  },
  input: {
    width: "90%",
    padding: "5px",
    textAlign: "center",
    borderRadius: "5px",
    border: "1px solid #D4C9BE",
    backgroundColor: "#46121C",
    color: "#D4C9BE",
  },
  columnHeader: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: "20px",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
    gap: "20px",
  },
  navLink: {
    color: "#D4C9BE",
    textDecoration: "none",
  },
  boxContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "90%",
    marginTop: "20px",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  icon: {
    width: "20px",
    height: "20px",
    cursor: "pointer",
  },
};

export default Table;