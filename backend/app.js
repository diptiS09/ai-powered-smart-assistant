const express = require('express');
const cors = require('cors');
const customerRoutes = require('./routes/customer.routes');
const ticketRoutes = require('./routes/ticket.routes');
const chatRoutes = require('./routes/chat.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    message: 'Smart AI Assistant backend is running'
  });
});


app.use('/api/customers', customerRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/chat', chatRoutes);


module.exports = app;