<h1 align="center">ESP32 😎❤</h1>

<div align="center">
    <img src="esp32Img.png"  width="275" height="200"/>
</div>
<h2>Por que em C++? 🤔👀</h2>
Tendo em vista que a IDE Arduino utiliza a linguagem C++ porém com algumas modificações, o código foi totalmente desenvolvido para o ESP32.


<div align="center">
    <img src="espArduino.jpg"  width="450" height="250"/>
</div>

<br>

<h2>Como funciona o código? 📐🤨</h2>
O código conecta com a rede WiFi registrada, e em intervalos regulares de tempo ele envia dados para a api, dados esses como a umidade, se as válvulas solenoides estão ativa ou não e etc, caso a umidade esteja abaixo de um valor pré-definido pelo programa ele enviara os dados para api ao mesmo tempo que ele molha a terra, sendo assim este, de tempos irregulares.
