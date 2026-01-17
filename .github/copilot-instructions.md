# MEN Stack CRUD App - AI Agent Guide

## Project Overview
This is a **MEN stack** (MongoDB, Express, Node.js) CRUD application for managing cars. The app uses **EJS templating** for server-side rendering (not a SPA) and follows a traditional multi-page application pattern.

## Architecture & Key Patterns

### Project Structure
- `server.js` - Main entry point, middleware configuration, DB connection
- `models/` - Mongoose schemas (e.g., `Cars.js`)
- `controllers/` - Express routers with route handlers (e.g., `cars.routes.js`)
- `views/` - EJS templates for server-rendered pages
- `public/` - Static HTML files served directly (some duplication with views/)

### Router Pattern
All routes are **prefixed at the controller level** in `server.js`:
```javascript
app.use('/cars', carsRouter) // Routes in carsRouter automatically get /cars prefix
```
So `router.get('/')` in `cars.routes.js` becomes `GET /cars/`.

### RESTful Routing (Non-Standard)
**IMPORTANT**: This app uses a **hybrid approach** mixing proper REST with convenience patterns:

- `GET /cars` - List all cars
- `POST /cars` - **Renders create form** (not standard REST - should be GET)
- `GET /cars/:id` - Show single car details
- `GET /cars/:id/edit` - Render edit form
- `POST /cars/:id` - Update car (uses `?_method=PUT` in forms for REST simulation)
- `GET /cars/:id/delete` - Delete car (**should be DELETE method**, but using GET for simplicity)

### Method Override Pattern
The app uses `method-override` middleware to simulate PUT/DELETE in HTML forms:
```html
<form action="/cars/<%= car._id %>?_method=PUT" method="POST">
```
This is required because HTML forms only support GET/POST natively.

### Database Connection
MongoDB connection uses **async/await** pattern with custom `connectToDB()` function in `server.js`. Database URI comes from `process.env.MONGODB_URI` (.env file).

### Model Conventions
- Mongoose models use simple schemas without validation
- Model filenames use PascalCase: `Cars.js`
- Models export the compiled model: `module.exports = mongoose.model('Car', carSchema)`
- Import pattern: `const Car = require('../models/cars')` (lowercase in import)

### View Rendering
- EJS templates are in `views/` directory
- No layout/partials system - each view is standalone HTML
- Data passed via `res.render('template-name', { data })`
- Template naming: kebab-case (e.g., `cars-list.ejs`, `car-details.ejs`)

### Static vs Dynamic Content Issue
**DUPLICATION**: There's both `public/cars-create.html` (static) and `views/cars-create.ejs` (dynamic). The static HTML is NOT properly linked from the app - the link in `cars-list.ejs` points to `/cars-create` which doesn't match any route. This is a bug.

## Development Workflow

### Running the App
```bash
npm start  # Starts server on port 3000
```
No hot reload configured - restart manually after changes.

### Environment Setup
Requires `.env` file with:
```
MONGODB_URI=your_mongodb_connection_string
```

### Dependencies
- **express** (v5.2.1) - Web framework
- **mongoose** (v9.1.2) - MongoDB ODM
- **ejs** (v3.1.10) - Template engine
- **method-override** (v3.0.0) - HTTP verb simulation
- **morgan** - HTTP request logger (imported but listed as `env` in package.json - likely typo)

## Common Modifications

### Adding a New Resource
1. Create model in `models/ResourceName.js`
2. Create router in `controllers/resource.routes.js`
3. Register router in `server.js`: `app.use('/resources', resourceRouter)`
4. Create views following naming convention: `resources-list.ejs`, `resource-details.ejs`, etc.

### Adding Model Fields
Update the Mongoose schema in `models/` - no migrations needed (MongoDB is schemaless).

### Fixing Routes
When adding proper REST endpoints:
- Use `router.get('/new')` for create form
- Use `router.post('/')` for actual creation
- Use proper HTTP methods with method-override

## Known Issues & Quirks

1. **morgan dependency**: Listed as `env` in package.json but should be `morgan`
2. **Inconsistent file structure**: Both static HTML and EJS templates exist for same functionality
3. **Non-RESTful routes**: Create form uses POST instead of GET, delete uses GET instead of DELETE
4. **No error handling**: Routes use async/await without try/catch blocks
5. **No validation**: Models and forms lack validation logic
6. **Hardcoded port**: Port 3000 is hardcoded in server.js instead of using environment variable
