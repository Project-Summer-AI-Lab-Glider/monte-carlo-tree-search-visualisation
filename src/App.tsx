import './App.css';
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { Provider } from 'react-redux';
import { appReducer } from './state/appReducer';
import React, { useState } from 'react';
import { setSyntheticLeadingComments } from 'typescript';


const composedEnhancer = composeWithDevTools(
  compose(applyMiddleware(thunkMiddleware))
);

export const appStore = createStore(appReducer, composedEnhancer);


function App() {
  return (
    <Provider store={appStore}>
      <Timer
        date={new Date()} 
      />
    </Provider>
  );

}


type Test = "test" | "not--test";

interface TimerProps {
  classname?: string;
  date: Date;
} 

function classNameFoo(foo: string) {

};

function Timer(props: TimerProps ) {
  

  const [time, setTime] = useState(0);
  debugger;
  const {
    classname
  } = props;

  if (!!classname) {
    classNameFoo(classname);
  }

  setTimeout(() => {
    setTime(prev => prev + 1);
  }, 10000)

  return <div className={classname}>
    {time}
  </div>
}


export default App;
