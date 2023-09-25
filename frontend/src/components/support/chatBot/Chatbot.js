import React, { useState, useEffect } from 'react';

const Chatbot = () => {
const [messages, setMessages] = useState([]);
const [input, setInput] = useState('');

const handleInputChange = (e) => {
setInput(e.target.value);
}

const handleSendMessage = () => {
if (input !== '') {
setMessages([...messages, { text: input, sender: 'user' }]);
setInput('');

// Do the necessary processing or API call to generate a response
// For simplicity, let's just simulate a response with a short delay
setTimeout(() => {
setMessages([...messages, { text: 'Hello, how can I assist you?', sender: 'bot' }]);
}, 500);
}
}

useEffect(() => {
// Scroll to the bottom of the chatbox when new messages are added
const chatbox = document.getElementById('chatbox');
chatbox.scrollTop = chatbox.scrollHeight;
}, [messages]);

return (
<div className="chatbot-container">
<div id="chatbox" className="chatbox">
{messages.map((message, index) => (
<div key={index} className={`message ${message.sender}`}>
<p>{message.text}</p>
</div>
))}
</div>
<div className="input-container">
<input type="text" value={input} onChange={handleInputChange} placeholder="Type your message..." />
<button onClick={handleSendMessage}>Send</button>
</div>
</div>
);
}

export default Chatbot;