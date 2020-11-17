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

import h from 'hyperscript';
import hh from 'hyperscript-helpers';

const { div, button } = hh(h)

const initModel = 0;

// View Function
function view(model) {
    return div([
        div({ className: 'mv2' }, `Count: ${model}`),
        button({ className: 'pv1 ph2 mr2', onclick: () => console.log('+ clicked!') }, '+'),
        button({ className: 'pv1 ph2', onclick: () => console.log('- clicked!')}, '-')
    ])
}

function update(msg, model) {
    switch(msg){
        case 'plus':
            return model + 1;
        case 'minus':
            return model - 1;
        default:
            return model;
    }
}

const rootNode = document.getElementById('app');
// rootNode.appendChild(view(initModel));
rootNode.appendChild(view(update('minus', initModel)));