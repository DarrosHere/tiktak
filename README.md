# TikTak

TikTak is a simple TikTok-like app for browsing short videos, liking them, and getting personalized recommendations based on your preferences.

## Features

- Watch videos from different categories
- Like videos and track likes per category
- Personalized video recommendations: the more you like a category, the more often you see it
- Go to the next video using the down arrow key or mouse scroll
- Login/register to save your preferences
- Only registered users can like videos

## Demo



## Getting Started

1. **Clone the repository:**
   ```
   git clone https://github.com/DarrosHere/tiktak.git
   cd tiktak
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root directory and add the following (edit values as needed):

   ```
   DATABASE_URL=postgres://youruser:yourpassword@localhost:5432/yourdb
   JWT_SECRET=your_jwt_secret
   ```

4. **Set up the database:**
   - Make sure PostgreSQL is running.
   - Create a database and run the provided SQL migrations (if available).

5. **Start the app:**
   ```
   npm run dev
   ```

## Technologies

- React
- Node.js + Express
- PostgreSQL
- CSS (Tailwind)

---

> This project was created for portfolio purposes. Feedback and pull requests are welcome!
