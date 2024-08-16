# Email Sender

This project is an email sender application built with Next.js. It uses various dependencies to handle environment variables, file uploads, email sending, and more.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/email-sender.git
    ```
2. Navigate to the project directory:
    ```sh
    cd email-sender
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

1. Create a `.env.local` file in the root directory and add your environment variables:
    ```env
    # Example .env file
    EMAIL_USER=your-email@example.com
    EMAIL_PASS=your-email-password
    ```
2. Start the development server:
    ```sh
    npm run dev
    ```
3. Build the project for production:
    ```sh
    npm run build
    ```
4. Start the production server:
    ```sh
    npm start
    ```

## Scripts

- `dev`: Starts the development server.
- `build`: Builds the project for production.
- `start`: Starts the production server.
- `lint`: Runs ESLint to check for linting errors.

## Dependencies

- `dotenv`: ^16.4.5
- `multer`: ^1.4.5-lts.1
- `next`: 14.2.5
- `nodemailer`: ^6.9.14
- `p-limit`: ^6.1.0
- `react`: ^18
- `react-dom`: ^18

## Dev Dependencies

- `eslint`: ^8
- `eslint-config-next`: 14.2.5
- `postcss`: ^8
- `tailwindcss`: ^3.4.1

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

##Contact

mail:asiksmk1@gmail.com
