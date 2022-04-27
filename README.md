# Architecture

![](public/img/Architecture.PNG)

## Core / Domain

In the Core which is the brain of my application i used Redux tool kit to reduce the boiler plate code that is present in the core Redux library, and ES6 vanilla javascript. the different actions and selectors enable us to comunicate with UI thanks to the React-redux provider that wraps our App component.

## Services/ Infrastructure

I made a class that manage all the api calls and also some data formating.
Indeed this class communicate with the core of the application and provides it the data when it needs it.

## FrameWork / Library /UI

I used the last version (18) React js to build the Ui of the application each component are either pure component that displays data received by props or component that display data received by useSelectors and/or dispacth actions received by useDispatch

### Architecture of a component

a component is usually put in a folder name after it and has 3 files Component.test.js (for testing),Component.jsx(the component itself), Component.module.scss(for styling).

## Conclusion

Why i setup this architecture ?

Because "separation of concern" is a key software principle and thanks to it we can make our application more flexible actually because we separate the buissness logic from the GUI we are not coupled with the framework/library (in that case React) wich is really handy in case of a futur migration . that also facilitate the testatbility of our product owing to the fact that all the layers know nothing about each other.

# Alternative Language choice

I could have use Typescript instead of Javascript, it is the modern way to go with React, i would have use it if the project was bigger.

## Avantages

Direct feedback from the editor so before the compilation. For exemple if i miss a parametter in a function Typescript will catch the error directly, Javascript doesn't see this type of error. Typescript enable us to have better code completion support thanks to the interfaces and types. The last avantage is the self documentation that Typescript gives to the code base, in fact Typescript with TDD alltogether further improve the quality of the code.

## Drawbacks

there is only few trades-off with typescript the first one is that you write more code than with vanilla Javascript. The second one is that certain library that are not maintained anymore doesn't enable us to have type support for Typescript but this case is becoming less frequent.

# Alternative Architecture 1

Instead of using Redux i could have use a custom hook for each reducer with the react hook useReducer.

## Avantages

The main advantage is that useReducer is already include in React so i wouldn't have installed redux-toolkit and react-redux, and the less you download packages the better it is for performance. I would have written a little bit less code though Redux-toolkit solved the boilerplate problem of the classic redux. Custom hooks with useReducer are also easy to test thanks to react-hooks-testing-library.

## Drawbacks

There are two main drawbacks first a strong coupling with React so less fexibilty, secondly useReducer = localState if i wanted to share state between multiple components i would be forced to use the Context APi from React wich is a great option but it's not really a state manager like Redux wich can cause performance issues with too many rerenders.

# Alternative Architecture 2

I could have use Zustand instead of Redux, Zustand is another state manager.

## Avantages

Less boilerPlate than Redux and Redux-toolkit, no need to wrap a Component with a Provider.

## Drawbacks

Zustand is less popular than Redux.

# Workflow

## TDD (Test Driven Development)

![](public/img/Workflow.PNG)

## Library used

To help me write my test i used plain old jest in the core of my application and react testing library to help me replicate the rendering of my component in the virtual DOM and his behavior, i also used jest to write my assertions.

i choose react-testing-library for my react component because it enable us to test our application the way the user experience it and not the actual implementation.At the end of this project i introduce myself to cypress an End to End testing library to further improve the quality of my delivery.

## My testing pyramid

![](public/img/testing-pyramid.PNG)

### Mocking

To mock my API calls i used Mock Service Worker(MSW) because like react-testing-library my test are not glued by the implementation(axios,fetch ect...) since msw mock by intercepting requests on the network level. i used axios for my api calls but i can replaced it with fetch and it will not break my test, that is the biggest advantage of msw.

## Why use TDD in frontend development

Traditionally TDD is not often used in frontend development so why i used tdd in this project ?

1. "TDD slow down the development process", it's true in a short term point of view. Nonetheless in a mid and long term the development process is faster with tdd for the reason that i'm becoming faster as i practice it, when i write pure logic i don't need or rarely need to go back and forth between my browser and my IDE and use console.log or the debugger because the tests help me catch bugs, and point me in the right direction like a GPS.

2. I don't need to test manually my application all the time.

3. My code is much more shorter and elegant thanks to the continious refactoring.

4. I trust more my code, i'm not afraid to break something when i add a new feature to my project or when i refactor a function that already exists.

5. TDD helps me in the design of my application, in reality the tests are just a side effects of TDD, the real value is in the guidance of writing my intention before wrinting any production code and the countinuous feedback.

I surely forgot to mention some advantages of this workflow and there are surely other advantages that i'm not even aware of.

# Styling

For the style of my application i used SASS with Scss modules because i love css and i don't feel the need for any css framework.
seperate the the styling files from the components imporve the lisibilty of the code and don't hover saturated the markup.

i named my classes with the BEM (block\_\_elment--modifier) notation.

## Responsiveness

I used a mobile-first approach to build this app. With the help of flebox and grid the app is responsive by nature almost without using any media queries. i used media queries only for the layout of the modal and to have a font-size coherant with mobile, tablet and laptop devices.

# Goal of the APP

## Specification

1. Display a list of movies or series.

2. Optional: Enable the user to consult details of a movie or a series.

## Scenarios

### Scenario 1

1. Given that the user open the application.

2. When the movies are not displayed yet.

3. Then the user should see a loading spinner

### Scenario 2

1. Given that the user open the application.

2. When an error occurs.

3. Then the user should see a the appropriate error message.

### Scenario 3

1. Given that the user open the application.

2. When there is no error and the loading time is over.

3. Then the user should see a list of recent movies.

### Scenario 4

1. Given that the user has already opened the application and the movies are displayed sucessfully.

2. When the user clicks on the image of a movie.

3. Then the user should see a modal pop up.

### Scenario 5

1. Given that the user has already opened the modal.

2. When the details of the movie are not already displayed

3. Then the user should see a loading spinner.

### Scenario 6

1. Given that the user has already opened the modal.

2. When an error occurs.

3. Then the user should see the appropriate error message.

### Scenario 7

1. Given that the user has already opened the modal.

2. When there is no error and the loading time is over.

3. Then the user should see the details of the movie that he clicked on.

### Scenario 8

1. Given that the user has already opened the modal and the details of the appropriate movie are displayed.

2. When the user clicks on the close button on the top-right of the modal .

3. Then the modal should be closed.

### Scenario 9

1. Given that the user has already opened the modal and the details of the appropriate movie are displayed.

2. When the user clicks on the overlay of the modal .

3. Then the modal should be closed.

### Scenario 10

1. Given that the user has already opened the modal and the details of the appropriate movie are displayed.

2. When the user clicks on the overlay of the modal .

3. Then the modal should be closed.

### Scenario 11

1. Given that the user has already opened the modal and the details of the appropriate movie are displayed.

2. When the user clicks on the content of the modal .

3. Then the modal should stay open.

### Scenario 12

1. Given that the user has already opened the modal and the details of the appropriate movie are displayed.

2. When hits the Escape key.

3. Then the modal should be closed.

### Scenario 13

1. Given that the user has already opened the modal and the details of the appropriate movie are displayed.

2. When the user hits another key than Escapel .

3. Then the modal should stay open.

### Scenario 14

1. Given that the user has already opened the modal and close that same modal

2. When the user clicks on the same image that he clicked before

3. Then modal should apear with the content details directly (thanks to the caching system).

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
