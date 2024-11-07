# MyCertificatesPortfolio

MyCertificatesPortfolio is a React-based web application designed for users to manage and showcase their certificates with ease. Built with Supabase for user authentication and database management, this app allows users to securely add, view, and delete certificates through a simple and responsive interface.

## Features

- **User Authentication**: Login/logout functionality using Supabase.
- **Certificate Management**: Add, view, and delete certificates.
- **Responsive Design**: Mobile-friendly design with a hamburger menu for easy navigation on small screens.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) installed
- [Supabase account](https://supabase.io/) and project set up
- Create a `.env` file and add your Supabase API credentials.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/MyCertificatesPortfolio.git
   cd MyCertificatesPortfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Supabase credentials in `.env`:

   ```plaintext
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_anon_key
   ```

4. Start the development server:

   ```bash
   npm start
   ```

The app will run on `http://localhost:3000`.

## Project Structure

- **src/components**: Contains components for login, certificates display, and certificate addition.
- **src/supabaseClient.js**: Configuration for Supabase client.

## Usage

- **Login**: Authenticate with your Supabase credentials.
- **View Certificates**: Display all uploaded certificates.(By Default)

***(if LoggedIn ie. Admin Privileges)***
- **Add Certificate**: After login, add certificates with details like title, description, date, and associated skills.
- **Delete Certificate**: Only logged-in users can delete certificates.
