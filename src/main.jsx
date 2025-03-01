import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { 
  BrowserRouter, 
  Routes, 
  Route 
} from 'react-router'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'
import store from './stores/store'

let persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App/>}/>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
