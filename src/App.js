
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import { useState, createContext } from 'react';
import Register from './components/Register/Register';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const contextAPI = createContext();

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    img: ''
  })

  // const signInGoogle = () => {
  //   googleSignIn()
  //     .then(res => {
  //       const { displayName, email, photoURL } = res;
  //       const signedIn = {
  //         isSignedIn: true,
  //         name: displayName,
  //         email: email,
  //         img: photoURL
  //       }
  //       setUser(signedIn);
  //     });
  // }

  return (
    <contextAPI.Provider value={[user, setUser]}>
      <Router>
        <Switch>

          <Route exact path='/'>
            <Home></Home>
          </Route>

          <Route path='/login'>
            <Login></Login>
          </Route>

          <Route path='/register'>
            <Register></Register>
          </Route>

          <PrivateRoute path='/destination/:riderName'>
            <Profile></Profile>
          </PrivateRoute>

          <PrivateRoute path='/destination'>
            <Profile ></Profile>
          </PrivateRoute>

        </Switch>
      </Router>
    </contextAPI.Provider>
  );
}

export default App;
