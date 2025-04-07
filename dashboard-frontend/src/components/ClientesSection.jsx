import React, { useEffect, useState } from "react";
import "./ClientesSection.css"; // se você estiver usando CSS puro

function ClientesSection() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/clientes")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => console.error("Erro ao buscar clientes:", err));
  }, []);

  return (
    <div className="clientes-section">
      <h2>Cadastro de Clientes</h2>
      <table>
        <thead>
          <tr>
            <th>Empresa</th>
            <th>Cidade</th>
            <th>Total em Compras</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.cidade}</td>
              <td>
                R$ {cliente.total_compras.toFixed(2)} <br />
                (USD será calculado depois)
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientesSection;
