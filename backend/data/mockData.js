const customers = [
  {
    id: 'CUST001',
    name: 'Dipti Surve',
    email: 'dipti@example.com',
    phone: '+91 1234123412'
  }
];

const tickets = [
  {
    id: 'TKT001',
    customerId: 'CUST001',
    subject: 'Unable to download invoice',
    description: 'Customer is unable to download the invoice for a recent order.',
    status: 'Open',
    priority: 'Medium',
    createdAt: '2026-09-15'
  },
  {
    id: 'TKT002',
    customerId: 'CUST001',
    subject: 'Payment was charged twice',
    description: 'Customer reported being charged twice for the same transaction.',
    status: 'In Progress',
    priority: 'High',
    createdAt: '2026-09-13'
  },
  {
    id: 'TKT003',
    customerId: 'CUST001',
    subject: 'Unable to reset password',
    description: 'Customer is not receiving the password reset email.',
    status: 'Resolved',
    priority: 'Medium',
    createdAt: '2026-09-10'
  }
];

module.exports = {customers, tickets};