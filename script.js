const chatWindow = document.getElementById('chat-window');
const chatInput = document.getElementById('chat-input');

async function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        const currentTime = new Date().toLocaleTimeString();
        const userMessageElement = document.createElement('div');
        userMessageElement.classList.add('user-message');
        userMessageElement.textContent = `Tú (${currentTime}): ${message}`;
        chatWindow.appendChild(userMessageElement);
        chatInput.value = '';

        try {
            const response = await fetch('http://localhost:3000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const responseMessageElement = document.createElement('div');
            responseMessageElement.classList.add('response-message');
            responseMessageElement.textContent = `DeepSeek: ${data.response}`;
            chatWindow.appendChild(responseMessageElement);
            saveMessages();
        } catch (error) {
            const errorMessageElement = document.createElement('div');
            errorMessageElement.textContent = `Error: ${error.message}`;
            chatWindow.appendChild(errorMessageElement);
        }

        chatWindow.scrollTop = chatWindow.scrollHeight;
        chatInput.focus();
    }
}

// Guardar mensajes en localStorage
function saveMessages() {
    localStorage.setItem('chatHistory', chatWindow.innerHTML);
}

// Cargar mensajes al iniciar la aplicación
function loadMessages() {
    const chatHistory = localStorage.getItem('chatHistory');
    if (chatHistory) {
        chatWindow.innerHTML = chatHistory;
    }
}

window.onload = loadMessages;

chatInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
