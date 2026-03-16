# API Documentation

This document describes the **REST API endpoints** used in the **Medify Healthcare Clinic Booking Platform**.

Base URL (Development)

```
http://localhost:3000/api
```

Base URL (Production Example)

```
https://your-backend-domain.com/api
```

---

# Authentication

Medify uses **JWT (JSON Web Token)** for secure authentication.

After login, the client receives a **JWT token** which must be sent in protected requests.

Example header:

```
Authorization: Bearer <token>
```

---

# Authentication APIs

## Register User

Create a new patient account.

**Endpoint**

```
POST /api/auth/register
```

**Request Body**

```
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "patient"
}
```

**Response**

```
{
  "message": "User registered successfully",
  "user": {
    "id": "12345",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## Login User

Authenticate user and generate JWT token.

**Endpoint**

```
POST /api/auth/login
```

**Request Body**

```
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response**

```
{
  "token": "jwt_token_here",
  "user": {
    "id": "12345",
    "name": "John Doe"
  }
}
```

---

# Clinic APIs

## Get All Clinics

Retrieve a list of clinics.

**Endpoint**

```
GET /api/clinics
```

**Response**

```
[
  {
    "id": "clinic123",
    "name": "City Health Clinic",
    "location": "Delhi",
    "specialization": "Cardiology"
  }
]
```

---

## Get Clinic Details

Retrieve detailed information about a specific clinic.

**Endpoint**

```
GET /api/clinics/:id
```

**Example**

```
GET /api/clinics/clinic123
```

---

# Doctor APIs

## Get Doctors by Clinic

Retrieve doctors associated with a clinic.

**Endpoint**

```
GET /api/doctors/clinic/:clinicId
```

---

## Get Doctor Details

Retrieve details of a specific doctor.

**Endpoint**

```
GET /api/doctors/:id
```

---

# Appointment APIs

## Book Appointment

Create a new appointment booking.

**Endpoint**

```
POST /api/appointments
```

**Headers**

```
Authorization: Bearer <token>
```

**Request Body**

```
{
  "doctorId": "doctor123",
  "clinicId": "clinic123",
  "date": "2026-03-20",
  "time": "10:30 AM"
}
```

**Response**

```
{
  "message": "Appointment booked successfully",
  "appointmentId": "appt123"
}
```

---

## Get User Appointments

Retrieve appointments for the logged-in user.

**Endpoint**

```
GET /api/appointments/user
```

---

## Cancel Appointment

Cancel an existing appointment.

**Endpoint**

```
DELETE /api/appointments/:id
```

---

# Payment APIs

## Create Payment

Initiate payment for appointment booking.

**Endpoint**

```
POST /api/payments
```

**Request Body**

```
{
  "appointmentId": "appt123",
  "amount": 500,
  "method": "UPI"
}
```

---

# Review APIs

## Add Review

Add review for clinic or doctor.

**Endpoint**

```
POST /api/reviews
```

**Request Body**

```
{
  "clinicId": "clinic123",
  "rating": 5,
  "comment": "Excellent service"
}
```

---

## Get Reviews

Retrieve reviews for a clinic.

**Endpoint**

```
GET /api/reviews/clinic/:clinicId
```

---

# Error Responses

All APIs return errors in the following format:

```
{
  "error": "Error message"
}
```

Example:

```
{
  "error": "Unauthorized access"
}
```

---

# API Status Codes

| Code | Meaning          |
| ---- | ---------------- |
| 200  | Success          |
| 201  | Resource created |
| 400  | Bad request      |
| 401  | Unauthorized     |
| 404  | Not found        |
| 500  | Server error     |

---

# Summary

The Medify API provides endpoints for:

* User authentication
* Clinic discovery
* Doctor information
* Appointment booking
* Secure payments
* Review management

All APIs follow **RESTful design principles** and return **JSON responses**.
