const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root1',  // Replace with your MySQL password
  database: 'chatbot',
});

// Check connection to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Endpoint to handle message sending and bot reply
app.post('/messages', (req, res) => {
  const userMessage = req.body.userMessage;

  // Ensure that userMessage exists in the request body
  if (!userMessage) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Logic to handle the user message and generate bot reply
  const botReply = generateBotReply(userMessage); // Function for generating bot response

  // Save the message and bot reply in the database
  db.query(
    'INSERT INTO messages (userMessage, botReply) VALUES (?, ?)',  // Fixed column name here
    [userMessage, botReply],
    (err) => {
      if (err) {
        console.error('Error saving messages:', err);
        return res.status(500).json({ error: 'Failed to save message' });
      }

      // Respond back to the frontend with the bot reply
      res.json({ botReply });
    }
  );
});

// Function to generate bot's response based on user input
const generateBotReply = (message) => {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('hello')) {
    return 'Hi there! How can I assist you?';
  } else if (lowerMessage.includes('how are you')) {
    return 'I am doing great, thank you!';
  } else if (lowerMessage.includes('hi')) {
    return 'Hello! How can I help you?';
  } else if (lowerMessage.includes('i am pragati')) {
    return 'Hi Pragati, how can I assist you today?';
  } else {
    return 'I\'m sorry, I didn\'t quite catch that.';
  }
};

// Start the server
app.listen(5000, () => {
  console.log('Server is running at http://localhost:5000');
});
