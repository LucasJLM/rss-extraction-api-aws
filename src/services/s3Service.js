const AWS = require('aws-sdk');

// Configura o cliente S3 com as credenciais diretamente no código
const s3 = new AWS.S3({
  region: 'us-east-1', 
  accessKeyId: 'ASIAS2VS4FBZGGGXD3DL',
  secretAccessKey: 'PXuYbNhruiWPmIWS/Kl58xvNWI6B/otfOIdxESn7',
  sessionToken: 'IQoJb3JpZ2luX2VjEMT//////////wEaCXVzLWVhc3QtMSJGMEQCIHpKa0LVzUbbB7sW3r5IhBJYoFvdtD/cTjUUYz2F1e6QAiA+FrejErpcYGNDxffbs/ATSfzxYQIqXCyexY2N4/uvISqeAwi9//////////8BEAAaDDE5NDcyMjQwODU2MiIMafKGNHLJluJzD26rKvIC0khcHdJBrj+uq+QUPY7iiFEHDIL84bvhSBfjtCUYsV1wHim8XCddCSt3vMr1inrEquXJWVDogFQOF50syfgFB0ukldLE0/gYdB/OSqyil2/8vTsv42qujWHYKEGDls1NrjFiceQPrNTO0lm0sSUVbHIbSDJGzmr7Pnk47pvHbidcQgf2V0t72NhhY/Y5u1pm945dTEvfVZ2qHgnhZBwZ6+VnDNDnJnm1YoJYWNFQlcMTh5lpEGO9tJlItioWHR2Eb5PL6kH0moA6ESJzxwOW0pPYBUMIvc461C86nTZqNhRfIF3lrU9FdvYDjRpDCz0Yex2Om6mXJHwUQ9yNTJ1Dqbwo/ueTsTfnbi1gBec5pqANtEs0r8xWC9sBtiaRYek4qqluqjYZEZmn6hfYY/5wl7z60Q52YW1X5ewx0UR82fUP5NNDq2V5jKpLStAJ8AI+b7c7Gl6+BFAM/WVw7ccvk/MY8MEZSiyHUjqrLW3pw1EBWDCTj768BjqnAWIDJSj/yW7ABi/lk22XM/rv0/Q42PLVOoKPCCIx0zaAYf46JZnFZa1Zh3/sclAlgCilhx1pZS4xWiim6FVXY3YwcUKvAP6+0N0MEOevdr5DA77gYR2Np30rqlhWYKHRS0d0P4CQ1Wj7rNZEhDVOrPsECvhWfCa/gBHhuPQB0K6QW9von5Id35ORZWNtipNDmyckiAgN/GUbqaW+DVmqrr3OG2VGeHJC',
});

// Nome do bucket
const BUCKET_NAME = 'bucketrssespn';

// Função para salvar dados no bucket S3
async function uploadToS3(key, data) {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: JSON.stringify(data),
      ContentType: 'application/json',
    };

    await s3.upload(params).promise();
    console.log(`Arquivo enviado para o S3: ${key}`);
  } catch (error) {
    console.error('Erro ao enviar para o S3:', error);
    throw error;
  }
}

module.exports = { uploadToS3 };