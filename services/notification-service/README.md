# Notification Service

Email notification service consuming events from Kafka.

## Setup

1. Copy `.env.example` to `.env` and configure SendGrid and Kafka
2. Register SendGrid account and get API key
3. Install dependencies: `npm install`
4. Run: `npm run dev`

## Features

- Consumes events from Kafka topics
- Sends welcome emails on user registration
- Sends course completion emails
- Sends certificate emails

## Port

Default: 3006
