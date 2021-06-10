import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore } from "redux";
import { reducer } from "./reducer";
import {Provider} from "react-redux";

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App props={store}/>
  </Provider>,
  document.getElementById('root')
);

