import AdminDashboard from "./AdminDashboard";
//import Supplychain from "../../Helper";
import { useEffect, useState } from "react";
import ManufacturerDashboard from "./ManufacturerDashboard";
import DistributorDashboard from "./DistributorDashboard";
import WholesalerDashboard from "./WholesalerDashboard";
import PharmacyDashboard from "./PharmacyDashboard";
import Contract,{abi,address} from '../../helper';
import web3 from '../../web3';
export default function Dashboard() {
    const currentUser = localStorage.getItem("currentUser");
    //const [uaddress, setUaddress] = useState(localStorage.getItem('uaddress') || window.ethereum.selectedAddress);
    const [role, setRole] = useState('');

    const localhost= "http://localhost:3000/api/";
    async function getUserRole() {
        console.log(currentUser);
       // const address = uaddress ? uaddress : window.ethereum.selectedAddress;
      /*   await Supplychain.methods.userRole(currentUser).call().then(result => {
            setRole(result);
        }); */
      let accounts = await web3.eth.getAccounts();
      let a= accounts[0];
        const role = await Contract.methods.userRole(a).call();
        
        setRole(role);
            
       
        
        
        
    }

    useEffect(() => {
        try {
          //  setUaddress(window.ethereum.selectedAddress)
          getUserRole();
          //setRole('Admin');
          
          
            console.log(role);
           // console.log(role);
        } catch (error) {
            throw error;
        }
    }, [])

    return (<div>{role && ((role.toUpperCase() === 'ADMIN' && <AdminDashboard />)
        || (role.toUpperCase() === 'MANUFACTURER' && <ManufacturerDashboard />)
        ||  <DistributorDashboard />)
       /*  || (role.toUpperCase() === 'WHOLESALER' && <WholesalerDashboard />)
         || (role.toUpperCase() === 'PHARMACY' && <PharmacyDashboard />) */ }</div>)
}
