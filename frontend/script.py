import json
import os

caminho_entrada = 'estados_com_cidades.json'

with open(caminho_entrada, 'r', encoding='utf-8') as arquivo:
    estados = json.load(arquivo)

os.makedirs('select_cidades_estado', exist_ok=True)

for estado in estados:
    sigla = estado['sigla']
    cidades = estado['cidades']

    caminho_saida = f'select_cidades_estado/{sigla}.json'

    with open(caminho_saida, 'w', encoding='utf-8') as arquivo_estado:
        json.dump(cidades, arquivo_estado, ensure_ascii=False, indent=4)

print("Arquivos de cidades por estado gerados com sucesso!")