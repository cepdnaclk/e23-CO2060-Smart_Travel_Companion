# 🌍 Smart Travel Companion

![Project Status](https://img.shields.io/badge/Status-In%20Development-orange?style=flat-square)
![Course](https://img.shields.io/badge/Course-CO2060-blue?style=flat-square)
![Team](https://img.shields.io/badge/Team-Tech%20Flux-blue?style=flat-square)

> An intelligent travel planning platform designed to simplify trip planning in Sri Lanka through personalized itinerary generation, optimized routes, accommodation discovery, booking management, and interactive maps.

---
### 🌐 Live Demo

👉 **[Visit Smart Travel Companion](https://e23-co-2060-smart-travel-companion.vercel.app/)**

---

## 📖 About the Project

The **Smart Travel Companion** is a full-stack travel planning application developed as part of the **CO2060 – Software Systems Design Project** at the **Department of Computer Engineering, University of Peradeniya**.

Planning a trip often requires using multiple platforms for discovering destinations, planning routes, organizing daily activities, finding accommodation, and managing bookings. Smart Travel Companion brings these essential travel-planning functions together into a **single unified platform**.

The application uses intelligent algorithms and location-based services to:

- Generate **personalized multi-day travel itineraries**
- Optimize the order of destinations
- Calculate travel distances and estimated durations
- Consider user interests, budget, travel pace, and must-visit locations
- Recommend suitable accommodation
- Support accommodation bookings
- Provide interactive maps and route visualization
- Allow users to edit and manage generated itineraries
- Provide administrative management facilities

The system is designed to make travel planning more organized, efficient, and convenient for visitors exploring Sri Lanka.

---

## 🎯 Project Objectives

The main objectives of Smart Travel Companion are to:

- Simplify travel planning for destinations across Sri Lanka
- Generate personalized multi-day travel itineraries
- Optimize the order of destinations within a trip
- Consider user interests, travel pace, and budget
- Calculate geographic and road-based travel distances
- Estimate travel durations between destinations
- Provide interactive route and destination maps
- Recommend suitable accommodation
- Support accommodation booking
- Provide secure user authentication and authorization
- Allow users to edit generated itineraries
- Provide administrators with centralized system management facilities

---

# ✨ Key Features

## 🤖 Auto Trip Generator

The **Auto Trip Generator** is the core intelligent planning feature of the system.

Users can specify:

- Trip duration
- Starting location
- Daily starting time
- Travel pace
- Budget level
- Travel interests
- Must-visit destinations

Based on these preferences, the system automatically generates a multi-day itinerary.

### Features

- Personalized itinerary generation
- Multi-day trip planning
- Interest-based destination selection
- Budget-based planning
- Travel pace selection
- Must-visit destination support
- Automatic destination clustering
- Automatic route optimization
- Automatic time scheduling
- Accommodation recommendation

---

## 🧠 Auto Itinerary Generation

The Auto Trip Generator follows a multi-stage processing workflow:

```text
User Preferences
       ↓
Candidate Location Selection
       ↓
Geographic Clustering
       ↓
Route Optimization
       ↓
Road Distance & Duration
       ↓
Schedule Construction
       ↓
Accommodation Matching
       ↓
Generated Itinerary
```

### Route Optimization Process

The route optimization component follows:

```text
Candidate Destinations
        ↓
Nearest-Neighbour Route
        ↓
2-opt Improvement
        ↓
Optimized Daily Route
```

The system uses **OSRM** for road-based distance and duration where available.

If the external routing service cannot be reached, the system uses a geographic-distance-based fallback calculation to estimate travel distance and duration.

> **Note:** The fallback provides an estimated travel duration and does not represent live traffic conditions.

---

## 🗺️ Trip Planning & Routing

The Smart Route Planner allows users to manually create and optimize travel routes.

### Features

- Starting location selection
- Destination selection
- Route ordering
- Geographic distance calculation
- Route optimization
- Interactive map visualization
- Multi-day route visualization
- Destination reordering
- Destination removal
- Route clearing
- Editable itinerary schedules

---

## 🗺️ Maps & Routing

The system integrates multiple mapping and routing technologies:

- **Leaflet** — interactive map visualization
- **OpenStreetMap** — map tile data
- **OSRM** — road-based routing
- **Google Maps** — destination map views

These services support:

- Destination visualization
- Route visualization
- Multi-day itinerary maps
- Road distance calculation
- Travel duration estimation
- Geographic trip planning

> **Note:** The OSRM fallback provides estimated travel duration and does not represent live traffic conditions.

---

## 📅 Multi-Day Itinerary Management

Generated itineraries are organized into individual travel days.

Each day can contain:

- Destination order
- Arrival time
- Visit duration
- Departure time
- Travel distance
- Travel duration
- Recommended accommodation

Users can modify their generated itinerary by:

- Reordering destinations
- Moving destinations between days
- Removing destinations
- Adding destinations
- Changing visit duration
- Changing daily start time

---

## 🏨 Accommodation Management

Users can explore accommodation options associated with destinations.

The system supports:

- Accommodation discovery
- Accommodation details
- Price filtering
- Price-based sorting
- Rating-based sorting
- Room availability information
- Recommended accommodation
- Accommodation booking

---

## 🛎️ Booking Management

Users can make accommodation reservations by providing:

- Check-in date
- Check-out date
- Number of guests
- Number of rooms

The booking price is calculated using:

```text
Total Price =
Nightly Price × Number of Nights × Number of Rooms
```

Supported booking statuses include:

```text
PENDING
CONFIRMED
CANCELLED
```

Users can view and manage their reservations through the **My Bookings** section.

---

# 🧠 Intelligent Algorithms

The Auto Trip Generator combines several algorithmic components.

### 1. Haversine Distance

The Haversine formula is used to calculate geographic distance between locations using latitude and longitude coordinates.

```text
Location A
    ↓
Latitude / Longitude
    ↓
Haversine Calculation
    ↓
Geographic Distance
```

---

### 2. Geographic Location Clustering

Candidate destinations are distributed across the requested number of travel days using geographic clustering.

This helps organize geographically related destinations into appropriate daily groups.

---

### 3. Nearest-Neighbour Route Construction

An initial route is constructed by repeatedly selecting a nearby unvisited destination.

```text
Start Location
      ↓
Nearest Destination
      ↓
Next Nearest Destination
      ↓
Next Destination
      ↓
Complete Route
```

---

### 4. 2-opt Route Optimization

The initial route is further improved using a **2-opt heuristic**.

The algorithm evaluates alternative route segments and reverses selected segments when doing so improves the route distance.

```text
Initial Route
     ↓
2-opt Optimization
     ↓
Improved Route
```

---

### 5. OSRM Road Routing

The system uses **Open Source Routing Machine (OSRM)** to obtain road-based:

- Travel distance
- Travel duration
- Route geometry

If OSRM cannot be reached, the system uses a geographic-distance-based fallback calculation.

---

## 👥 User Roles

The system supports two primary roles:

```text
USER
ADMIN
```

### 👤 Standard User

Standard users can:

- Register and log in
- Explore destinations
- Plan routes
- Generate itineraries
- Edit itineraries
- Save itineraries
- View maps
- Browse accommodations
- Make bookings
- View their bookings
- Cancel their own bookings

### 👨‍💼 Administrator

Administrators can access the **Admin Dashboard** to:

- Manage users
- Manage destinations
- Manage accommodations
- Manage bookings

---

# 🔄 Main System Workflow

The overall Smart Travel Companion workflow can be represented as:

```text
Register / Login
       ↓
Explore Destinations
       ↓
Choose Planning Method
       ↓
 ┌─────────────────┬─────────────────┐
 │ Smart Planner   │ Auto Generator  │
 └────────┬────────┴────────┬────────┘
          ↓                 ↓
       Route            Preferences
          ↓                 ↓
          └────────┬────────┘
                   ↓
            Generated Plan
                   ↓
               Timeline
                   ↓
            Multi-Day Map
                   ↓
           Accommodation
                   ↓
               Booking
                   ↓
             My Bookings
```

---

## 🔐 Authentication & Security

The system implements authentication and authorization using:

- **Spring Security**
- **JWT**
- **BCrypt password hashing**
- **Role-based authorization**

### Authentication Flow

```text
User Login
     ↓
Spring Security
     ↓
Credential Verification
     ↓
JWT Generation
     ↓
Frontend
     ↓
Bearer Token
     ↓
Protected REST API
     ↓
JWT Validation
     ↓
Authorized Request
```

Passwords are securely hashed using **BCrypt**, while JWT tokens are used for authenticated API requests.

---

## 📱 Responsive Interface

The application supports responsive layouts for:

- 💻 Desktop
- 💻 Laptop
- 📱 Tablet
- 📱 Mobile

The navigation, content sections, forms, maps, and travel-planning components adapt to different screen sizes.

---

# 🛠️ Tech Stack

This project follows a **three-tier client-server architecture**.

| Component | Technology | Description |
|----------|-----------|------------|
| **Frontend** | React | Responsive user interface |
| **Build Tool** | Vite | Frontend development and build |
| **Backend** | Spring Boot | REST API and business logic |
| **Database** | MySQL | Relational data storage |
| **ORM** | Hibernate / JPA | Database persistence |
| **Security** | Spring Security | Authentication and authorization |
| **Authentication** | JWT | Stateless authentication |
| **Password Security** | BCrypt | Secure password hashing |
| **HTTP Client** | Axios | Frontend-backend communication |
| **Routing** | React Router | Frontend navigation |
| **Maps** | Leaflet | Interactive map visualization |
| **Map Data** | OpenStreetMap | Map tiles |
| **Road Routing** | OSRM | Road distance and travel duration |
| **Embedded Maps** | Google Maps | Destination map views |
| **Development DB** | H2 | In-memory development database |
| **API** | REST | Client-server communication |

---

# 🏗️ Architecture

The system uses a **three-tier architecture**.

### Presentation Layer

**React** handles:

- User interface
- Navigation
- Forms
- User interaction
- Itinerary visualization
- Maps
- Responsive layouts

### Application / Business Layer

**Spring Boot** handles:

- REST APIs
- Authentication
- Authorization
- Itinerary generation
- Route optimization
- Scheduling
- Accommodation matching
- Booking operations
- Business rules

### Persistence & External Services Layer

This layer handles:

- MySQL database persistence
- H2 development database
- JPA / Hibernate
- OSRM
- OpenStreetMap
- Google Maps

---

# 📂 Project Structure

```text
e23-CO2060-Smart_Travel_Companion/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/smarttravel/backend/
│   │       │       ├── algorithm/
│   │       │       ├── config/
│   │       │       ├── controller/
│   │       │       ├── dto/
│   │       │       ├── model/
│   │       │       ├── repository/
│   │       │       └── service/
│   │       │
│   │       └── resources/
│   │
│   ├── pom.xml
│   └── Dockerfile
│
├── database_schema.sql
│
└── README.md
```

---


# 🗄️ Database

The system uses a relational database to manage:

- Users
- Locations
- Accommodations
- Itineraries
- Itinerary Days
- Itinerary Stops
- Bookings

### Main Relationships

```text
Users
  │
  ├── Itineraries
  │       │
  │       ├── Itinerary Days
  │       │       │
  │       │       └── Itinerary Stops
  │       │
  │       └── Starting Location
  │
  └── Bookings
           │
           └── Accommodations
                    │
                    └── Locations
```


# 🚀 Getting Started

## Prerequisites

Install the following:

- Node.js
- npm
- Java JDK 17+
- MySQL 8+
- Git
- Maven or Maven Wrapper

---

## 1. Clone the Repository

```bash
git clone https://github.com/cepdnaclk/e23-CO2060-Smart_Travel_Companion.git
cd e23-CO2060-Smart_Travel_Companion
```

---

## 2. Database Setup

Use the provided database schema:

```text
database_schema.sql
```

Create the required MySQL database and configure the backend database connection according to your environment.

---

## 3. Backend Setup

Navigate to the backend:

```bash
cd backend
```

Configure the required database and environment variables.

Start the Spring Boot application:

```bash
mvn spring-boot:run
```

The backend uses port `8080` by default unless another `PORT` value is configured.

---

## 4. Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Configure the frontend API URL:

```env
VITE_API_URL=http://localhost:8080/api
```

Start the development server:

```bash
npm run dev
```

---

# ⚙️ Environment Configuration

## Frontend

```env
VITE_API_URL=http://localhost:8080/api
```

For deployment, replace this value with the deployed backend API URL.

## Backend

Important configuration values include:

```text
PORT
SPRING_PROFILES_ACTIVE
SPRING_DATASOURCE_PASSWORD
JWT_SECRET
```

> ⚠️ **Security:** Never commit database passwords, JWT secrets, API keys, or other sensitive credentials to the repository.

---

# 🎓 Academic Project

This project was developed as part of:

**CO2060 – Software Systems Design Project**

**Department of Computer Engineering**  
**University of Peradeniya**

### 👥 Team — Tech Flux

| Student ID | Name | Email |
|---|---|---|
| E/23/009 | Y. Akaalyan | e23009@eng.pdn.ac.lk |
| E/23/019 | A. Arulanantham | e23019@eng.pdn.ac.lk |
| E/23/231 | V. Muhunthan | e23231@eng.pdn.ac.lk |
| E/23/393 | J. Thanushananth | e23393@eng.pdn.ac.lk |



This project was developed as an academic project for the **University of Peradeniya**.

