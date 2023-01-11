const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Conecte-se ao MongoDB aqui
mongoose.connect('mongodb+srv://otaviobraaga:N74gt5XEWPptVqA@clustavio.8ttuiet.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// Adicione o middleware body-parser para permitir que o aplicativo leia os dados do corpo da solicitação
app.use(bodyParser.json());

const clientSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  cpf: String,
})

// Crie um modelo de cliente
const Client = mongoose.model('pessoas', clientSchema);

app.post('/ClientForm', (req, res) => {
  const clientData = req.body;
  // Verifique se já existe um usuário com o mesmo e-mail ou CPF
  Client.findOne({ $or: [{ email: clientData.email }, { cpf: clientData.cpf }] }, (error, existingClient) => {
    if (error) {
      res.status(500).send(error);
    } else if (existingClient) {
      // Se já existir um usuário com o mesmo e-mail ou CPF, envie uma resposta de erro para o front-end
      res.status(400).send({ message: 'Já existe um usuário com esse e-mail ou CPF.' });
    } else {
      // Se não houver nenhum usuário com o mesmo e-mail ou CPF, salve o novo usuário
      const client = new Client(clientData);
      client.save()
        .then(result => {
          res.send(client);
        })
        .catch(saveError => {
          res.status(400).send(saveError);
        });
    }
  });
});


app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
