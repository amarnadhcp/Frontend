import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Store, persistor } from './Redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google'


import './index.css'
// const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID
// console.log(client_id,"client iddd here");
import {QueryClient,QueryClientProvider,useQuery,} from '@tanstack/react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId="575796366982-0mpqsgg48ia6m7ak4tup1ikq7drf6c9v.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
          <App/>
          </QueryClientProvider>
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
 
)
