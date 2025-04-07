from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route("/cotacao", methods=["GET"])
def cotacao():
    try:
        response = requests.get("https://economia.awesomeapi.com.br/json/last/USD-BRL")
        data = response.json()
        valor_dolar = float(data["USDBRL"]["bid"])
        return jsonify({"cotacao": valor_dolar})
    except Exception as e:
        return jsonify({"erro": "Erro ao buscar cotação", "detalhes": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001, debug=True)
