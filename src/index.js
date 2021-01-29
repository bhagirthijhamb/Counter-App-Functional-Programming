// Planning

// FUNDAMENTAL BUILDING BLOCKS
// The two fundamental building blocks we will be using in our app
// DATA - (immutable data)
// FUNCTION - (pure functions)

// Data ?
// Number (count)

// Functions ?
// what kind of data tansformation we will need to do in our app    
// View Functions - to transform the data model(just a number here) into the HTML and CSS that should be shown in the browser.

// What kind of data transforamtion do we need to perform 
// One or more functions to update the model
// When we click on + the model(number) need to increased by 1
// When we click on - the model(number) need to decreased by 1

// Side effects
// Is it okay to allow side effects in View and Update functions
// The counter (number) will chnage whan we click +/- buttons
// By definition counter chnaging is a side effect. More stecifically its a state change
// State change when we click + and - button


// view function will be a pure function
// Rules
// 1. Have input parameters
// 2. No stateful values
// 3. Return based on input
// 4. No sdie effects.

// In the buttons attribute object, along with className property, we add another attribute onClick.
// For the onClick property's value, we add a lambda function.
// What is this onClick property
// DOM is how we are able to interact with the web page programatically with JS
// Adding this onClick property allows us to tell the DOM that we are interested in knowing when someone clicks on the button. This is done by passing the onClick property a function that will be called when the button is clicked.

// Update function to update the data model(number)
// update function will take two input parameters - msg and model. 
// model is a number. What data type will be the msg. mgs is just indication of what button was clicked ( either plus or minus). So we get to decide what type and value the msg will be 

// We have got three pieces of app, the building blocks that aren't connected
// initModel - represents the starting data in the app
// view() function - simply returns the html and css that should be shown based on the current state of the app
// update() function - responsible for returning a new model based on the msg and current model
// So how do we conect these pieces of ap together ?

// we need some way to keep the state of our app (just a number in this case)

// we need a way of taking an output from the view function - the html and css and rendering that on the page by interacting with the DOM (which is essentially a side effect)

// Pure - initModel, view(), update()
// impure - State, Side Effects (DOM)

// import h from 'hyperscript';
import hh from 'hyperscript-helpers'; // actual library that provides all the different html functions such as the div() function to create div tags and the button() function to create button tags
// but hh library depends on another library to know how to render the html tags (hyperscript library)  
// hh(h) this function call returns an object with properties for all the tag writing functions.    
// Its equivalent to const tags = hh(h);
// we can use destructuring instead of using the tags constant.

import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
// virtual-dom library is  a performance library that will sit between the view our app generates and the DOM
// when we send a new view to the virtual-dom library, it will compare the new view to the current view and digure out the minimum amount of chnages that will need to be made to the browsers DOM. And only make those chnages
// we get huge performace benefit without mking any significant chnage to the code.
const { div, button } = hh(h)

// initModel
const initModel = 5;

// View Function
function view(dispatch, model) {
    return div([
        div({ className: 'mv2' }, `Count: ${model}`),
        button({ className: 'pv1 ph2 mr2', onclick: () => dispatch(MSGS.ADD) }, '+'),
        button({ className: 'pv1 ph2', onclick: () => dispatch(MSGS.SUBTRACT) }, '-')
    ])
}

const MSGS = {
    ADD: 'ADD',
    SUBTRACT: 'SUBTRACT'
}

// update function
function update(msg, model) {
    switch(msg){
        case MSGS.ADD:
            return model + 1;
        case MSGS.SUBTRACT:
            return model - 1;
        default:
            return model;
    }
}

// impure code below
function app(initModel, view, update, node) {
    let model = initModel; // model variable will hold the state of our app
    let currentView = view(dispatch, model);
    let rootNode = createElement(currentView);
    // node.appendChild(currentView);
    node.appendChild(rootNode);

    function dispatch(msg){
        model = update(msg, model);
        const updatedView = view(dispatch, model);
        const patches = diff(currentView, updatedView); // determines what needs to be changed between last view and current view
        rootNode = patch(rootNode, patches);
        // node.replaceChild(updatedView, currentView);
        currentView = updatedView;
    }
}

const rootNode = document.getElementById('app');

// rootNode.appendChild(view(initModel));
// rootNode.appendChild(view(update('minus', initModel)));

app(initModel, view, update, rootNode);



