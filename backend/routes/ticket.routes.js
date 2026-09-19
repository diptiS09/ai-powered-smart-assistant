const express = require('express');
const router = express.Router();

const { tickets } = require('../data/mockData');


// GET ticket by ID
router.get('/:id', (req, res) => {

  const ticket = tickets.find(ticket => ticket.id === req.params.id);

  if (!ticket) {
    return res.status(404).json({
      message: 'Ticket not found'
    });
  }

  res.json(ticket);
});


// CREATE ticket
router.post('/', (req, res) => {
  const {customerId, subject, description, priority = 'Medium'} = req.body;

  if (!customerId || !subject || !description) {
    return res.status(400).json({
      message: 'customerId, subject and description are required'
    });
  }

  const newTicket = {
    id: `TKT${String(tickets.length + 1).padStart(3, '0')}`,
    customerId,
    subject,
    description,
    status: 'Open',
    priority,
    createdAt: new Date().toISOString().split('T')[0]
  };

  tickets.push(newTicket);

  res.status(201).json(newTicket);
});


module.exports = router;