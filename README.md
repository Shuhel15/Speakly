# Speakly - AI Assistant Platform

A full-stack web application that provides an intelligent AI voice assistant powered by Google Gemini. Users can authenticate via Google Firebase, interact with an AI voice assistant, and manage billing through Razorpay integration.

## 🌟 Features

- **AI-Powered Voice Assistant**: Intelligent voice-based AI assistant powered by Google Gemini API with natural language processing
- **AI-Powered Voice Navigation**: Voice-controlled navigation system for hands-free browsing experience
- **Easy Embedding**: Embed the assistant widget on any website with a single script tag
- **Multiple Themes**: Choose from Dark, Light, Glass, or Neon themes
- **Customizable Voice Tone**: Select from Friendly, Formal, or Professional voice personalities
- **Google Authentication**: Secure login using Firebase Google authentication
- **Billing System**: Integrated payment processing with Razorpay
- **User Management**: Complete user profile and preference management
- **Protected Routes**: Secure access to authenticated features
- **Real-time Interactions**: Responsive UI with React for seamless user experience

## 🏗️ Project Structure

```
Speakly/
├── Client/                          # React Frontend Application
│   ├── src/
│   │   ├── App.jsx                 # Main app component with routing
│   │   ├── main.jsx                # Entry point
│   │   ├── App.css                 # Global styles
│   │   ├── index.css               # Base styles
│   │   ├── assets/                 # Static assets
│   │   ├── Components/
│   │   │   ├── AssistantPreview.jsx    # AI assistant UI component
│   │   │   ├── Navbar.jsx              # Navigation bar component
│   │   │   └── ProtectedRoute.jsx      # Route protection wrapper
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Homepage
│   │   │   ├── Login.jsx           # Login page
│   │   │   ├── Builder.jsx         # Assistant builder/configuration page
│   │   │   └── Billing.jsx         # Billing and payment page
│   │   └── utils/
│   │       └── firebase.js         # Firebase configuration
│   ├── public/
   │   ├── assistant.css           # Assistant widget styles (customizable)
   │   └── assistant.js            # Embeddable assistant widget script (single script tag)
│   ├── index.html                  # HTML entry point
│   ├── vite.config.js              # Vite configuration
│   ├── eslint.config.js            # ESLint configuration
│   ├── package.json                # Frontend dependencies
│   └── README.md                   # Frontend documentation
│
├── Server/                          # Express.js Backend Application
│   ├── index.js                    # Application entry point
│   ├── package.json                # Backend dependencies
│   ├── Configs/
│   │   ├── ConnectDB.js            # MongoDB connection setup
│   │   ├── gemini.js               # Google Gemini API configuration
│   │   ├── razorpay.js             # Razorpay payment configuration
│   │   └── token.js                # JWT token generation & validation
│   ├── Controllers/
│   │   ├── auth.controller.js      # Authentication logic (Google OAuth)
│   │   ├── user.controller.js      # User profile management
│   │   ├── assistant.controller.js # AI assistant interactions
│   │   └── billing.controller.js   # Billing and payment processing
│   ├── Middleware/
│   │   └── isAuth.js               # Authentication middleware
│   ├── Models/
│   │   ├── user.model.js           # User data schema
│   │   └── billing.model.js        # Billing records schema
│   └── Routes/
│       ├── auth.route.js           # Authentication endpoints
│       ├── user.route.js           # User management endpoints
│       ├── assistant.route.js      # Assistant interaction endpoints
│       └── billing.route.js        # Billing endpoints
│
└── README.md                        # This file
```

## � Quick Embed

Embed Speakly AI Assistant on your website with a single line of code:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <!-- Your website content -->
    
    <!-- Add Speakly Assistant Script before closing body tag -->
    <script src="http://localhost:5173/public/assistant.js"></script>
</body>
</html>
```

### Customization

Customize the assistant widget appearance:

**Available Theme Options:**
- `data-theme="light"` - Clean light theme (default)
- `data-theme="dark"` - Modern dark theme
- `data-theme="glass"` - Glassmorphism design with blur effects
- `data-theme="neon"` - Vibrant neon theme with glowing effects

**Available Voice Tone Options:**
- `data-voice-tone="friendly"` - Warm, conversational, and approachable tone
- `data-voice-tone="formal"` - Professional and structured responses
- `data-voice-tone="professional"` - Expert and authoritative tone (default)

## �🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB database
- Google Firebase project
- Google Gemini API key
- Razorpay account

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/Shuhel15/speakly.git
cd speakly
```

#### 2. Setup Backend (Server)

```bash
cd Server
npm install
```

Create a `.env` file in the `Server` directory:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Client URL
CLIENT_URL=http://localhost:5173
```

Start the development server:

```bash
npm run dev
```

Server will run on `http://localhost:5000`

#### 3. Setup Frontend (Client)

```bash
cd Client
npm install
```

Create a `.env` file in the `Client` directory:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

Start the development server:

```bash
npm run dev
```

Client will run on `http://localhost:5173`

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Firebase** - Authentication
- **React Hot Toast** - Notifications
- **React Icons** - Icon library
- **Motion** - Animation library

### Backend
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **Razorpay** - Payment processing
- **Google Gemini** - AI/LLM API
- **Firebase Admin** - Backend auth verification
- **Nodemon** - Development auto-reload

## 📋 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /auth/google` - Google OAuth login

### User Routes (`/api/user`)
- `GET /user/current-user` - Get current authenticated user
- `PUT /user/update` - Update user profile
- `GET /user/assistant-config` - Get user's assistant configuration

### Assistant Routes (`/api/assistant`)
- `GET /assistant/config/:userId` - Get assistant configuration
- `POST /assistant/ask` - Send message to AI assistant

### Billing Routes (`/api/billing`)
- `POST /billing/create-order` - Create Razorpay order
- `POST /billing/verify-payment` - Verify payment
- `GET /billing/history` - Get billing history

## 🔐 Authentication

The application uses:
- **Google OAuth 2.0** for user authentication via Firebase
- **JWT Tokens** for session management stored in secure HTTP-only cookies
- **Protected Routes** that require valid authentication tokens

## 💳 Payment Integration

Razorpay integration enables:
- Secure payment processing
- Payment verification
- Billing history tracking
- Transaction management

## 🤖 AI Assistant & Voice Features

### Voice Assistant
- **AI-Powered Voice Recognition**: Convert speech to text using advanced voice recognition
- **Natural Language Processing**: Google Gemini API for intelligent and contextual responses
- **Text-to-Speech**: Convert AI responses back to natural sounding audio with customizable tone
- **Real-time Streaming**: Live response generation with immediate feedback
- **Multi-language Support**: Support for multiple languages and accents
- **Voice Tone Customization**: Choose between Friendly, Formal, or Professional voice personalities

### Voice Navigation
- **Voice Commands**: Navigate websites hands-free using voice commands
- **Gesture Support**: Combined voice and gesture-based navigation
- **Custom Voice Actions**: Define custom voice commands for your website

### Theme Customization
- **Light Theme**: Clean and minimal design perfect for professional websites
- **Dark Theme**: Modern dark interface for reduced eye strain
- **Glass Theme**: Trendy glassmorphism design with transparency and blur effects
- **Neon Theme**: Eye-catching neon aesthetic with glowing elements and vibrant colors
- **Theme Persistence**: User's theme choice is saved and remembered across sessions

## 📦 Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production (generates assistant.js)
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend
```bash
npm run dev      # Start development server with hot reload
```

## 🔧 Building for Production

To build the embeddable widget for production:

```bash
cd Client
npm run build
```

This generates the minified `assistant.js` and `assistant.css` files that can be deployed to a CDN for embedding across multiple websites.

## 🌐 Environment Variables

### Server (.env)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `GEMINI_API_KEY` - Google Gemini API key
- `RAZORPAY_KEY_ID` - Razorpay public key
- `RAZORPAY_KEY_SECRET` - Razorpay secret key
- `CLIENT_URL` - Frontend application URL

### Client (.env)
- Firebase configuration keys (API Key, Auth Domain, Project ID, etc.)

## 🐛 Troubleshooting

### CORS Issues
Ensure the `CLIENT_URL` in server matches your frontend URL and CORS middleware is properly configured.

### Database Connection
Verify MongoDB connection string and ensure the database server is running.

### Firebase Authentication
Check Firebase project configuration and ensure credentials are correctly set in environment variables.

### Gemini API
Validate Gemini API key and ensure the API is enabled in your Google Cloud project.

## 📄 License

ISC

## 👨‍💻 Author

Shuhel Ahmed

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, please reach out through GitHub issues or contact the maintainer.

---

**Last Updated**: June 2026
