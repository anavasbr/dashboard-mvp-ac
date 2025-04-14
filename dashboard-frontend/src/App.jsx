import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import "./index.css";

function App() {
  const [clientes, setClientes] = useState([]);
  const [cotacaoDolar, setCotacaoDolar] = useState(null);
  const [valorReal, setValorReal] = useState("");
  const [valorConvertido, setValorConvertido] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [novoCliente, setNovoCliente] = useState({
    nome: "",
    cidade: "",
    total_compras: "",
  });

  const [modoEdicao, setModoEdicao] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);

  const buscarClientes = () => {
    fetch("http://localhost:5000/clientes")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => console.error("Erro ao buscar clientes:", err));
  };

  useEffect(() => {
    buscarClientes();
  }, []);

  useEffect(() => {
    fetch("http://localhost:5001/cotacao")
      .then((res) => res.json())
      .then((data) => setCotacaoDolar(data.cotacao))
      .catch((err) => console.error("Erro ao buscar cotação:", err));
  }, []);

  const converter = () => {
    if (cotacaoDolar && valorReal) {
      const resultado = parseFloat(valorReal) / cotacaoDolar;
      setValorConvertido(resultado.toFixed(2));
    }
  };

  const deletarCliente = (id) => {
    fetch(`http://localhost:5000/clientes/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => buscarClientes())
      .catch((err) => console.error("Erro ao deletar cliente:", err));
  };

  const salvarNovoCliente = () => {
    const metodo = modoEdicao ? "PUT" : "POST";
    const url = modoEdicao
      ? `http://localhost:5000/clientes/${clienteEditando}`
      : "http://localhost:5000/clientes";

    fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoCliente),
    })
      .then((res) => res.json())
      .then(() => {
        buscarClientes();
        setMostrarModal(false);
        setNovoCliente({ nome: "", cidade: "", total_compras: "" });
        setModoEdicao(false);
        setClienteEditando(null);
      })
      .catch((err) => console.error("Erro ao salvar cliente:", err));
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">DASHBOARD MVP AC</h1>
      </header>

      <div className="content">
        <section className="box cotacao" style={{ flex: 0.8 }}>
          <h2>
            Cotação do Dólar:
            <span
              style={{ fontSize: "14px", marginLeft: "10px", color: "#555" }}
            >
              ({new Date().toLocaleDateString("pt-BR")})
            </span>
          </h2>
          <p className="valor-dolar">
            R$ {cotacaoDolar ? cotacaoDolar.toFixed(2) : "..."}
          </p>

          <div className="converter">
            <p>Faça a conversão:</p>
            <label>
              Valor em Real:
              <input
                type="number"
                value={valorReal}
                onChange={(e) => setValorReal(e.target.value)}
                placeholder="R$"
              />
            </label>
            <label>
              Total em Dólar:
              <input
                type="text"
                disabled
                value={valorConvertido ? `USD ${valorConvertido}` : ""}
              />
            </label>
            <button onClick={converter}>Converter</button>
          </div>
        </section>

        <section className="box tabela" style={{ flex: 1.5 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>Cadastro de Clientes</h2>
            <button
              onClick={() => setMostrarModal(true)}
              style={{
                padding: "8px 12px",
                background: "#353a72",
                color: "#fff",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              <FaPlus style={{ marginRight: 6 }} /> Novo Cliente
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Empresa</th>
                <th>Cidade</th>
                <th>Total em Compras</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.nome}</td>
                  <td>{cliente.cidade ?? "-"}</td>
                  <td>
                    R${" "}
                    {cliente.total_compras.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}{" "}
                    <br />(
                    {cotacaoDolar
                      ? `${(cliente.total_compras / cotacaoDolar).toFixed(
                          2
                        )} USD`
                      : "..."}
                    )
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setNovoCliente(cliente);
                        setClienteEditando(cliente.id);
                        setModoEdicao(true);
                        setMostrarModal(true);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        marginRight: 8,
                      }}
                    >
                      <FaEdit color="#353a72" />
                    </button>

                    <button
                      onClick={() => deletarCliente(cliente.id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <FaTrash color="crimson" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Novo Cliente</h3>
            <label>
              Nome:
              <input
                type="text"
                value={novoCliente.nome}
                onChange={(e) =>
                  setNovoCliente({ ...novoCliente, nome: e.target.value })
                }
              />
            </label>
            <label>
              Cidade:
              <input
                type="text"
                value={novoCliente.cidade}
                onChange={(e) =>
                  setNovoCliente({ ...novoCliente, cidade: e.target.value })
                }
              />
            </label>
            <label>
              Total em Compras:
              <input
                type="number"
                value={novoCliente.total_compras}
                onChange={(e) =>
                  setNovoCliente({
                    ...novoCliente,
                    total_compras: e.target.value,
                  })
                }
              />
            </label>
            <div className="modal-actions">
              <button onClick={salvarNovoCliente} className="btn-salvar">
                Salvar
              </button>
              <button
                onClick={() => setMostrarModal(false)}
                className="btn-cancelar"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
