const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/chat', (req, res) => {
    request.post({
        url: 'https://api.deepseek.com/chat',
        headers: {
            'Authorization': 'Bearer sk-59b328f4a4cb4dd49a2c22e18a2eacfe',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    }, (error, response, body) => {
        if (error) {
            res.status(500).send({ error: error.message });
        } else if (response.statusCode !== 200) {
            res.status(response.statusCode).send({ error: body });
        } else {
            res.status(200).send(body);
        }
    });
});

app.listen(3000, () => {
    console.log('Proxy server running on port 3000');
});
