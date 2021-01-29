# Open source libraries to build our app (development dependencies)
- webpack to build our project and run our development server (used to try out our ap in the browser)
- Webpack.config.js - contains the configuration information webpack wll use to build our app
- Starting with the index.js file int he src folder, go ahead and compile JS code we will write using latest available JS syntax into older versions of JS which works in all the major broswsers.
- The actual compiling will be done by Bable. webpack is just initiating and managing the compilation.
- In additon, webpack will pull in other librries we need in our input file like HyperScript and RamdaJs. and include the libraries in the bundle.js file reference inthe output. bundle.js is the output of webpack and its pulled into the browser when our app runs. 

- we also pass configuraion for the webpack development server. the development server will serve our app so we can see it in the browser as we are developing the app

- Additionaly, webpack will watch our souce files for changes and when the change occurs, webpack will recompile the code and refresh the page in the browser automatically.

