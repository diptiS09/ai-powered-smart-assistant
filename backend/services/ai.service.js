const { GoogleGenAI } = require('@google/genai');
const { customers, tickets } = require('../data/mockData');
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const tools = [
  {
    type: 'function',
    name: 'getCustomerDetails',
    description: 'Get customer profile information',
    parameters: {
      type: 'object',
      properties: {
        customerId: {
          type: 'string',
          description: 'The customer ID'
        }
      },
      required: ['customerId']
    }
  },

  {
    type: 'function',
    name: 'getCustomerTickets',
    description: 'Get all support tickets for a customer',
    parameters: {
      type: 'object',
      properties: {
        customerId: {
          type: 'string',
          description: 'The customer ID'
        }
      },
      required: ['customerId']
    }
  },

  {
    type: 'function',
    name: 'updateCustomerDetails',
    description: 'Update customer profile information such as name, email, or phone number',
    parameters: {
      type: 'object',
      properties: {
        customerId: {
          type: 'string',
          description: 'The customer ID'
        },
        name: {
          type: 'string',
          description: 'Updated customer name'
        },
        email: {
          type: 'string',
          description: 'Updated customer email'
        },
        phone: {
          type: 'string',
          description: 'Updated customer phone number'
        }
      },
      required: ['customerId']
    }
  },

  {
    type: 'function',
    name: 'createSupportTicket',
    description: 'Create a new support ticket for a customer',
    parameters: {
      type: 'object',
      properties: {
        customerId: {
          type: 'string'
        },
        subject: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        priority: {
          type: 'string',
          enum: ['Low', 'Medium', 'High']
        }
      },
      required: [
        'customerId',
        'subject',
        'description',
        'priority'
      ]
    }
  },

  {
    type: 'function',
    name: 'getTicketStatus',
    description: 'Get the status of a support ticket',
    parameters: {
      type: 'object',
      properties: {
        ticketId: {
          type: 'string'
        }
      },
      required: ['ticketId']
    }
  }
];

function executeTool(name, args) {

  if (name === 'getCustomerDetails') {
    const customer = customers.find(customer => customer.id === args.customerId);
    return customer || {
      error: 'Customer not found'
    };
  }

  if (name === 'getCustomerTickets') {
    return tickets.filter(ticket => ticket.customerId === args.customerId);
  }

  if (name === 'updateCustomerDetails') {
    const customer = customers.find(customer => customer.id === args.customerId);

    if (!customer) {
      return {
        error: 'Customer not found'
      };
    }

    if (args.name !== undefined) {
      customer.name = args.name;
    }

    if (args.email !== undefined) {
      customer.email = args.email;
    }

    if (args.phone !== undefined) {
      customer.phone = args.phone;
    }

    return customer;
  }

  if (name === 'createSupportTicket') {

    const newTicket = {
      id: `TKT${String(tickets.length + 1).padStart(3, '0')}`,
      customerId: args.customerId,
      subject: args.subject,
      description: args.description,
      status: 'Open',
      priority: args.priority,
      createdAt: new Date().toISOString().split('T')[0]
    };

    tickets.push(newTicket);

    return newTicket;
  }

  if (name === 'getTicketStatus') {
    const ticket = tickets.find(ticket => ticket.id === args.ticketId);

    if (!ticket) {
      return {
        error: 'Ticket not found'
      };
    }

    return {
      id: ticket.id,
      status: ticket.status,
      subject: ticket.subject
    };
  }

  return {
    error: 'Unknown tool'
  };
}

async function processChat(customerId, userMessage) {
  const activities = [];

  activities.push({
    message: 'Understanding user request',
    status: 'done'
  });

  const systemPrompt = `
You are a helpful customer support AI assistant.

The current customer ID is ${customerId}.

You can help users with:
- Customer information
- Updating customer information
- Support tickets
- Creating support tickets
- Ticket status

Use the available tools whenever backend data or an action is required.

Do not invent customer or ticket information.

When creating a ticket, choose a reasonable priority:
Low, Medium, or High.

Only update customer information when the user explicitly asks you to do so.

After using a tool, explain the result clearly and briefly to the customer.
`;

  // First Gemini interaction
  const interaction = await ai.interactions.create({
    model: 'gemini-3.6-flash',

    input: [
      {
        type: 'user_input',
        content: [
          {
            type: 'text',
            text: `${systemPrompt}\n\nUser request:\n${userMessage}`
          }
        ]
      }
    ],

    tools
  });

  let functionCall = null;

  for (const step of interaction.steps || []) {

    if (step.type === 'function_call') {
      functionCall = step;
      break;
    }
  }

  if (!functionCall) {

    activities.push({
      message: 'Generating final response',
      status: 'done'
    });

    return {
      message: interaction.output_text,
      activities
    };
  }

  // Execute selected tool
  activities.push({
    message: `Executing ${functionCall.name}`,
    status: 'done'
  });

  const toolResult = executeTool(
    functionCall.name,
    functionCall.arguments || {}
  );

  // Send tool result back to Gemini
  const finalInteraction = await ai.interactions.create({

    model: 'gemini-3.6-flash',

    previous_interaction_id: interaction.id,

    input: [
      {
        type: 'function_result',
        name: functionCall.name,
        call_id: functionCall.id,
        result: [
          {
            type: 'text',
            text: JSON.stringify(toolResult)
          }
        ]
      }
    ],

    tools
  });

  activities.push({
    message: 'Generating final response',
    status: 'done'
  });

  return {
    message: finalInteraction.output_text,
    activities
  };
}

module.exports = {
  processChat
};