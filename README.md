# AI-Powered Smart Assistant

A simple AI-powered customer support assistant built with **Angular 20**, **Node.js**, **Express.js**, and **Google Gemini**.

The assistant understands the user's request, selects the required tool, performs the backend action, and returns the result through the chat interface.

## Features

* AI-powered chat interface
* Customer information
* View support tickets
* Create support tickets using natural language
* Check ticket status
* Update customer information
* Agent activity display
* Loading and error states
* Responsive Angular UI
* REST API integration

## Tech Stack

### Frontend

* Angular 20
* TypeScript
* Reactive Forms
* HttpClient
* RxJS
* SCSS

### Backend

* Node.js
* Express.js
* Google Gemini
* REST APIs

### Data

The project uses simple **in-memory mock data** for customers and support tickets.

## Project Structure
Smart-AI-Assistant-Submission/
│
├── .gitignore
├── README.md
├── API-DOCUMENTATION.md
│
├── Frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── chat/
│   │   │   │   ├── customer/
│   │   │   │   ├── tickets/
│   │   │   │   └── activity/
│   │   │   ├── services/
│   │   │   │   ├── api.ts
│   │   │   │   └── chat.ts
│   │   │   ├── app.config.ts
│   │   │   ├── app.routes.ts
│   │   │   └── ...
│   │   ├── main.ts
│   │   └── styles.scss
│   │
│   ├── public/
│   ├── angular.json
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   └── tsconfig.spec.json
│
└── backend/
    ├── data/
    │   └── mockData.js
    ├── routes/
    │   ├── customer.routes.js
    │   ├── ticket.routes.js
    │   └── chat.routes.js
    ├── services/
    │   └── ai.service.js
    ├── .env
    ├── app.js
    ├── server.js
    ├── package.json
    └── package-lock.json
    
## AI Agent Flow

User Message
     ↓
Gemini understands the request
     ↓
Selects required tool
     ↓
Backend executes the tool
     ↓
Tool result sent back to Gemini
     ↓
Final response returned to Angular

### Available AI Tools

* `getCustomerDetails`
* `getCustomerTickets`
* `createSupportTicket`
* `getTicketStatus`
* `updateCustomerDetails`

For example, when the user asks:

> Show me my recent support tickets.

Gemini selects `getCustomerTickets`, the backend executes it, and the result is returned to the chat.

## AI / LLM Integration

The application uses **Google Gemini** through the `@google/genai` package.

The AI agent uses function calling to understand the user's request and select the appropriate backend tool.

The flow is:

1. User sends a message from the Angular chat.
2. The request is sent to the `/chat` API.
3. Gemini analyzes the request and selects a tool when required.
4. The backend executes the selected tool.
5. The tool result is sent back to Gemini.
6. Gemini generates the final response shown in the Angular chat.

The Gemini integration and tool execution logic are implemented in:

backend/services/ai.service.js

### Available AI Tools

* `getCustomerDetails`
* `getCustomerTickets`
* `createSupportTicket`
* `getTicketStatus`
* `updateCustomerDetails`


## Data / Mock Data

The application uses **in-memory mock data** instead of a database.

Customer and ticket data are stored in:

backend/data/mockData.js

This approach was used because the assignment allows mock or in-memory data and persistent database storage was not required.

Data changes remain available while the backend is running. Restarting the backend resets the data to the initial mock values.


## Architecture

The application follows a simple frontend-backend architecture:

Angular Frontend
       ↓
Node.js / Express REST APIs
       ↓
AI Service
       ↓
Google Gemini
       ↓
Tool Execution
       ↓
Mock Data

The Angular frontend handles the user interface and API communication.

The Node.js/Express backend handles REST APIs and AI processing. The AI service is kept separately in `ai.service.js` to handle Gemini integration and tool execution.

---

## Technical Decisions

* **Angular standalone components** are used to keep the frontend structure simple and modular.
* **Two Angular services** are used: `api.ts` for REST API communication and `chat.ts` for AI chat requests and activity handling.
* **Express.js** is used to create simple REST APIs.
* **Google Gemini function calling** is used so the AI can select and execute the appropriate backend tool.
* **In-memory mock data** is used instead of a database because persistent storage was not required for this assignment.
* The implementation focuses on the required functionality without adding optional features such as authentication, RAG, voice, or streaming.


## Setup

### Backend

```bash
cd backend
npm install
npm start
```

The backend uses the following environment variables in `backend/.env`:

PORT=3000
GEMINI_API_KEY=gemini_api_key


Backend runs on:

http://localhost:3000


### Frontend

```bash
cd frontend
npm install
ng serve
```

Frontend runs on:

http://localhost:4200


## API Documentation

Detailed API information is available in:

`API-DOCUMENTATION.md`

Main APIs:

| Method | Endpoint                 | Description             |
| ------ | ------------------------ | ----------------------- |
| GET    | `/customers/:id`         | Get customer details    |
| GET    | `/customers/:id/tickets` | Get customer tickets    |
| PUT    | `/customers/:id`         | Update customer details |
| POST   | `/tickets`               | Create support ticket   |
| GET    | `/tickets/:id`           | Get ticket details      |
| POST   | `/chat`                  | Process AI chat request |

## Note

The application uses in-memory mock data, so changes are available while the backend is running. Restarting the backend resets the data to the initial mock values.

## Author

**Dipti Surve**
