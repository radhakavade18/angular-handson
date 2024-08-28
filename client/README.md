# AngularPractice

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# create feature module with lazy loading

ng generate module your-module-name --route your-route-name --module app.module

## Authentication and Authorisation process

1. Create components and decleare in app.module.ts file
   - add provides from interceptor - authInterceptor provider
2. create interceptor
   - add token handling logic
3. create token storage service
   - to save, get token and user details
4. create auth service
   - for login and register api calls
5. create user service
   - to get the role based api calls
6. create navigation bar and logic to show and hide the nav items
7. add routes in app-routing.module.ts file
