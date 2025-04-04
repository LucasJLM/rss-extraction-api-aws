const express = require('express');
const { extractRssData } = require('../services/rssExtractor');
const path = require('path');
const AWS = require('aws-sdk');

const app = express();
const port = 3000;

// Configura o cliente S3
const s3 = new AWS.S3({
  region: 'us-east-1', 
  accessKeyId: 'ASIAS2VS4FBZGGGXD3DL',
  secretAccessKey: 'PXuYbNhruiWPmIWS/Kl58xvNWI6B/otfOIdxESn7',
  sessionToken: 'IQoJb3JpZ2luX2VjEMT//////////wEaCXVzLWVhc3QtMSJGMEQCIHpKa0LVzUbbB7sW3r5IhBJYoFvdtD/cTjUUYz2F1e6QAiA+FrejErpcYGNDxffbs/ATSfzxYQIqXCyexY2N4/uvISqeAwi9//////////8BEAAaDDE5NDcyMjQwODU2MiIMafKGNHLJluJzD26rKvIC0khcHdJBrj+uq+QUPY7iiFEHDIL84bvhSBfjtCUYsV1wHim8XCddCSt3vMr1inrEquXJWVDogFQOF50syfgFB0ukldLE0/gYdB/OSqyil2/8vTsv42qujWHYKEGDls1NrjFiceQPrNTO0lm0sSUVbHIbSDJGzmr7Pnk47pvHbidcQgf2V0t72NhhY/Y5u1pm945dTEvfVZ2qHgnhZBwZ6+VnDNDnJnm1YoJYWNFQlcMTh5lpEGO9tJlItioWHR2Eb5PL6kH0moA6ESJzxwOW0pPYBUMIvc461C86nTZqNhRfIF3lrU9FdvYDjRpDCz0Yex2Om6mXJHwUQ9yNTJ1Dqbwo/ueTsTfnbi1gBec5pqANtEs0r8xWC9sBtiaRYek4qqluqjYZEZmn6hfYY/5wl7z60Q52YW1X5ewx0UR82fUP5NNDq2V5jKpLStAJ8AI+b7c7Gl6+BFAM/WVw7ccvk/MY8MEZSiyHUjqrLW3pw1EBWDCTj768BjqnAWIDJSj/yW7ABi/lk22XM/rv0/Q42PLVOoKPCCIx0zaAYf46JZnFZa1Zh3/sclAlgCilhx1pZS4xWiim6FVXY3YwcUKvAP6+0N0MEOevdr5DA77gYR2Np30rqlhWYKHRS0d0P4CQ1Wj7rNZEhDVOrPsECvhWfCa/gBHhuPQB0K6QW9von5Id35ORZWNtipNDmyckiAgN/GUbqaW+DVmqrr3OG2VGeHJC',
});

const BUCKET_NAME = 'bucketrssespn';

// Serve os arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, '..', 'public')));

// Rota para a raiz, que serve o 'index.html'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Rota para iniciar a extração dos dados RSS
app.get('/extract-rss', async (req, res) => {
  try {
    const url = 'https://www.espn.com.br/rss'; // URL do feed RSS da ESPN
    await extractRssData(url);
    res.send('Extração de dados RSS enviada ao S3 com sucesso.');
  } catch (error) {
    res.status(500).send('Erro ao extrair e enviar dados RSS.');
  }
});

// Rota para obter os dados mais recentes do S3
app.get('/get-rss-data', async (req, res) => {
  try {
    console.log(`Tentando acessar o bucket: ${BUCKET_NAME}`);
    const params = {
      Bucket: BUCKET_NAME,
    };

    // Lista os arquivos no S3
    const data = await s3.listObjectsV2(params).promise();
    console.log('Arquivos listados do S3:', data);

    if (!data.Contents.length) {
      throw new Error('No RSS data files found in S3');
    }

    // Ordena os arquivos por data (o mais recente primeiro)
    const latestFile = data.Contents.sort((a, b) => b.LastModified - a.LastModified)[0];
    
    // Faz o download do arquivo mais recente
    const objectParams = {
      Bucket: BUCKET_NAME,
      Key: latestFile.Key,
    };

    const fileData = await s3.getObject(objectParams).promise();
    console.log('Dados do arquivo recebidos do S3:', fileData);

    // Verifica se o conteúdo do arquivo está presente
    if (!fileData.Body) {
      throw new Error('Unable to retrieve data from the latest RSS file in S3');
    }

    const jsonData = JSON.parse(fileData.Body.toString('utf-8'));
    res.json(jsonData); // Envia os dados JSON
    console.log('Dados enviados com sucesso');
  } catch (error) {
    console.error('Erro ao obter dados do S3:', error);
    res.status(500).send('Erro ao obter dados do S3.');
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
