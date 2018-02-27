import { h, diff, patch } from 'virtual-dom'
import hh from 'hyperscript-helpers';
import createElement from 'virtual-dom/create-element';

const { div, button } = hh(h);

const initialModel = 0;

function view(dispatch, model) {
    return div([
        div({className: "mv2"}, `Count: ${model}`),
        button({className: "pv1 pv2 mv2", onclick: () => dispatch(MSGS.ADD)}, "+"),
        button({className: "pv1 pv2", onclick: () => dispatch(MSGS.SUBTRACT)}, "-")
    ]);
}

const MSGS = {
    ADD: 'plus',
    SUBTRACT: 'minus'
}

const update = (msg, model) => {
    switch (msg) {
        case MSGS.ADD:
            return model + 1;
        case MSGS.SUBTRACTnpm:
            return model - 1;
        default:
            return model;
    }
}


// impure code below
const app = (initialModel, update, view, node) => {
    let model = initialModel;
    let currentView = view(dispatch, model);
    let rootNode = createElement(currentView);
    node.appendChild(rootNode);
    
    function dispatch(msg) {
        model = update(msg, model);
        const updatedView = view(dispatch, model);
        const patches = diff(currentView, updatedView);
        rootNode = patch(rootNode, patches);
        currentView = updatedView;
    }
}

const rootNode = document.getElementById("app");
app(initialModel, update, view, rootNode);