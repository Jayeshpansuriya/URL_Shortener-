# 🔗 URL Shortener

A simple Node.js + Express-based application that lets users shorten long URLs with custom short codes — just like Bitly!

---

## 🚀 Features

- 🌐 Custom short codes (e.g., `http://localhost:3003/mycode`)
- 🗂️ MongoDB database integration for storing links
- 📄 Full frontend form with EJS templates
- 🔁 Auto-redirect from short code to full URL
- 📦 Clean file structure: MVC architecture

---

## 🧑‍💻 Tech Stack

- ⚙️ **Backend**: Node.js, Express.js
- 💾 **Database**: MongoDB
- 🎨 **Frontend**: EJS, HTML/CSS
- 📂 **Other**: dotenv, zod (env validation)

---

## 🚅 MongoDB Integration

This project uses MongoDB to store the original and shortened URLs. Make sure you have MongoDB installed and running on your machine.

### Setup Instructions

1. **Install MongoDB**: Follow the [official installation guide](https://docs.mongodb.com/manual/installation/) for your operating system.

2. **Start MongoDB**: Run the following command in your terminal:

   ```bash
   mongod
   ```

3. **Connect to MongoDB**: You can use the MongoDB shell or a GUI tool like [MongoDB Compass](https://www.mongodb.com/try/download/compass) to connect to your database.

4. **Create a Database**: Create a new database for your URL shortener app (e.g., `url_shortener`).

5. **Create a Collection**: Inside your database, create a collection to store the links (e.g., `links`).

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
