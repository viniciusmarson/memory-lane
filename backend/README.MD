# Memory Lane Service

Micro server responsible to handle user memories.

### Architecure

Our application follows the Hexagonal Architecture (Ports and Adapters) pattern:

```
📂 src/
├── 📂 domain/ # Core Business Logic
│ └── use-cases/ # Business Rules
│ ├── types/ # Business Types
│ ├── errors/ # Business Errors
│ ├── repositories/ # Repository Interfaces (Ports)
│
├── 📂 presentation/ # Interface Layer
│ ├── routes/ # API routes
│ ├── controllers/ # API controllers
│ ├── factories/ # Controllers factories
│ └── errors/ # API errors
│ └── http/ # HTTP Setup
│
├── 📂 data/ # External Implementations
│ ├── database/ # Database Config (Memory, MongoDB, Postgres, etc.)
│ ├── repositories/ # Repository Implementations (Adapters)
│
└── uploads/ # User images saved
```

## Getting Started

First install the dependencies:

```bash
yarn
```

Finally, run the development server:

```bash
yarn develop
```
