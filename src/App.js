import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import { BrowserRouter, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import AllProducts from './components/AllProducts';
import ShipmentTracking from './components/ShipmentTree';
import UserList from './components/subComponents/UserList';
import ShipmentTree from './components/ShipmentTree';

function App() {
  //const ethereum = window.ethereum;

 // const [address, setAddress] = useState(ethereum.selectedAddress)

  useEffect(()=> {
   // localStorage.setItem('uaddress',address || ethereum.selectedAddress);
  //   console.log(ethereum.selectedAddress)
  //   if (ethereum) {
  //     ethereum.on('accountChanged', function (accounts) {
  //       accounts && accounts.length > 0 && accounts[0] && setAddress(accounts[0]);
  //     })
  //   } else {
  //     alert("install metamask extension!!")
  //   }
  //   if(!ethereum.selectedAddress) {
  //     localStorage.setItem("isAuthenticated", false);
  //     window.location.pathname = "/login"
  //   }
  },[])
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="/all-products" component={AllProducts} />
        <ProtectedRoute exact path="/shipment-progress" component={ShipmentTree} />
        <ProtectedRoute exact path="/user-list" component={UserList} />
      </BrowserRouter>
    </div>
  );
}

export default App;
