Prototype of a game `Remember & Flip`

## Docker deployment

[Docker installation guide (Ubuntu)](https://docs.docker.com/engine/install/ubuntu/)

In root folder run
```
bash tools/docker/run-docker.sh
```

Build script
```
bash tools/docker/build-docker.sh
```

Stop script
```
bash tools/docker/stop-docker.sh
```

## Development mode

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run test:coverage`

Launches the test runner and checks the coverage.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run lint`

Lints the code in order with rules and fixes all linting errors
