const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

async function getBotResponse(userMessage) {
    try {
        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error fetching chatbot response:', error);
        return "Sorry, I couldn't connect to the AI service.";
    }
}

sendButton.addEventListener('click', async () => {
    const userMessage = userInput.value;
    if (userMessage.trim() === '') return;

    // Add user message to chat
    const userMessageDiv = document.createElement('div');
    userMessageDiv.classList.add('message', 'user');
    userMessageDiv.textContent = userMessage;
    chatBox.appendChild(userMessageDiv);
    userInput.value = '';

    // Get bot response
    const botMessageDiv = document.createElement('div');
    botMessageDiv.classList.add('message', 'bot');
    botMessageDiv.textContent = 'Thinking...';
    chatBox.appendChild(botMessageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;

    const botResponse = await getBotResponse(userMessage);
    botMessageDiv.textContent = botResponse;
});