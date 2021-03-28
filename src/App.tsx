import './App.css';
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { Provider } from 'react-redux';
import { appReducer } from './state/appReducer';
import React, { useState } from 'react';
import { setSyntheticLeadingComments } from 'typescript';

import ExpandButtonComponent from './components/ExpandButtonComponent'
import ComponentToTestExpandButton from './components/ComponentToTestExpandButton';



const composedEnhancer = composeWithDevTools(
  compose(applyMiddleware(thunkMiddleware))
);

export const appStore = createStore(appReducer, composedEnhancer);


function App() {
  const componentToExpand = ComponentToTestExpandButton();

  return (
    <Provider store={appStore}>
      <ExpandButtonComponent componentToExpand = {componentToExpand} />
    </Provider>
  );

}

export default App;
