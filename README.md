# angularjs-webpack

An example [AngularJS](https://angularjs.org/) application that uses [Webpack](https://webpack.js.org/) for serving development builds and bundling for production.

## Overview

Although `AngularJS` is deprecated now and no longer supported by Google, I wanted to extend the life of some old applications.

These apps don't warrant the engineering effort to port them to another framework since they're likely to be replaced by other things in the next 18 months.

These apps were based on boilerplate from [John Papa's](https://johnpapa.net/) excellent [Pluralsight](https://pluralsight.com/) courses:

- `Gulp` for serving development builds and bundling for production.
- `JSHint` and `JSCS` for code style, configured to match the [Angular 1 Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md).
- `Bower` for dependencies.

Although this has served us well for several years, I wanted to switch to more modern tooling to improve developer experience, without having to rewrite the applications.

[Create React App](https://create-react-app.dev/) does an excellent job setting up new projects for `React` and I wanted a similar development experience when working on `AngularJS`.

It was also a good excuse to look more deeply how `Webpack` and `Babel` work.

![Screenshot](.docs/screenshot.png)

## Requirements

- Require as few changes as possible to the application source code. Only make changes as a last resort.
  - Most `AngularJS`/`Webpack` samples involve converting the sources to component format as a precursor to converting the application to `Angular 2+`.
- Dependencies from [npm](https://www.npmjs.com/). Not much gets added to [bower](https://bower.io/) anymore since it's also deprecated.
- Use modern tooling:
  - [Babel](https://babeljs.io/) for transpiling to allow new code to use modern Javascript ES6 features like arrow functions.
  - [ESlint](https://eslint.org/) to replace [JSHint](https://jshint.com/) and [JSCS](https://jscs-dev.github.io/)
  - [Webpack](https://webpack.js.org/) to replace [Gulp 3](https://gulpjs.com/) for serving development builds and bundling production builds.
  - [Prettier](https://prettier.io/) for automatically formatting source code.
- Keep the original [Karma](https://karma-runner.github.io/)/[Jasmine](https://jasmine.github.io/) unit tests.
- Don't worry about any [Protractor](https://www.protractortest.org/) tests.

## Installation

Download the source from Github and run `npm install` from the project directory.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. \

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the `Karma` test runner and runs all unit tests once.

### `npm run test:watch`

Launches the `Karma` test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `dist` folder.\
It optimizes the build for the best performance.\
The build is minified and the filenames include the hashes.

To run the production build, type `npx serve ./dist`

### `npm run lint`

Runs the application's files through `ESlint` and `Prettier` to verify code style and correctness.

### `npm run clean`

Cleans the `dist` folder.