## 🏗️ Medify System Architecture

```mermaid
flowchart LR

%% =======================
%% Client Layer
%% =======================
subgraph Client["Client Layer"]
    A[User Browser / Mobile Device]
end

%% =======================
%% Frontend Layer
%% =======================
subgraph Frontend["Frontend (React + Vite)"]
    B[React UI Components]
    C[Pages & Layouts]
    D[React Router Navigation]
    E[Leaflet Map Integration]
    F[jsPDF Receipt Generator]
end

%% =======================
%% Backend Layer
%% =======================
subgraph Backend["Backend (Node.js + Express.js)"]
    G[Express Server]
    H[API Routes]
    I[Controllers - Business Logic]
    J[Middleware - Validation & Auth]
    K[JWT Authentication]
end

%% =======================
%% Database Layer
%% =======================
subgraph Database["Database Layer"]
    L[(MongoDB Atlas)]
    M[Mongoose Models]
end

%% =======================
%% External Services
%% =======================
subgraph ExternalServices["External Services"]
    N[Payment Gateway]
    O[Map Tiles Provider]
end

%% =======================
%% Connections
%% =======================
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
