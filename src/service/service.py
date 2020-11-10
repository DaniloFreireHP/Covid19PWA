import requests
import json

def getInfoEstados():
    r = requests.get("https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalEstadoRegiao")
    if r.status_code >= 300:
        return False, "Não foi possível salvar profissisionais"
    else:
        return r.json(), "Profissionais salvos"

print(getInfoEstados())