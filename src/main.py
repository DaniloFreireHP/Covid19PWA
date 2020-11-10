from flask import Flask, request, Blueprint

app = Flask(__name__)

@app.route('/estados')
def getInfoEstados():
    service.getInfoEstados()