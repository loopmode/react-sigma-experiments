import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

function render() {
    const App = require("./App").default;
    ReactDOM.render(<App />, document.getElementById("root"));
}

if (module.hot) {
    module.hot.accept("./App", render);
}

registerServiceWorker();
render();
