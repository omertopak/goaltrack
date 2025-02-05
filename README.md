
# GoalTrack 

GoalTrack is a web application for task management and tracking progress. This project provides a backend built with **Node.js** and **Express.js**, using **MongoDB** as the database to store user data and tasks. The backend has been deployed to **Vercel** and connects to **MongoDB Atlas** for cloud database storage.

## Features

- User authentication and registration
- Secure access to user-specific data using JWT tokens
- Task management: create, read, update, and delete tasks
- Event and notes management
- CORS configuration to allow cross-origin requests

## Technologies Used

- **Node.js**: JavaScript runtime for server-side programming
- **Express.js**: Web framework for building APIs
- **MongoDB Atlas**: Cloud-based NoSQL database for data storage
- **Mongoose**: ODM (Object Document Mapping) library for MongoDB
- **JWT**: JSON Web Token for authentication
- **CORS**: Cross-Origin Resource Sharing middleware
- **dotenv**: For loading environment variables
- **Vercel**: Cloud platform for deployment

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine (you can check if it's installed by running `node -v`)
- MongoDB Atlas account for cloud-based database storage
- Vercel account for deploying the backend

## Getting Started

Follow the steps below to set up the backend locally or deploy it to the cloud.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd goaltrack-backend
```

### 2. Install Dependencies

Install the necessary dependencies using either **npm** or **yarn**:

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file at the root of the project and add the following:

```
MONGODB_URI=<Your MongoDB Atlas Connection String>
SECRET_KEY
ACCESS_KEY
REFRESH_KEY
PORT=8000
```

- Replace `<Your MongoDB Atlas Connection String>` with your MongoDB Atlas URI.
- Replace `<Your SECRET_KEYt>` with a secret for generating JWT tokens.
- Replace `<Your ACCESS_KEY>` with a access for generating JWT tokens.
- Replace `<Your REFRESH_KEY>` with a refresh for generating JWT tokens.
- You can choose a different port if needed.

### 4. Run the Application Locally

Once you've installed the dependencies and set up the environment variables, you can run the backend locally using:

```bash
npm start
# or
yarn start
```

The server will be running on `http://localhost:8000`.

### 5. Testing the API

You can use **Postman** or **Insomnia** to test the API.

- **POST** `/auth` - Log in to get a JWT token
- **GET** `/user` - Get user profile (requires authentication)
- **POST** `/todo` - Create a new task (requires authentication)
- **GET** `/todo` - Get all tasks (requires authentication)
- **POST** `/events` - Create a new event (requires authentication)

Ensure you include the `Authorization` header with the JWT token for any protected routes:

```
Authorization: Bearer <your-jwt-token>
```

### 6. Deploy to Vercel

To deploy your backend to **Vercel**, follow these steps:

- Install the Vercel CLI if you haven't already:

  ```bash
  npm install -g vercel
  ```

- Run the following command to deploy:

  ```bash
  vercel
  ```

- When prompted:
  - Select the project scope
  - Choose the directory of the project
  - Vercel will automatically detect the build settings and deploy the project

### 7. Update Environment Variables on Vercel

After deploying, go to your **Vercel dashboard**:

- Navigate to your project settings.
- Under **Environment Variables**, add the following:
  - **MONGODB_URI**: The connection string for your MongoDB Atlas database.
  - **JWT_SECRET**: Your JWT secret key.

### 8. Configure CORS (if necessary)

In your `server.js` file, you can configure **CORS** to allow requests from specific origins:

```js
const corsOptions = {
  origin: '*',  // Allow requests from any origin
};
app.use(cors(corsOptions));
```

If you want to restrict the allowed origins, change `'*'` to a specific URL (e.g., `http://localhost:3000`).

## Troubleshooting

### Error: `MongooseServerSelectionError: Could not connect to any servers in your MongoDB Atlas cluster`

- This error usually occurs when the MongoDB connection string is incorrect or when your IP address isn't whitelisted on MongoDB Atlas.
- Make sure your MongoDB URI is correct and that the IP address of your server is added to the whitelist in MongoDB Atlas.

### Error: `FUNCTION_INVOCATION_TIMEOUT` on Vercel

- This error might occur if your application is taking too long to respond.
- Make sure your database connection is optimized and that your app can respond to requests within the timeout limit. You may need to adjust timeouts or review your database performance.

## Conclusion

You've successfully set up and deployed your backend application for GoalTrack. This backend will allow you to manage user accounts, tasks, events, and more, all while being securely authenticated. You can continue to expand this application by adding new features or refining the existing ones.

For more information on Express.js, MongoDB, and Vercel, refer to the official documentation:

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)
- [Vercel Documentation](https://vercel.com/docs)



# GoalTrack Frontend

GoalTrack is a web application for tracking tasks, notes, and events. The frontend of the app is built with Next.js, providing a smooth and dynamic user experience.

## Features

- User registration and login
- Task management (Create, Read, Update, Delete tasks)
- Calendar
- Notes management
- Event tracking
- Authentication and authorization



### Prerequisites

- Node.js (v16 or higher)
- npm or yarn (depending on your package manager of choice)

### Install Dependencies

To get started, clone the repository and navigate to the frontend directory:

```bash
git clone <clone adress>
cd goaltrack-frontend
```

Then, install the necessary dependencies:

```bash
npm install
# or
yarn install
```

### Running the Development Server

To start the development server, use:

```bash
npm run dev
# or
yarn dev
```

The app will be running at [http://localhost:3000](http://localhost:3000).

### Environment Variables

You'll need to create a `.env.local` file at the root of the project with the following variables:

```
NEXT_PUBLIC_API_URL="place your backend API URL"
```

### Building for Production

To build the project for production, run:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm start
# or
yarn start
```

### Deployment

You can deploy this frontend to Vercel or any hosting service that supports Next.js.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
