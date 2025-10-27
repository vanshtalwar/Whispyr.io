import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from "axios";

import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById('root')

if (container) {
  const root = createRoot(container)


  // ✅ Set backend base URL (your Express server)
  axios.defaults.baseURL = "http://localhost:5000/api";

  // ✅ Allow cookies / auth headers to be sent
  axios.defaults.withCredentials = true;

  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}