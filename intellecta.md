http://localhost:5000/api/prompts
 http://localhost:5000/api/auth/register

{
  "title": "Marketing Copy Generator",
  "description": "Generates product descriptions for e-commerce stores.",
  "systemPrompt": "You are a helpful marketing assistant...",
  "userMessages": ["I need a product description for a phone case."],
  "assistantMessages": ["Sure! Here's a product description..."],
  "categories": ["Marketing", "Writing"],
  "isPrivate": false
}
npm install bcryptjs  - instaed for password hashing,
 

 npm install express mongoose dotenv bcryptjs jsonwebtoken nodemailer express-async-handler
| Package                 Purpose                                   |

| **express**               | Web framework                             |
| **mongoose**              | MongoDB object modeling                   |
| **dotenv**                | Load environment variables from `.env`    |
| **bcryptjs**              | Password hashing                          |
| **jsonwebtoken**          | Token generation + verification           |
| **nodemailer**            | Email sending (Ethereal, Gmail, etc.)     |
| **express-async-handler** | Clean error handling in async controllers like(try-catch{})|

----------------------------> FLOW OF BACKEND
--------------> Auth
---> /register 
{
  "name": "Manisha",
  "email": "Manishaathili1126@outlook.com",
  "password": "Manisha123"
}

token :
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmRiYjcyYzRiZGQ4YmUxY2RkZDQwOCIsImlhdCI6MTc0NzgyNzU3MCwiZXhwIjoxNzQ3OTEzOTcwfQ.6iRnSzZtHzAIvaNy8t27oEhEMQrbxVmkCgcTfxWYMY4

----> /login
{
    "email": "Manishaathili1126@outlook.com",
    "password": "Manisha123"
}
->res.send()
{
    "_id": "682dbb72c4bdd8be1cddd408",
    "name": "Manisha",
    "email": "Manishaathili1126@outlook.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmRiYjcyYzRiZGQ4YmUxY2RkZDQwOCIsImlhdCI6MTc0NzgyNzY4OSwiZXhwIjoxNzQ3OTE0MDg5fQ.dfaKeA0V7UpbflGidBb5FxYVI9cECw21_LRPfck_dWE"
}

----> /me
pass token in authentification 
-> res.send()
{
    "settings": {
        "darkMode": false,
        "language": "en"
    },
    "_id": "682dbb72c4bdd8be1cddd408",
    "name": "Manisha",
    "email": "Manishaathili1126@outlook.com",
    "password": "$2b$10$pLd9z/q0yz0LM9M8ih1Qnuup8lMUc.iMWV7KJ4Mjye6hpzL4Khqd2",
    "isVerified": true,
    "createdAt": "2025-05-21T11:39:30.431Z",
    "updatedAt": "2025-05-21T11:41:22.520Z",
    "__v": 0
}
----------------------------------------------------

---->/verify/:token
http://localhost:5000/api/auth/verify/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmRiYjcyYzRiZGQ4YmUxY2RkZDQwOCIsImlhdCI6MTc0NzgyNzk3OCwiZXhwIjoxNzQ3OTE0Mzc4fQ.0ACPxqRJn-q2QrFEB0WkNRInjSA1CFGKbEoowfiY-HQ

res.send()-Email verified successfully
----------------------------------------------------
----> /forgot-password
{
  "email": "Manishaathili1126@outlook.com"
}
->res.send()
{
    "message": "OTP sent successfully to your email"
}
----------------------------------------------------


--------------------------->prompt 
----> /prompt - POST
{
    "title": "Break Time Encouragement",
    "description": "Micro-motivation to power through the day.",
    "systemPrompt": "You deliver short energy boosts.",
    "userMessages": [
        "Should I take a break?",
        "Losing focus"
    ],
    "assistantMessages": [
        "Breathe, reset, and return stronger.",
        "A break now powers your next move."
    ],
    "categories": [
        "Focus",
        "Daily Routine",
        "Motivation"
    ],
    "isPrivate": false,
    "copiedCount": 0,
    "forkCount": 0,
    "stars": [],
    "author": "682dbb72c4bdd8be1cddd408",
    "_id": "682dbec3c4bdd8be1cddd415",
    "createdAt": "2025-05-21T11:53:39.790Z",
    "updatedAt": "2025-05-21T11:53:39.790Z",
    "__v": 0
}

-----> Update prompt
-----> Delect Prompt