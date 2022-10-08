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