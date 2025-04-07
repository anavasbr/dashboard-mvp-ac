from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import requests

app = Flask(__name__)
CORS(app)


# Conexão com o banco de dados
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Ana@1234",  # ou a senha que você usou
    database="vendas_db"
)

cursor = db.cursor()



@app.route("/")
def home():
    return "API de Vendas conectada ao MySQL com sucesso!"

@app.route("/clientes", methods=["GET"])
def listar_clientes():
    cursor.execute("SELECT id, nome, cidade, total_compras FROM clientes")
    resultados = cursor.fetchall()
    clientes = [
        {
            "id": r[0],
            "nome": r[1],
            "cidade": r[2],
            "total_compras": float(r[3]) if r[3] is not None else 0.0
        }
        for r in resultados
    ]
    return jsonify(clientes)

@app.route("/clientes", methods=["POST"])
def adicionar_cliente():
    data = request.get_json()
    nome = data.get("nome")
    cursor.execute("INSERT INTO clientes (nome) VALUES (%s)", (nome,))
    db.commit()
    return jsonify({"mensagem": "Cliente adicionado com sucesso"}), 201

@app.route("/cotacao-dolar", methods=["GET"])
def pegar_cotacao():
    try:
        resposta = requests.get("http://localhost:5001/cotacao")
        dados = resposta.json()
        return jsonify({"cotacao": dados["cotacao_dolar"]})
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
