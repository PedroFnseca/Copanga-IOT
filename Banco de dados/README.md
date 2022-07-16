> # Como os dados são armazenados? 🤔
### Os dados armazenados dentro do banco de dados são referentes as valvulas que liberam água e os valores coletados dos sensores de umidade.

<br>

> # Tabela válvulas 💦
### Ao decidir como iriamos armazenar os dados das válvulas tivemos o seguinte desafio: como armazenar quando ela foi acionada e desligada usando data a hora. Obtivemos o seguinte resultado: enviar os dados da válvula somente quando ela desligar, se comunicando com a API enviando o id da válvula e a quantidade de segundos que ela for acionada.

<br>

> # Tabela sensor 🌱
### Os dados armazenados nessa tabela são simples, pois é armazenado somente quando foi medido, id do sensor e o valor que ele obteve. 
