import React, { useEffect, useState } from "react";
import styled from "styled-components";

const calculateAVGMateria = arr =>
  arr.map(materia => ({
    nombre: materia.nombre,
    evaluaciones: materia.evaluaciones ?? 0,
    avg: materia.notas.length
      ? materia.notas.reduce((a, b) => a + b, 0) / materia.notas.length
      : 0,
  }));

const StyledTable = styled.div`
  width: 90%;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 0 0 2rem 0;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f8f9fa;
  padding: 10px 20px;
  font-weight: bold;
  text-transform: uppercase;
  border-bottom: 2px solid #ddd;
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  color: white;
  backdrop-filter: blur(2.9px);
`;

const Column = styled.div`
  flex: 1;
  text-align: center;
  &:first-child {
    text-align: left;
  }
  &:last-child {
    text-align: right;
  }
`;

const ParentDashboardTable = ({ materias }) => {
  const [info, setInfo] = useState(materias);

  useEffect(() => {
    if (materias.length) {
      setInfo(materias);
    }
  }, [materias]);

  return (
    <StyledTable>
      <StyledHeader>
        <Column>Materia</Column>
        <Column>Evaluaciones</Column>
        <Column>Promedio</Column>
      </StyledHeader>
      {info.length ? (
        info.map((materia, index) => (
          <StyledRow key={index}>
            <Column>{materia.materia}</Column>
            <Column>{materia.evaluaciones}</Column>
            <Column>{materia.promedio}</Column>
          </StyledRow>
        ))
      ) : (
        <h1 className="text-center">Cargando contenido</h1>
      )}
    </StyledTable>
  );
};

export default ParentDashboardTable;
