![SafeGo Banner](./server/static/images/banner.png)

# SafeGo — Ride Sharing Platform

> A simple, secure, and efficient ride-sharing platform connecting drivers and passengers.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Usage](#usage)
- [About SafeRide AI](#about-saferide-ai)
- [License](#license)

---

## Overview

**SafeGo** is a full-stack ride-sharing web application built with a modern tech stack. It enables users to register, log in, and either book a ride or offer one — all within a clean, secure interface. The platform is designed for ease of use and lays the foundation for scalable transportation solutions.

---

## Features

- **User Registration & Login** — Secure account creation and authentication flow
- **Book a Ride** — Passengers can request rides with pickup and drop-off details
- **Driver & Passenger Roles** — Distinct user roles with role-based access
- **Ride History** — View past and upcoming rides at a glance
- **Secure Authentication** — Token-based authentication to protect user data
- **Basic Fare Calculation** — Automatic fare estimation based on distance

---

## Tech Stack

| Layer      | Technology  | Folder   |
|------------|-------------|----------|
| Frontend   | React       | `client` |
| Backend    | FastAPI     | `server` |
| Database   | MongoDB     | —        |

---

## Project Structure

```
SafeGo/
├── client/            # React application
├── server/            # FastAPI server and routes
│   └── database/      # MongoDB connection and models
├── .gitignore
├── LICENSE
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or above)
- [Python](https://www.python.org/) (v3.9 or above)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

---

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/dineshsingh099/SafeGo-Ride-Sharing-Platform.git
```

**2. Navigate to the project folder**

```bash
cd SafeGo-Ride-Sharing-Platform
```

**3. Install frontend dependencies**

```bash
cd client
npm install
```

**4. Install backend dependencies**

```bash
cd ../server
pip install -r requirements.txt
```

---

### Running the Project

**Start the frontend**

```bash
cd client
npm run dev
```

**Start the backend**

```bash
cd server
python server.py
```

> The frontend runs at `http://localhost:5173` and the backend at `http://127.0.0.1:8171` by default.

---

## Usage

1. **Register** as a new user (passenger or driver)
2. **Log in** to your account with your credentials
3. **Book a ride** by entering your pickup and destination, or **offer a ride** as a driver
4. **Track and manage** your rides from the dashboard
5. **View ride history** from your profile

---

## About SafeRide AI

**SafeRide AI** is the intelligent backbone of this platform — a scalable ride-booking engine built on FastAPI and modern infrastructure.

| Feature                    | Description                                              |
|----------------------------|----------------------------------------------------------|
| JWT Authentication         | Stateless, token-based login system                      |
| OTP-based Security         | One-time password verification for enhanced safety       |
| Real-time Ride Tracking    | Live location updates for drivers and passengers         |
| AI-powered Safety Features | Automated anomaly detection and smart route suggestions  |

---

## License

This project is licensed under the terms specified in the [LICENSE](./LICENSE) file.  
All rights reserved © Dinesh Singh.

---

<p align="center">Made with care by <a href="https://github.com/dineshsingh099">Dinesh Singh</a></p>
