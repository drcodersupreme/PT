# PT Backend

Production-ready Node.js, Express, MongoDB, and JWT backend for the PT fitness web app.

## Setup

```bash
cd backend
npm install
npm run seed
npm run dev
```

The API runs on `http://localhost:5000` by default. Update `backend/.env` before deploying and replace `JWT_SECRET` with a long random secret.

## Environment

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/pt_fitness
JWT_SECRET=replace_with_a_long_random_secret_for_production
JWT_EXPIRES_IN=30d
CLIENT_URL=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=250
```

## Core Routes

### Auth

```http
POST /api/auth/register
POST /api/auth/login
GET /api/auth/profile
```

Register:

```json
{
  "name": "Alex Carter",
  "email": "alex@example.com",
  "password": "StrongPass123",
  "age": 27,
  "height": 178,
  "weight": 76,
  "gender": "male",
  "fitnessGoal": "build_muscle",
  "experienceLevel": "intermediate",
  "workoutPreferences": {
    "workoutDaysPerWeek": 4,
    "preferredDays": ["Monday", "Tuesday", "Thursday", "Saturday"],
    "sessionDuration": 45,
    "equipment": ["dumbbells", "barbell", "bench"]
  }
}
```

Login:

```json
{
  "email": "alex@example.com",
  "password": "StrongPass123"
}
```

Use the returned JWT as:

```http
Authorization: Bearer <token>
```

### Users

```http
GET /api/users/me
PUT /api/users/me
PUT /api/users/preferences
GET /api/users/favorites
POST /api/users/favorites/:exerciseId
```

### Exercises

```http
GET /api/exercises?page=1&limit=12
GET /api/exercises/:id
GET /api/exercises/search?q=bench
GET /api/exercises/filter?muscleGroup=chest&difficulty=intermediate&equipment=barbell
POST /api/exercises
PUT /api/exercises/:id
DELETE /api/exercises/:id
```

Exercise create/update routes require an admin JWT.

### Workouts

```http
POST /api/workouts/generate
GET /api/workouts/my-plan
POST /api/workouts/start
POST /api/workouts/complete
GET /api/workouts/history
```

Generate plan:

```json
{
  "goal": "build_muscle",
  "experienceLevel": "intermediate",
  "workoutDays": 4,
  "preferredDays": ["Monday", "Tuesday", "Thursday", "Saturday"],
  "sessionDuration": 45,
  "equipment": ["dumbbells", "barbell", "bench"]
}
```

Complete workout:

```json
{
  "sessionId": "6645f4f1f42b2a99d1e55a21",
  "durationMinutes": 48,
  "exercises": [
    {
      "name": "Bench Press",
      "sets": [
        { "setNumber": 1, "reps": 10, "weight": 60, "completed": true },
        { "setNumber": 2, "reps": 8, "weight": 65, "completed": true }
      ],
      "completed": true
    }
  ]
}
```

### Progress

```http
POST /api/progress/update
GET /api/progress/history
GET /api/progress/stats
```

Progress update:

```json
{
  "bodyWeight": 74.5,
  "notes": "Morning weigh-in"
}
```

## Seed Data

The seed file includes detailed exercises with:

- Primary and secondary muscles
- Difficulty
- Equipment
- Video URL
- Instructions
- Common mistakes
- Breathing cues
- Sets/reps recommendations
- AI form-check metadata

Run:

```bash
npm run seed
```

Clear seeded exercises:

```bash
npm run seed:destroy
```

## AI Integration Path

AI support is intentionally separated from core REST behavior. The current backend stores structured AI-ready context in:

- `User.aiContext`
- `Exercise.aiMetadata`
- `WorkoutPlan.aiMetadata`

Future services can use `services/aiFitnessService.js` to plug in:

- Pose detection
- Form checking
- Personalized workout recommendations
- Recovery and progression suggestions
