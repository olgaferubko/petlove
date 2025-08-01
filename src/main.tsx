import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import 'modern-normalize';
import { Toaster } from "react-hot-toast";
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(

    <Provider store={store}>
        <BrowserRouter>
        <App />
        <Toaster position="top-center" />
        </BrowserRouter>
    </Provider>
);