// Planning
// Data ?
// Number (count)

// Functions ?
// View Functions - to transform the data model(just a number here) into the HTML and CSS that should be shown in the browser.

// One or more functions to update the model
// When we click on + the model(number) need to increased by 1
// When we click on - the model(number) need to decreased by 1

// Side effects
// State change when we click + and - button

// Pure - initModel, view(), update()
// impure - State, Side Effects (DOM)

// import h from 'hyperscript';
import hh from 'hyperscript-helpers';
import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

const { div, button } = hh(h)

// initModel
const initModel = 0;

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
    let model = initModel;
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