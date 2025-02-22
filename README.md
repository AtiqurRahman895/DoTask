# Do Task

"Do Task" is a Task Management application that allows users to create, edit, delete, and manage tasks in a drag-and-drop interface. Tasks are categorized into three sections: **To-Do**, **In Progress**, and **Done**. The application uses Firebase Authentication for user login and JWT for secure communication. Task data is stored in MongoDB, and the app supports real-time updates.

## 🚀 Live Project  
🔗 [Do Task Live](https://do-task-atiq.web.app/)  

## Key Features

- **Task Management**: Add, edit, delete, and reorder tasks.
- **Drag-and-Drop Interface**: Seamlessly drag tasks between categories.
- **Authentication**: Firebase Authentication with JWT for secure login.
- **Real-Time Sync**: Tasks update instantly across the app with MongoDB and real-time syncing.
- **Responsive Design**: Fully responsive on both desktop and mobile devices.
- **Category Management**: Categorize tasks into "To-Do", "In Progress", and "Done".
- **User-friendly UI**: Minimalistic, modern, and clean interface.

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, DaisyUI
- **Backend**: Express.js, MongoDB
- **Authentication**: Firebase Authentication with JWT
- **Drag-and-Drop**: @dnd-kit/core
- **Real-Time Sync**: optimistic UI updates
- **State Management**: React Query

## Installation

### Steps  

1. **Clone the repository**  
   ```sh
   git clone https://github.com/AtiqurRahman895/DoTask.git
   cd DoTask
   ```

2. **Install dependencies**  
   ```sh
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env.local` file in the root directory and add the following variables:  
   ```sh
   VITE_apiKey=your_firebase_api_key
   VITE_authDomain=your_firebase_auth_domain
   VITE_projectId=your_firebase_project_id
   VITE_storageBucket=your_firebase_storage_bucket
   VITE_messagingSenderId=your_firebase_messaging_sender_id
   VITE_appId=your_firebase_app_id
   VITE_payment_key=your_stripe_payment_key
   VITE_cloudinary_cloud_name=your_cloudinary_cloud_name
   ```

4. **Start the development server**  
   ```sh
   npm run dev
   ```

5. **Open the project in your browser**  
   ```
   http://localhost:5173
   ```

## Endpoints

- **POST** `/tasks`: Create a new task.
- **GET** `/tasks`: Get all tasks for the logged-in user.
- **PUT** `/tasks/:id`: Update a task (title, description, category).
- **DELETE** `/tasks/:id`: Delete a task.

## Firebase Authentication

1. Create a Firebase project.
2. Enable Firebase Authentication (Email/Password or Google Sign-In).
3. Create a `.env` file in both frontend and backend and add Firebase credentials.

## Real-Time Sync

The app uses **JWT** for secure communication between the frontend and backend. It also ensures tasks are always up to date with real-time updates.

- **JWT Authentication**: JWT is used to authenticate and authorize users. Tokens are sent in the Authorization header of each request.
- **Real-Time Updates**: The frontend uses optimistic UI updates for real-time syncing of task data between the server and the client.

## Contributing

Feel free to fork this repository and submit pull requests. If you find any bugs or want to suggest new features, create an issue.

## 📜 License  

This project is licensed under the **MIT License**.  


## Contact

If you have any questions or suggestions, feel free to contact me at [itsatiqur28@gmail.com].
