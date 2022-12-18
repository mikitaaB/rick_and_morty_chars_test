## How to run
Run the following commands in the root folder:
```
yarn
cd server && yarn
cd ../client && yarn
cd .. && yarn run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. Front-end on port 3000, Back-end on port 5000.

## Deploy
Application deployed via Render service on https://rick-and-morty-front.onrender.com
Registered user credentials:
  email: qwerty@qwerty.com
  password: 12345678
Branch 'master' only for local deployment.

## Stack and resources

* https://rickandmortyapi.com/ - API
* React (use hooks)
* Express JS
* SCSS (MUI)
* Local storage
* Typescript

## What to do

Create a frontend application to fetch an external API
* Add a home page with a list of characters;
* Add pagination;
* Add dynamic routes for each API character - display the character’s details;
* Add user info page if he is logged in;
* Implement sign-in/sign-out/sign-up functionality
* “Remember me” checkbox use local storage
* Custom error page
