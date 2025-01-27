const chatWindow = document.getElementById('chat-window');
const chatInput = document.getElementById('chat-input');

function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        const userMessageElement = document.createElement('div');
        userMessageElement.textContent = "Tú: " + message;
        chatWindow.appendChild(userMessageElement);
        chatInput.value = '';

        // Aquí se integra la API de DeepSeek
        fetch('https://api.deepseek.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer sk-59b328f4a4cb4dd49a2c22e18a2eacfe'
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            const responseMessageElement = document.createElement('div');
            responseMessageElement.textContent = "DeepSeek: " + data.response;
            chatWindow.appendChild(responseMessageElement);
        })
        .catch(error => {
            const errorMessageElement = document.createElement('div');
            errorMessageElement.textContent = "Error: " + error.message;
            chatWindow.appendChild(errorMessageElement);
        });
    }
}

// Permitir el uso de la tecla "Enter" para enviar mensajes
chatInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
