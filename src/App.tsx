import './App.css';
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { Provider } from 'react-redux';
import { appReducer } from './state/appReducer';


const composedEnhancer = composeWithDevTools(
  compose(applyMiddleware(thunkMiddleware))
);

export const appStore = createStore(appReducer, composedEnhancer);


function App() {
  return (
    <Provider store={appStore}>
      <div>
        App
      </div>
    </Provider>
  );
}

export default App;
