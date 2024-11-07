Chat Application with Real-Time Messaging: This project is a full-featured chat application built using React, Node.js, Socket.io, MongoDB, and Styled Components. It includes real-time messaging, user authentication, avatar selection, and login/logout notifications using React Toastify.

Features:- Real-Time Chatting: Users can send and receive messages in real-time, facilitated by Socket.io. User Authentication: Users can register, log in, and log out, with proper validations and notifications. Avatar Selection: Users can choose and set avatars globally. Styled Components: Component-based styling using Styled Components for efficient and reusable CSS inside React components. Login/Logout Notifications: Notifications for login and logout status provided by React Toastify. MongoDB for User Data: User data is stored and managed in MongoDB, with access through MongoDB Compass. Tech Stack Frontend: React, Styled Components, React Toastify Backend: Node.js, Express Real-Time: Socket.io Database: MongoDB (accessed via MongoDB Compass) Project Setup Available Scripts In the project directory, you can run the following commands:

how to start the FRONT-END:
1--> step number one is in  open terminal and in your terminal type 
cd public
cd chat-app
yarn start

how to start the Back-END:
cd server
yarn start

yarn start Runs the app in development mode.
Open http://localhost:3000 to view in the browser. The page reloads on edits, and any lint errors appear in the console.

yarn test Launches the test runner in interactive watch mode. See the documentation on running tests for more details.

yarn run build Builds the app for production in the build folder.
Bundles React in production mode and optimizes the build for the best performance. The build is minified, and filenames include hashes for caching.

yarn run eject Note: Once ejected, this operation is irreversible. It will copy configuration files and dependencies (webpack, Babel, ESLint, etc.) directly into the project for full customization. Use this only if necessary.

Installation Clone the repository:

bash Copy code git clone Install dependencies:

bash Copy code npm install Environment Configuration:

Create a .env file in the root directory. Configure your MongoDB connection string and any other environment variables as needed. Run the Application:

Start the backend server: bash Copy code yarn run server Start the frontend: bash Copy code yarn start Application Details Components Login and Logout with Validation: React Toastify handles notifications for login/logout. Input validations ensure data integrity. Chat UI: The main chat container supports multiple conversations with a logout button and status updates for each user. Avatar Setup: Users can globally set avatars upon login, enhancing personalization. Real-Time Messaging Socket.io Integration: The app uses Socket.io for bi-directional, event-driven communication. Event Handling: Users are notified when a new user connects or disconnects. Messages are received in real-time and displayed in the active chat window. Global State for Avatars: Avatars are set and accessed globally, ensuring that all users' profiles are consistent. MongoDB (Database) User Data Storage: User credentials, avatars, and other profile details are stored in MongoDB, accessed via Mongoose ORM. Notifications React Toastify: Used to display notifications for login, logout, and error messages, enhancing user experience. Deployment Build the Project: Run npm run build to create an optimized production build. Deploy the Backend and Frontend: Host the frontend on platforms like Vercel or Netlify. Deploy the backend (Node/Express server) on platforms like Heroku or DigitalOcean. Database Setup: Ensure your MongoDB instance is configured to allow connections from your deployed backend. Screenshots Add screenshots of your application here to showcase the functionality, UI, and overall experience.

About
No description, website, or topics provided.
Resources
 Readme
 Activity
Stars
 0 stars
Watchers
 1 watching
Forks
 0 forks
Releases
No releases published
Create a new release
Packages
No packages published
Publish your first package
Languages
JavaScript
91.3%
 
HTML
8.0%
 
CSS
0.7%
Suggested workflows
Based on your tech stack
SLSA Generic generator logo
SLSA Generic generator
Generate SLSA3 provenance for your existing release workflows
Webpack logo
Webpack
Build a NodeJS project with npm and webpack.
Publish Node.js Package logo
Publish Node.js Package
Publishes a Node.js package to npm.
More workflows
Footer
