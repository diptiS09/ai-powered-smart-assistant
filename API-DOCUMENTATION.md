# API Documentation

## AI-Powered Smart Assistant

**Base URL**

http://localhost:3000/api

---

## 1. Health Check

Checks whether the backend is running.

### GET `/health`

**Response**

```json
{
  "message": "Smart AI Assistant backend is running"
}
```

---

## 2. Get Customer Details

Returns customer information.

### GET `/customers/:id`

**Example**

```tex
GET /customers/CUST001
```

**Response**

```json
{
  "id": "CUST001",
  "name": "Dipti Surve",
  "email": "dipti@example.com",
  "phone": "+91 98765 43210"
}
```

---

## 3. Get Customer Tickets

Returns all support tickets for a customer.

### GET `/customers/:id/tickets`

**Example**

```text
GET /customers/CUST001/tickets
```

**Response**

```json
[
  {
    "id": "TKT001",
    "customerId": "CUST001",
    "subject": "Unable to download invoice",
    "description": "Customer is unable to download the invoice for a recent order.",
    "status": "Open",
    "priority": "Medium",
    "createdAt": "2026-09-15"
  }
]
```

---

## 4. Update Customer Details

Updates customer information.

### PUT `/customers/:id`

**Example**

```text
PUT /customers/CUST001
```

**Request Body**

```json
{
  "email": "newemail@example.com"
}
```

Multiple fields can also be updated:

```json
{
  "name": "Dipti Surve",
  "email": "newemail@example.com",
  "phone": "+91 99999 88888"
}
```

**Response**

```json
{
  "id": "CUST001",
  "name": "Dipti Surve",
  "email": "newemail@example.com",
  "phone": "+91 99999 88888"
}
```

---

## 5. Create Support Ticket

Creates a new support ticket.

### POST `/tickets`

**Request Body**

```json
{
  "customerId": "CUST001",
  "subject": "Cannot update email address",
  "description": "Customer is unable to update the email address on the account.",
  "priority": "Medium"
}
```

**Priority**

```text
Low
Medium
High
```

**Response**

```json
{
  "id": "TKT004",
  "customerId": "CUST001",
  "subject": "Cannot update email address",
  "description": "Customer is unable to update the email address on the account.",
  "status": "Open",
  "priority": "Medium",
  "createdAt": "2026-09-19"
}
```

**Status Code:** `201 Created`

---

## 6. Get Ticket Details

Returns details of a specific ticket.

### GET `/tickets/:id`

**Example**

```text
GET /tickets/TKT001
```

**Response**

```json
{
  "id": "TKT001",
  "customerId": "CUST001",
  "subject": "Unable to download invoice",
  "description": "Customer is unable to download the invoice for a recent order.",
  "status": "Open",
  "priority": "Medium",
  "createdAt": "2026-09-15"
}
```

---

## 7. AI Chat

Main endpoint used by the Angular chat interface.

### POST `/chat`

**Request Body**

```json
{
  "customerId": "CUST001",
  "message": "Show me my recent support tickets"
}
```

**Response**

```json
{
  "message": "Here are your recent support tickets...",
  "activities": [
    {
      "message": "Understanding user request",
      "status": "done"
    },
    {
      "message": "Executing getCustomerTickets",
      "status": "done"
    },
    {
      "message": "Generating final response",
      "status": "done"
    }
  ]
}
```

---

## AI Tools

The AI agent can select the following tools based on the user's request:

| Tool                    | Purpose                      |
| ----------------------- | ---------------------------- |
| `getCustomerDetails`    | Get customer information     |
| `getCustomerTickets`    | Get customer support tickets |
| `createSupportTicket`   | Create a support ticket      |
| `getTicketStatus`       | Get ticket status            |
| `updateCustomerDetails` | Update customer information  |

### Example

User:

```text
Show me my recent support tickets.
```

AI selects:

```text
getCustomerTickets
```

The backend executes the tool, sends the result back to Gemini, and Gemini generates the final response.

---

## Error Responses

### 400 Bad Request

Returned when required request data is missing.

```json
{
  "message": "customerId and message are required"
}
```

### 404 Not Found

Returned when a customer or ticket does not exist.

```json
{
  "message": "Customer not found"
}
```

### 500 Internal Server Error

Returned when an unexpected backend or AI error occurs.

```json
{
  "message": "Unable to process chat request"
}
```

---

## Notes

* Customer and ticket data are stored as in-memory mock data.
* Data changes remain available while the backend is running.
* Restarting the backend resets the data.
* AI integration is implemented in `backend/services/ai.service.js`.
