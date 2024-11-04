# News Aggregator API

This is a Node.js and NestJS-based news aggregator API that fetches, stores, and filters news articles from various RSS feeds. It supports keyword-based and date-based filtering and includes named entity recognition for people, locations, and organizations.

### Table of Contents

Stack
Features
Prerequisites
Getting Started
Running the Application with Docker

### API Endpoints

1. Fetch News Articles
2. Filter News Articles
3. Schedule News Updates

Environment Variables
Contributing

## Stack

Backend: Node.js, NestJS

Database: MongoDB (using Mongoose)

Entity Recognition: AWS Comprehend (or alternative service as configured)

Containerization: Docker, Docker Compose

## Features

1. Fetch news articles from a configurable list of RSS feeds.
2. Store articles in MongoDB with fields like title, description, publication date, source URL, and topics.
3. Filter articles by keywords and publication date.
4. Named entity recognition for people, locations, and organizations in article descriptions.
5. Scheduled fetching and processing of new articles.

## Prerequisites

Make sure you have the following installed:

1. Docker
2. Docker Compose

## Getting Started

1. Clone the repository:

git clone <repository-url>

cd news-aggregator

2. Create a .env file:

Create a .env file in the root directory with the necessary environment variables. See the Environment Variables section below for details.

## Running the Application with Docker

1. Build and run the application:
   docker-compose up --build -d

This command will build and run the application along with a MongoDB container.

2. Access the API: The application will be available at http://localhost:3000.

3. Stop the application: To stop the application, use:
   docker-compose down

## API Endpoints

1. Fetch News Articles
   Endpoint: /news/fetch

Method: POST

Description: Fetches and stores articles from the configured RSS feeds.

Request Body: None

Response:

200 OK: Success message with the number of articles fetched.

500 Internal Server Error: If there's an issue with fetching or storing articles.

2. Filter News Articles
   Endpoint: /news/filter

Method: GET

Description: Filters news articles based on keywords or publication date.

#### Query Parameters:

keywords (optional) - Filter by keywords in the title or description.

startDate (optional) - Start date in YYYY-MM-DD format.

endDate (optional) - End date in YYYY-MM-DD format.
Response:

200 OK: Array of filtered articles.

500 Internal Server Error: If there is an issue with the filter query.

Example:

GET
http://localhost:3000/news/filter?keywords=Quincy&startDate=2024-11-01&endDate=2024-11-04

3. Schedule News Updates

Endpoint: /news/schedule

Method: POST

Description: Allows configuration of a periodic schedule for fetching new articles.

Request Body:

interval - Interval for scheduling (e.g., daily, hourly).

Response:

200 OK: Confirmation of the scheduling configuration.

500 Internal Server Error: If scheduling fails.

## Contributing

Feel free to fork this repository and make modifications. Pull requests are welcome for any improvements!

## Authors

### Md Jahid Al Mamun

- [Github](https://github.com/jahidrjs)
- [Email](rjs.jahid22@gmail.com)
- [Phone](+8801729577877)
- [Linkedin](https://www.linkedin.com/in/jahid-al-mamun-9b02372b/)
