
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
import { googleSignIn } from './components/Firebase/FirebaseLoginRegister';

export const contextAPI = createContext();

function App() {
  const [user , setUser] = useState({
    isSignedIn: false,
    name:'',
    email: '',
    img: ''
  })

  const signInGoogle = () => {
    googleSignIn()
    .then(res => {
      const { displayName, email, photoURL } = res;
      const signedIn = {
        isSignedIn: true,
        name: displayName,
        email: email,
        img: photoURL
      }
      setUser(signedIn);
    });
  }

  return (
    <contextAPI.Provider value={[user , setUser]}>
      <Router>
        <Switch>

          <Route exact path='/'>
            <Home></Home>
          </Route>

          <Route path='/login'>
            <Login signInGoogle={signInGoogle}></Login>
          </Route>

          <Route path='/register'>
            <Register signInGoogle={signInGoogle}></Register>
          </Route>

          <Route path='/:riderName'>
            <Profile></Profile>
          </Route>

        </Switch>
      </Router>
    </contextAPI.Provider>
  );
}

export default App;
