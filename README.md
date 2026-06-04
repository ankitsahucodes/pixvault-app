# PixVault

A full-stack image management platform, allowing users to securely upload, organize, and manage their images through albums. Built with React, Express, MongoDB, Cloudinary, and Google OAuth authentication.

---

## Demo Link

[Live Demo](https://pixvault-app.vercel.app)

---

## Technologies

### Frontend

* React
* React Router
* Bootstrap
* Axios
* React Icons
* React Toastify

### Backend

* Node.js
* Express.js
* JWT Authentication
* Multer

### Database

* MongoDB
* Mongoose

### Cloud Services

* Cloudinary
* Google OAuth 2.0

---
## Demo Video
Watch a 4 minutes walkthrough of all major features of this app:<br>
[Watch Demo](https://drive.google.com/file/d/1IgXcMhAhKmWuYE-i_ECJD9e1pRCrupdd/view?usp=sharing)

---
## Features

### Authentication

* Secure Google OAuth login
* JWT-based authentication
* Protected routes for authenticated users
* Persistent login using HTTP-only cookies

### Album Management

* Create new albums
* View all personal albums
* Update album details
* Delete albums

### Image Management

* Upload images to albums
* Cloudinary-based image storage
* View image details
* Edit image metadata
* Delete images

### Favorites

* Mark images as favorites
* View all favorite images in one place

### Comments

* Add comments to images
* Store image-related discussions and notes

### User Dashboard

* Personal image gallery
* User-specific albums and images
* Secure access to owned resources

---
## Quick Start

### Clone Repository

```bash
git clone https://github.com/ankitsahucodes/pixvault-app.git
cd pixvault
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=
JWT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

BACKEND_URL=
FRONTEND_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---
## API Reference

### Authentication

#### GET /auth/google

Redirect user to Google OAuth login.

#### GET /auth/me

Get authenticated user details.

#### POST /auth/logout

Logout current user.

---

### Albums

#### POST /albums

Create a new album.

#### GET /albums

Get all user albums.

#### PUT /albums/:albumId

Update an album.

#### DELETE /albums/:albumId

Delete an album.

---

### Images

#### POST /albums/:albumId/images

Upload an image to an album.

#### GET /albums/:albumId/images

Get all images in an album.

#### GET /images

Get all user images.

#### GET /images/:imageId

Get image details.

#### PATCH /images/:imageId

Update image metadata.

#### PATCH /images/:imageId/favorite

Toggle favorite status.

#### GET /favorites

Get all favorite images.

#### POST /images/:imageId/comments

Add a comment to an image.

#### DELETE /images/:imageId

Delete an image.


---
## Contact
For bugs or feature requests, please reach out to ankitsahu2829@gmail.com