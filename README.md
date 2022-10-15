# DB GUI Team 1 Project

## Set Up
1. Ensure that Node and NPM are installed on your machine
    * You can check by running `node -v` and `npm -v` in your terminal. You should see the installed version number
2. Clone this repository
3. Download packages by running `npm i` or `npm install` in the root folder of the repo. This will install packages for both the frontend and backend.
4. Navigate to ./frontend and create a file named `.env`
    * The contents should be 
    ```VITE_API_URL=http://localhost:8000```
    * More environment variables may need to be added later, especially for the backend.


5. Build the project (First time only):
   * Run `npm run build` in the root of the repo
    
6. Start the development server: 
    * Run `npm run dev` in the ***root*** of the repo to start both the frontend and backend development environments.
      * The website and server will update live when you make changes
      * The backend is located at http://localhost:8000
      * The frontend is located at http://localhost:3000

## Database Setup
1. Pull changes with `git pull`
2. Install new libraries: run `npm install`  in **root directory** of repo
3. Create .env file in `packages/prisma-schema` (contents in gc)
4. Create .env file in `backend` (with same contents as step 3)
5. Run `npm run regenerate-db` in root directory to generate the database package
6. Run `npm run dev` to confirm connection
7. Optional (but highly recommended): Install the prisma vs code extension

Note: For docker setup on aws you need to replace `CHANGE_ME` with the proper database url from the .env files


## Commands
* `npm run build` : builds both the frontend and backend for production
* `npm run serve` : runs both the frontend and backend after you've built it
* `npm run lint` : analyzes code to find problems
* `npm run format` : Formats all code in the project
    * Turning on "Format on Save" in VS Code is *highly recommended*
* ***NEW!***  &nbsp;  `npm run studio` : opens a database editor in browser (on localhost:5555)

## Documentation for Libraries
### Frontend
* [React](https://beta.reactjs.org/)
* [React Router](https://reactrouter.com/en/main)
* Potential Libraries: 
    * [Tailwind](https://tailwindcss.com/docs/utility-first)
    * [MUI](https://mui.com/material-ui/getting-started/overview/)
    * [Mantine](https://mantine.dev/pages/getting-started/)

### Backend
* [Express](https://expressjs.com/en/guide/routing.html)
* [Prisma](https://www.prisma.io/docs/concepts/components/prisma-client)
