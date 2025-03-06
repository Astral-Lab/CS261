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
import { ReactFlowProvider } from '@xyflow/react'

let persistor = persistStore(store);

// disable in prod
//persistStore(store).purge()

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ReactFlowProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App/>}/>
          </Routes>
        </BrowserRouter>
      </ReactFlowProvider>
    </PersistGate>
  </Provider>,
)
