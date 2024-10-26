ChatWeb App
A real-time chat application using React, Node.js, Express, Socket.io, and MongoDB for seamless, live communication.

Features:-
1)Real-time messaging with Socket.io
2)User authentication with registration and login
3)User avatar selection and Navigate to LoginPage
4)Smooth navigation between contacts and chat containers
5)Real-Time Messaging: Uses Socket.io for instant messaging capabilities, allowing real-time chat between users.
6)User Authentication: Includes secure user registration and login functionality, with form validation.
7Avatar Selection: Allows users to set and update their avatars for personalization.
8)Contacts and Chat Navigation: Smooth transitions between viewing contacts and accessing chat conversations, enhancing user experience.
9)Responsive Design: Chat and contact components are structured to adapt across various screen sizes.
10)Error Handling: Includes basic error handling, like notifications for login errors or validation issues using react-toastify.

Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/ChatWebApp.git
cd ChatWebApp
Install dependencies for both frontend and backend:

bash
Copy code
cd client
npm install
cd ../server
npm install
Create a .env file in the server folder:

makefile
Copy code
MONGO_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
Run the application:

Start the server:

bash
Copy code
cd server
npm start
Start the client:

bash
Copy code
cd client
npm start
Open your browser to http://localhost:3000.

Screenshots
<!-- Add paths to your screenshots here -->

Technologies Used
Frontend: React, styled-components
Backend: Node.js, Express
Database: MongoDB
Real-time Communication: Socket.io
Future Enhancements
File sharing in chat
User status indicators
Improved UX and themes
