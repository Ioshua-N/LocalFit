// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Conecte-se ao MongoDB
mongoose.connect('mongodb+srv://DragaoDK:1234@localfit.b2cwxgg.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Defina o modelo do usuário
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

// Rota para o registro de usuários
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const newUser = new User({
            username,
            password
        });

        await newUser.save();

        res.json({ success: true, message: 'Cadastro realizado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Ocorreu um erro durante o cadastro. Tente novamente.' });
    }
});

app.post('/login', async (req, res) => 
{
    const { username, password } = req.body;

    try
    {
        const user = await User.findOne({ username, password });

        if(user)
        {
            res.json({success: true, message: "Login bem-sucedido!"});
        }
        else
        {
            res.json({success: false, message: "Usuário não Encontrado"});
        }
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ success: false, message: 'Ocorreu um erro durante o login. Tente novamente.' });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});