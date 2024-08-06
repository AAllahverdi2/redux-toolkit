import React from 'react'
import ROUTES from './index.routes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './REDUX/store'
const router=createBrowserRouter(ROUTES)
const App = () => {
  return (
    <div>
      <Provider store={store}>

        <RouterProvider router={router}/>

      </Provider>
      
    </div>
  )
}

export default App
