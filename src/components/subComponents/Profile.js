import { useEffect, useState } from "react";
//import Supplychain from '../../Helper';
import Contract,{abi,address} from '../../helper';
import web3 from '../../web3';
export default function Profile() {
    const [details, setDetails] = useState(null);
    const [Role, setRole] = useState('');
    const [name, setName] = useState('');
    const [ contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const currentUser = localStorage.getItem("currentUser");
    console.log(currentUser);
   // var Role;
    const localhost = "http://localhost:3000/api/";

    async function fillDetails()
    {

        const a = await web3.eth.getAccounts();
        const addr = a[0];
        let R =  await Contract.methods.userRole(addr).call();
       
        setRole(R);
        let UserDetails = await Contract.methods.BatchUserDetails(addr).call();
        console.log(UserDetails);
        setName(UserDetails.Name);
        setEmail(UserDetails.Email);
        setContact(UserDetails.ContactNo)

        return UserDetails;
    }
    useEffect(() => {
        let UserDetails=fillDetails();
        console.log("+++++++++++++++++++++");
    //    console.log(UserDetails);
       
        //Updated Contract Calls
      
        /*   try {

            
                Supplychain.methods.BatchUserDetails(currentUser).call().then(result => {
                    setDetails({ name: result.Name, email: result.Email, contact: result.ContactNo, role: result.Role });
                })
            } catch (error) {
                throw error
            } */
    }, []);

    return (
      <section class="profile-section mt-4 mx-4">
        <div class="container-fluid">
          <div class="row">
            <div class="profile-content d-flex flex-wrap bg-white px-4 py-3  rounded">
              <div class="profile-img me-4">
                <img
                  class="img-fluid rounded-pill h-auto"
                  alt="profile Image"
                  src="./images/default-profile-img.jpg"
                  width="100px"
                />
              </div>{" "}
              <div className="profile-details d-flex align-items-center flex-wrap mt-3">
                <div className="personal me-5">
                  <div className="name d-flex ">
                    <h6 className="fw-bold me-3"> Name </h6>{" "}
                    <p> {name} </p>{" "}
                  </div>
                  <div className="role d-flex ">
                    <h6 className="fw-bold me-3"> Role </h6>{" "}
                    <p> {Role} </p>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="contact ms-md-5 me-3">
                  <div className="contact d-flex">
                    <h6 className="fw-bold me-3"> Contact No. </h6>{" "}
                    <p> {contact} </p>{" "}
                  </div>{" "}
                  <div className="email d-flex">
                    <h6 className="fw-bold me-3"> Email ID </h6>{" "}
                    <p> {email} </p>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>
    );
}