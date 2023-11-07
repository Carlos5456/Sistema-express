const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


app.get('/consultar-cidades', (req, res) => {
    // Obter a lista do Local Storage
    const minhaLista = JSON.parse(req.query.minhaLista);
  
    // Processar a lista e fazer a consulta à API do Google Maps
    const resultados = [];
    for (let i = 0; i < minhaLista.length - 1; i++) {
      const origem = minhaLista[i];
      const destino = minhaLista[i + 1];
  
      // Fazer a consulta à API do Google Maps para obter tempo e distância
      // Aqui você precisará usar uma biblioteca HTTP, como axios, para fazer a requisição à API do Google Maps.
      // Certifique-se de configurar as credenciais corretas para autenticar na API.
  
      // Exemplo de código usando axios:
      axios.get('https://maps.googleapis.com/maps/api/directions/json', {
        params: {
          origin: origem,
          destination: destino,
          key: 'AIzaSyAU7y5n5JoOF0590fLuTvPdJyU7Eyz1jPM',
        },
      })
      .then(response => {
        const leg = response.data.routes[0].legs[0];
        const distancia = leg.distance.text;
        const duracao = leg.duration.text;
        resultados.push({ origem, destino, distancia, duracao });
  
        // Verificar se todos os resultados foram obtidos
        if (resultados.length === minhaLista.length - 1) {
          // Calcular a soma das distâncias
          let somaDistancias = 0;
          for (const resultado of resultados) {
            const distanciaNumerica = parseFloat(resultado.distancia.replace(',', '.').split(' ')[0]);
            somaDistancias += distanciaNumerica;
          }
  
          // Retornar os resultados
          res.json({ resultados, somaDistancias });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'Erro ao consultar a API do Google Maps' });
      });
    }
  });