import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

const app = (initialModel, update, view, node) => {
    let model = initialModel;
    let currentView = view(dispatch, model);
    let rootNode = createElement(currentView);
    node.appendChild(rootNode);
    
    function dispatch(msg) {
        console.log('Dispatch message: ', msg);
        model = update(msg, model);
        const updatedView = view(dispatch, model);
        const patches = diff(currentView, updatedView);
        rootNode = patch(rootNode, patches);
        currentView = updatedView;
    }
}

export default app;