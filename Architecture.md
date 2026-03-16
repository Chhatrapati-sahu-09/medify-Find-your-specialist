# 🏗️ Medify System Architecture

The **Medify Healthcare Clinic Booking Platform** follows a **MERN Stack 3-Tier Architecture** consisting of:

1. **Client Layer (User Interface)**
2. **Application Layer (Backend Server & APIs)**
3. **Data Layer (Database)**

This architecture ensures **scalability, maintainability, security, and efficient data flow** between users, services, and the database.

---

# 📊 High Level Architecture Diagram

```mermaid
flowchart LR

%% Client Layer
subgraph Client["Client Layer"]
A[User Browser / Mobile Device]
end

%% Frontend
subgraph Frontend["Frontend Layer (React + Vite)"]
B[React Components]
C[Pages & Layouts]
D[React Router]
E[Leaflet Maps]
F[jsPDF Receipt Generator]
end

%% Backend
subgraph Backend["Backend Layer (Node.js + Express.js)"]
G[Express Server]
H[API Routes]
I[Controllers]
J[Middleware]
K[JWT Authentication]
end

%% Database
subgraph Database["Database Layer"]
L[(MongoDB Atlas)]
M[Mongoose Models]
end

%% External Services
subgraph External["External Services"]
N[Payment Gateway]
O[Map Tiles Provider]
end

%% Connections
A --> B
B --> C
C --> D
C --> E
C --> F

D --> G

G --> H
H --> I
I --> J
J --> K

I --> M
M --> L

I --> N
E --> O
