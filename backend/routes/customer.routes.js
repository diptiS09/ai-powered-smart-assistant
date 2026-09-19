const express = require('express');
const router = express.Router();

const { customers, tickets } = require('../data/mockData');

router.get('/:id', (req, res) => {
  const customer = customers.find(customer => customer.id === req.params.id);

  if (!customer) {
    return res.status(404).json({
      message: 'Customer not found'
    });
  }

  res.json(customer);
});

router.get('/:id/tickets', (req, res) => {
  const customerTickets = tickets.filter(ticket =>  ticket.customerId === req.params.id);
  res.json(customerTickets);
});

router.put('/:id', (req, res) => {
  const customer = customers.find(customer =>customer.id === req.params.id);

  if (!customer) {
    return res.status(404).json({
      message: 'Customer not found'
    });
  }

  const { name, email, phone } = req.body;

  if (name !== undefined) {
    customer.name = name;
  }

  if (email !== undefined) {
    customer.email = email;
  }

  if (phone !== undefined) {
    customer.phone = phone;
  }

  res.json(customer);
});

module.exports = router;