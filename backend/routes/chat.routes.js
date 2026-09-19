const express = require('express');
const router = express.Router();

const { processChat } = require('../services/ai.service');

router.post('/', async (req, res) => {
  try {
    const {customerId, message} = req.body;

    if (!customerId || !message) {
      return res.status(400).json({
        message: 'customerId and message are required'
      });
    }
    const result = await processChat(customerId, message);

    res.json(result);

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      message: 'Unable to process chat request'
    });
  }
});

module.exports = router;