const axios = require('axios');
const xml2js = require('xml2js');
const { uploadToS3 } = require('./s3Service');

// Função para extrair dados do RSS e enviar ao S3
async function extractRssData(url) {
  try {
    // Faz a requisição para o feed RSS
    const response = await axios.get(url);

    // Converte o XML em objeto JavaScript
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(response.data);

    // Extrai os dados dos itens do RSS
    const rssItems = result.rss.channel[0].item;

    const extractedData = rssItems.map(item => ({
      title: item.title[0],
      link: item.link[0],
      description: item.description[0],
    }));

    // Nome do arquivo no S3 (com timestamp para evitar sobrescrita)
    const s3Key = `rss_data_${Date.now()}.json`;

    // Envia os dados ao S3
    await uploadToS3(s3Key, extractedData);
    console.log('Dados RSS extraídos e enviados ao S3 com sucesso!');
  } catch (error) {
    console.error('Erro ao extrair dados RSS:', error);
  }
}

module.exports = { extractRssData };
