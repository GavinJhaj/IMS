import React from 'react'
import './assets/styles/bootstrap.custom.css'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import {HelmetProvider} from 'react-helmet-async'
import App from './App'
import './index.css'
import HomeScreen from './screens/HomeScreen'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/admin/UserListScreen'
import UserEditScreen from './screens/admin/UserEditScreen'
import ContactUs from './screens/ContactUs'
import MessageScreen from './screens/admin/MessageScreen'
import MainScreen from './screens/MainScreen'
import ResetScreen from './screens/ResetScreen'
import SetpassScreen from './screens/SetpassScreen'
import MessageListScreen from './screens/admin/MessageListScreen'
import PlayerScreen from './screens/PlayerScreen'
import PlayerListScreen from './screens/admin/PlayerListScreen'
import InjuryEditScreen from './screens/admin/InjuryEditScreen'


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route index={true} path="/" element={<HomeScreen/>} />
      <Route path='/search/:keyword' element={<HomeScreen/>} />
      <Route path='/page/:pageNumber' element={<HomeScreen/>} />
      <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen/>} />
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/register' element={<RegisterScreen/>}/>
      <Route path='/contactus' element={<ContactUs/>}/>
      <Route path='/reset' element={<ResetScreen/>}/>
      <Route path='/reset/:token' element={<SetpassScreen/>}/>
      
     


      <Route path='' element={<PrivateRoute/>}>
      {/* <Route path='/product/:id' element={<PlayerScreen/>}/> */}
      <Route path='/player/:id' element={<PlayerScreen/>}/>
      <Route path='/profile' element={<ProfileScreen/>}/>
      <Route path='/dashboard' element={<MainScreen/>}/>
      </Route>

      
      <Route path='' element={<AdminRoute/>}>
      {/* <Route path='/admin/orderlist' element={<MessageListScreen/>}/> */}
      <Route path='/admin/messagelist' element={<MessageListScreen/>}/>
      <Route path='/admin/message/:id' element={<MessageScreen/>}/>
      <Route path='/admin/productlist' element={<PlayerListScreen/>}/>
      <Route path='/admin/productlist/:pageNumber' element={<PlayerListScreen/>}/>
      <Route path='/admin/product/:id/edit' element={<InjuryEditScreen/>}/>
      <Route path='/admin/userlist' element={<UserListScreen/>}/>
      <Route path='/admin/user/:id/edit' element={<UserEditScreen/>}/>
      <Route path='/dashboard' element={<MainScreen/>}/>
      </Route>

    </Route>
    
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>

    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
    
    </HelmetProvider>
  </React.StrictMode>,
)
