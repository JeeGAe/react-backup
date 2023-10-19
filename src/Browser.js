import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import App from './App.js'

function Browser () {
    return (
    <CookiesProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </CookiesProvider>

    )
}

export default Browser