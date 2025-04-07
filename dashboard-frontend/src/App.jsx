import React, { useEffect, useState } from "react";

function App() {
  const [clientes, setClientes] = useState([]);
  const [cotacaoDolar, setCotacaoDolar] = useState(null);
  const [valorReal, setValorReal] = useState("");
  const [valorConvertido, setValorConvertido] = useState("");

  // Buscar clientes
  useEffect(() => {
    fetch("http://localhost:5000/clientes")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => console.error("Erro ao buscar clientes:", err));
  }, []);

  // Buscar cotação do dólar
  useEffect(() => {
    fetch("http://localhost:5001/cotacao")
      .then((res) => res.json())
      .then((data) => setCotacaoDolar(data.cotacao))
      .catch((err) => console.error("Erro ao buscar cotação:", err));
  }, []);

  // Função de conversão
  const converter = () => {
    if (cotacaoDolar && valorReal) {
      const resultado = parseFloat(valorReal) / cotacaoDolar;
      setValorConvertido(resultado.toFixed(2));
    }
  };

  return (
    <div className="container">
      {/* Cabeçalho */}
      <header className="header">
        <h1 className="title">DASHBOARD MVP AC</h1>
      </header>

      {/* Conteúdo */}
      <div className="content">
        {/* Cotação */}
        <section className="box cotacao">
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
            <button onClick={converter}>converter</button>
          </div>
        </section>

        {/* Tabela de Clientes */}
        <section className="box tabela">
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
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default App;
