![Banner](Frontend/public/images/banner.png)

# Medify - Healthcare Clinic Booking Platform



A comprehensive healthcare platform that connects patients with clinics, enabling easy appointment booking, doctor discovery, and seamless healthcare management. Built with modern web technologies for a smooth user experience.

## Features

### For Patients
- **Easy Clinic Discovery**: Search clinics by location or medical specialty
- **Doctor Profiles**: View detailed doctor information, specialization, and consultation fees
- **Online Appointment Booking**: Book appointments with preferred doctors and time slots
- **Secure Payment Processing**: Multiple payment options with secure checkout
- **Appointment Management**: View and manage upcoming appointments
- **Clinic Reviews**: Read and write reviews for clinics and doctors
- **Real-time Availability**: Check doctor availability and book instantly

### For Clinics
- **Dashboard Management**: Comprehensive dashboard to manage appointments
- **Patient Management**: View patient details and appointment history
- **Appointment Tracking**: Real-time updates on appointment bookings
- **Doctor Management**: Manage doctor profiles and availability
- **Review Management**: Monitor and respond to patient reviews

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Leaflet** - Interactive maps for clinic locations
- **React Leaflet** - React components for Leaflet maps
- **jsPDF** - Generate appointment receipts

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Joi** - Data validation

### Additional Tools
- **MongoDB Atlas** - Cloud database hosting
- **Vite** - Development and build tooling
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Skills

### Frontend Technologies
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Backend Technologies
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)

### Development Tools
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![VS Code](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/shashankmishra21/Project-HealthCare.git
   cd Project-HealthCare
   ```

2. **Install backend dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the Backend directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```

5. **Start the backend server**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Install frontend dependencies**
   ```bash
   cd ../Frontend
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5173`

## Usage

### For Patients

1. **Sign Up/Login**: Create an account or sign in as a patient
2. **Search Clinics**: Use location-based or specialty-based search
3. **View Clinic Details**: Browse doctor profiles, services, and facilities
4. **Book Appointments**: Select doctor, date, and time slot
5. **Make Payment**: Complete secure payment for appointment confirmation
6. **Manage Appointments**: View upcoming appointments in your dashboard

### For Clinics

1. **Clinic Registration**: Sign up your clinic with detailed information
2. **Dashboard Access**: View all appointments and patient information
3. **Appointment Management**: Track and manage appointment bookings
4. **Doctor Management**: Add and manage doctor profiles
5. **Patient Communication**: View patient details and appointment history

## Screenshots

### Homepage - Healthcare Platform Hero Section
![Healthcare platform hero section for booking clinic appointments online](./Frontend/src/assets/screenshots/Screenshot%202025-12-14%20003253.png)

*Highlights easy doctor discovery, instant booking, and trusted healthcare services. Clean, professional design with a strong call-to-action and mobile preview.*

### Clinic Search - Choose Search Method
![User chooses a search method: by location or by medical specialty](./Frontend/src/assets/screenshots/Screenshot%202025-12-13%20212447.png)

*Enters required details (location and/or specialty) and starts the search. System displays matching doctors or specialists with booking options.*

### Clinic Details Page
![Clinic details page displaying overview, doctors, services, facilities, and location map](./Frontend/src/assets/screenshots/Screenshot%202025-12-14%20002711.png)

*Users can view doctor profiles, consultation fees, and clinic information. Provides quick actions to book appointments and access contact/location details.*

### Appointment Booking
![Appointment booking page where users select a doctor, date, and available time slot](./Frontend/src/assets/screenshots/Screenshot%202025-12-14%20003024.png)

*Patient details are collected and a live confirmation summary is shown alongside. User reviews details and proceeds with Confirm & Pay to complete the booking.*

### Payment Processing
![Payment page displaying a summary of the appointment and payable amount](./Frontend/src/assets/screenshots/Screenshot%202025-12-14%20113548.png)

*Users can choose a payment method (UPI, debit/credit card, net banking) to confirm booking. Secure checkout flow to complete appointment confirmation payment.*

### Booking Confirmation
![Payment success page confirming the appointment booking](./Frontend/src/assets/screenshots/Screenshot%202025-12-14%20113548.png)

*Displays appointment summary with doctor, clinic, patient, and specialization details. Provides options to download the receipt, return home, or view appointment details.*

## Project Structure

```
Project-HealthCare/
├── Backend/
│   ├── controllers/          # Business logic controllers
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API route handlers
│   ├── middleware/          # Custom middleware
│   ├── scripts/             # Database seeding scripts
│   ├── config/              # Database configuration
│   └── index.js             # Main server file
├── Frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── assets/          # Images and screenshots
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── data/            # Static data files
│   │   └── utils/           # Utility functions
│   └── index.html           # HTML template
└── README.md
```

## 🔧 Available Scripts

### Backend
- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed the database with sample data

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
## 👥 Authors

- **Chhatrapati Sahu** - *Initial work*
##  Acknowledgments

- Thanks to all contributors and the open-source community
- Special thanks to the healthcare professionals for their valuable input
- Icons and images sourced from Unsplash and other free resources

---

**Made with ❤️ for better healthcare accessibility**