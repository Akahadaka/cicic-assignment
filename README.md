## CICIC Assignment

# Backend: NodeJS Express 4
Institutions are managed in `src/controllers/institutions.ts`

Data is stored in a `data.json` file. This is updated server side when adding/removing institutions.

Available REST requests are GET, POST, PUT and DELETE

### Run the backend

```$ cd backend```

```$ npm install```

```$ npm run start```

The server should be running on `http://localhost:3000/`

This should copy the `data.json` file to the `./dist` folder, compile the Typescript and start the backend

### Other commands
For development purposes use

```$ npm run serve```

For testing use

```$ npm run test```


# Frontend: Angular 12

Using Angular Material for UX components.

Search is a lazy loaded module.

There is toast/snackbar for notications.

## Run the frontend

Open a new terminal and navigate to this repo

```$ cd frontend```

```$ npm install```

Here we use serve so that local proxy is easier

```$ npx ng serve```

The application should be served on `http://localhost:4200`