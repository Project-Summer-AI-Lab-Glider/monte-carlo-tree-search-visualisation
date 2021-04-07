import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { AlgorithmVisualiationWindow, CodeEditor, Console, DockLayout } from "./components";
import { appReducer } from "./state/appReducer";

const composedEnhancer = composeWithDevTools(compose(applyMiddleware(thunkMiddleware)));

export const appStore = createStore(appReducer, composedEnhancer);

function App(): JSX.Element {
  return (
    <Provider store={appStore}>
      <DockLayout>
        <AlgorithmVisualiationWindow />
        <CodeEditor />
        <Console />
      </DockLayout>
    </Provider>
  );
}

export default App;
