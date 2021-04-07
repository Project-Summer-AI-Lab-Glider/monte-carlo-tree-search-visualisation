import './App.css';
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { Provider } from 'react-redux';
import { appReducer } from './state/appReducer';
import React, { useState } from 'react';
import { setSyntheticLeadingComments } from 'typescript';

import { Button } from '@material-ui/core';
import { Toolbar } from './Components/Toolbar';
import { Spacer } from './Components/Toolbar'


const composedEnhancer = composeWithDevTools(
  compose(applyMiddleware(thunkMiddleware))
);

export const appStore = createStore(appReducer, composedEnhancer);


function App() {
  return (
    <Provider store={appStore}>
      <Toolbar>
        <Button>
          gyiu
        </Button>
        <Button>
          yhivnofmk
        </Button>
        <Spacer></Spacer>
        <Button>
          44
        </Button>
      </Toolbar>
    </Provider>
  );

}



export default App;
