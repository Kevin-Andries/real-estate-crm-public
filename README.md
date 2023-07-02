/!\ The development of this project is stopped /!\

# Easimmo - Real Estate CRM

You need Docker engine installed.

To start the project, run:

`./run.sh` or `sh run.sh`

## Front

The project is being built using Vue 3 (initially, it was in React).

### Structure
* [public] --> Contains the project's images and/or videos.
* [src] --> Contains all the frontend files

#### Inside src

* [assets]: External libraries
* [components]: Project's components, such as forms, reusable items, footer, header...
* [router]: Routing of the application (CSR app) - Vue Router
* [state]: State manager of the application - VueX
* [utils]: Mockdata, validation files, anything that we can reuse across the application
* [views]: Each route returns a file inside the 'views' folder

### Stack and Librairies/dependencies 
* [Vue3] --> Main framework used to build the application
* [TailwindCSS] --> CSS framework
* [Leaflet] --> Will be used to display properties on a map
* [heroicons] --> Icons of the application
* [vee-validate] --> Validation librairy, used to validate forms before submitting them to the backend
* [Vue Router] --> Routing
* [VueX] --> State manager
* [Cypress] --> Will be used for E2E testing

### Set up

Open the project, then: 
```
$ cd front/
$ npm install
$ npm run dev
```

## Back

The project is being built using NodeJS.

### Structure
* [controllers] --> controllers of the application
* [custom-types] --> TypeScript custom types / interfaces
* [dist]: Build folder
* [oauth]: Github, Google and regular authentication 
* [public]: Public folder
* [routers]: API routes
* [sql]: SQL queries
* [utils]: Validation, errors, auth, type checks...

### Stack and Librairies/dependencies 
* [NodeJS] --> Used to build the backend
* [Axios] --> To make requests
* [BCrypt] --> To encrypt/decrypt data/passwords
* [cors] --> cors package
* [Express] --> NodeJS framework
* [pg] --> Allow us to use postgres on our app
* [TypeScript] --> Adding TypeScript to the backend

### Set up

Open the project, then: 
```
$ cd back/
$ npm install
$ npm run start
```


