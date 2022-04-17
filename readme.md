<p align="center">
<a href="https://travis-ci.org/vedmant/running-time"><img src="https://travis-ci.org/vedmant/running-time.svg?branch=master" alt="Build Status"></a>
</p>

## Laravel 9 & Vue.js 3 (Options API) + Vuex Sample Project ##

**Laravel & Vue Sample Project** is a tutorial Single Page Application (SPA) for Laravel 6 and Vue.js 2.6 Frontend

[Demo](https://running-time.vedmant.com/)

Use login: `user@gmail.com` and password: `123456`

### Installation ###

```
git clone https://github.com/vedmant/running-time.git # To clone repo
cd running-time
composer install # Install php dependencies

# Prepare enviroment variables
cp .env.example .env # Copy configuration file
php artisan key:generate # Generate unique key

# Prepare database
touch database/database.sqlite # Create sqlite database
php artisan migrate --seed # Create DB Schema and seed sample data
php artisan passport:install # Install Passport

# Compile assets
yarn # Install Javascript dependencies
yarn prod # Compile assets

# Start server
php artisan serve # Start server
```

Open http://localhost:8000 to view site

If you don't have installed yarn, run `npm install -g yarn`


### Main features ###

* Fully separate Backend and Frontend
* Authentication based on Laravel Passport
* List pages with filters and CRUD editing
* Backend validation
* Admin panel
* Simple widgets
* Simple reports
* Full Phpunit test coverage
* E2E tests with Cypress
* Continuous integration with Travis CI
* Development configuration with Docker


### Includes ###

* [Laravel Passport](https://laravel.com/docs/5.4/passport) API Authentication
* [API Docs Gerator](https://github.com/mpociot/laravel-apidoc-generator) Laravel API Documentation Generator
* [Laravel Telescope](https://laravel.com/docs/6.x/telescope) Laravel Telescope for debugging
* [Vue.js](https://vuejs.org/) The Progressive JavaScript Framework
* [Vuex](https://vuex.vuejs.org/en/intro.html) State management pattern + library for Vue.js
* [Vue-Router](https://router.vuejs.org/en/) Router library for Vue.js
* [Axios](https://github.com/axios/axios) HTTP client
* [Docker](https://www.docker.com/) Development setup with Docker


### Other Features ###

* Front page
* Authentication (registration, login, logout, throttle)
* Users roles: administrator (all access), manager (manage records)
* User dashborad with widgets and charts
* Entries list with filter by date (list, show, edit, delete, create)
* Report page with chart
* User profile page
* Admin dashboard with widgets
* Users admin (list, show, edit, delete, create)
* Entries admin (list, show, edit, delete, create)
* Global loader overlay for all requests
* Eslint code standard check
* Lodash-es to allow tree shaking for bundle size optimization
* Support IE11 with Polyfills


### Development ###

To run convenient development server with hot reloading:

```
php artisan serve # Will serve backend on localhost:8000
yarn hot # Will serve frontend on loaclhost:8080 and proxy api requests to localhost:8000
```

And open http://localhost:8080

Alternatively you can use watch method:

```
yarn watch
```

And open http://localhost:8000

To compile assets for production run:
```
yarn prod

# Or to display bundle analyzer run:
yarn production -- --env.analyzer true 
```


### Development with Docker ###

If you want to use more features like Redis queues, MariaDB database,
sending and viewing sent emails you can use Docker setup on this project.

For you you will need Docker installed on your host [https://docs.docker.com/install/](https://docs.docker.com/install/)

To build the image for Docker, run:

    docker-compose build

It will build all images and run all needed containers.

Then use ENV variables, prepared specificly for Docker:

    cp .env.docker.example .env
    docker-compose run php php artisan key:generate

Migrate and seed database, and install Passport:

     docker-compose run php php artisan migrate --seed
     docker-compose run php php artisan passport:install

To run the project in Docker just run:

    docker-compose up

And open http://localhost:8080

To run all the Artisan or Test commands you can use `docker-compose run php` before the command to run it in the container.
If you want to run command in currently running container, use `docker-compose exec php`.


### Tests ###

To run all PHPUnit tests:

```
./vendor/bin/phpunit 
# Or
yarn test
```

To run Cypress E2E tests:

```
php artisan serve
yarn e2e-run
# Or you can open GUI with
yarn e2e
```


### Demo Credentials ###

For testing application the database is seeded with sample users:

* Administrator: email = admin@gmail.com, password = 123456
* Manager: email = manager@gmail.com, password = 123456
* User: email = user@gmail.com, password = 123456


### TODO ###

- Upgrade Bootstrap to v4
- Setup Travis to run Cypress tests
- Add more E2E cypress tests


### License ###

And of course:

[MIT](LICENSE.md)
