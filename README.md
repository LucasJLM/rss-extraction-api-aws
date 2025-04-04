# 🌐 **API para Extração de Conteúdo RSS com Deploy em AWS**

## 📖 **Sumário**

- [📋 Descrição](#-descrição)  
- [✨ Funcionalidades Concluídas](#-funcionalidades-concluídas)  
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)  
- [🌎 Escolha do Site com RSS](#-escolha-do-site-com-rss)  
- [✅ Atualizações Recentes](#-atualizações-recentes)
- [👥 Autores](#-autores)

---

## 📋 **Descrição**

Este projeto faz parte da Avaliação das Sprints 2 e 3 do Programa de Bolsas Compass UOL para formação em Inteligência Artificial com AWS.  
A aplicação extrai informações do site **ESPN Brasil** (<https://www.espn.com.br/rss>), salva os dados em formato JSON em um bucket S3 da AWS e permite consultas futuras via uma página HTML.  

---

## ✨ **Funcionalidades Concluídas**

- 📥 **Extração de dados** do feed RSS da ESPN Brasil.  
- 🗄️ **Armazenamento** dos dados extraídos em um bucket S3.  
- 🛠️ **Configuração do Docker** para contêinerização da aplicação.
- ☁️ **Instância EC2 criada e configurada** para hospedar a aplicação.
- 🎨 **Página HTML simples desenvolvida** para consulta dos dados armazenados no bucket S3.
- 🌐 **Deploy realizado usando AWS**.

---

## 🛠️ **Tecnologias Utilizadas**

- 🟢 **Node.js**: Para desenvolvimento da API.  
- ☁️ **AWS S3**: Para armazenamento dos dados.  
- 🔑 **AWS SDK**: Para integração com os serviços da AWS.  
- 🐳 **Docker**: Para contêinerização da aplicação.
- 📡 **Amazon EC2**: Para hospedar a aplicação.

---

## 🌎 **Escolha do Site com RSS**

O site escolhido para a extração de dados foi:  

- **[ESPN Brasil](https://www.espn.com.br/rss)**  

📡 Este site oferece um feed RSS público que é utilizado para coletar notícias esportivas.

---

## ✅ **Atualizações Recentes**

Todas as funcionalidades propostas foram concluídas com sucesso, incluindo:  

- Extração de dados do RSS.  
- Armazenamento no bucket S3.  
- Desenvolvimento de uma interface HTML.  
- Deploy e execução na AWS usando Docker e EC2.

---

## 👥 **Autores**

- **Victor Silva Souza dos Santos**  
- **Edson Gabriel da Silva**  
- **Lucas José Leite Marino**  
