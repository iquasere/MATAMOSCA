
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// change the backgound color
document.body.classList.add('bg-dark');
document.getElementById('root').classList.add('bg-white')

// The magic starts to happen
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
