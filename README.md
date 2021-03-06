# Farm Central (Backend)
<!-- ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/alexchkliar/runlink) -->
FarmCentral is a full-stack marketplace web app connecting farmers selling fresh produce with consumers.

Features include:
- REST API with MVC framework
- Authentication, validation and authorization (including Google integration)
- Full range of CRUD operations
- Screen size responsiveness
- Stripe payment integration (enter 4242 4242 4242 for card payment details to test cart checkout)
- Infinite scrolling (dynamic fetching)
- Unit testing both client and backend, mocking API (this part is still under development)

Coded with MERN stack (MongoDB, Express, React, Node). Deployed via AWS, Ubuntu, Nginx and Node on [farmcentral.store](https://farmcentral.store).

This repository stores the backend source files. The client repository can be accessed [here](https://github.com/alexchkliar/farm-central-client).

For avoidance of doubt, this is a personal project and not an actual business).

## Installation
`npm install` to fetch dependencies.

`npm start` to fetch to run the app on your local server (set to http://localhost:3000).

`npm test` to run unit tests.

Connections to the backend are being proxied (remove proxy line in package.json to run in development without a proxy).

## License
Licensed under [MIT License](LICENSE).
