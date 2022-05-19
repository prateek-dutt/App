import { useEffect, useState } from "react";
//import Supplychain from '../../Helper';
import $ from 'jquery';
export default function AddParticipant(props) {

    console.log(props);
    const { title, type,    selectedUser } = props;
    console.log(selectedUser);
    const currentUser = localStorage.getItem("currentUser") || 'Admin';
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [contactNo, setcontactNo] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    //const [metaAddress, setMetaAddress] = useState('');
    const [status, setStatus] = useState(true);
    //const ethereum = window.ethereum;
   // const [address, setAddress] = useState(ethereum.selectedAddress)
    const localhost="http://localhost:3000/api/";
    //console.log(props);
    useEffect(() => {
       
        
        if (selectedUser) {
            setName(selectedUser.name)
            console.log(selectedUser.name);
            setUserName(selectedUser.userName);
            setEmail(selectedUser.email);
           // setMetaAddress(selectedUser.userAddress);
            setPassword(selectedUser.password);
        
            setcontactNo(selectedUser.contact)
            setRole(selectedUser.role);
            setStatus(selectedUser.status === 'Active' ? true : false);
            console.log('------------------------------------'+selectedUser.status);
        }
    }, [props, selectedUser])
  //  console.log(name+userName+password+contactNo+email+role);

    
  //This  will set the value of all form fields empty.
  function resetFields() {
        setName('');
        setUserName('');
        setEmail('');
        setPassword('');
        setcontactNo('')
        setRole('');
        setStatus(true);
        $("#status").prop('checked',true);
    }
async function createParticipant() {
     /*    try {
            Supplychain.methods.setUser(currentUser, name, parseInt(contactNo), userName, password, email, role).send({ from: window.ethereum.selectedAddress }).then(res => {
                props.saveParticipant('success', 'Participant added successfully.');
                resetFields();
            })
        } catch (error) {
            props.saveParticipant('failed', 'Something went wrong. Please check the values you have entered and try again');
            throw error
        } */
        console.log("This is the create method, do we have password"+password);

        try{
            //console.log(name);
            let user={
              
                    "CurrentUser":"Admin",
                    "Name":name,
                    "Phone":contactNo,
                    "UserName":userName,
                    "Password":password,
                    "Email":email,
                    "Role":role,
                    "IsActive":status
                
            };
            console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
            console.log(user);
            await fetch(localhost+"AddUser",{
                method:"POST",
                body:JSON.stringify(user),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }

            }).then((res)=>{
                if(res.status==200)
                {

                    props.saveParticipant('Success',"Participant Added Successfully");
                    resetFields();
                }
                else{
                    props.saveParticipant("Failed","Something went wrong. Please check the values you have entered and try again");
                    resetFields();

                }
            }

            )

        }
        catch(Error)
        {
            throw Error;
        }
    }
    function updateParticipant() {
       console.log("The update function is running");
     //  console.log(password);
        try{
            let user={
                "CurrentUser":"Admin",
                "Name":name,
                "Phone":contactNo,
                "UserName":userName,
                "Password":userName,
                "Email":email,
                "Role":role,
                "IsActive":status
            };
            console.log(user);
             fetch(localhost+"UpdateUser",{
                method:"POST",
                body:JSON.stringify(user),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then((res)=>{
                console.log(res);
                if(res.status==200){
                  //  console.log("Hitting The Swagger End Point"+res);
                props.saveParticipant('success', 'Participant updated successfully.');
                resetFields();
                }
                else{
                    props.saveParticipant("Failed","Something went wrong. Please check the values you have entered and try again");
                }
           });
        }
        catch(Error)
        {
            
            throw Error;
        }
    
    /*     
    
    try {
            Supplychain.methods.setUser(currentUser, name, parseInt(contactNo), userName, password, email, role).send({ from: window.ethereum.selectedAddress }).then(res => {
                props.saveParticipant('success', 'Participant updated successfully.');
                
                
            })
        } catch (error) {
            props.saveParticipant('failed', 'Something went wrong. Please check the values you have entered and try again');
            throw error
        } */
    }

    const saveParticipant = (event) => {
        event.preventDefault();
        if (type === 'update') {
            console.log(name);
            updateParticipant();
        } else {
            console.log("This is the condition");
            createParticipant();
        }
    }

    return (
        <div>
            <div className="modal fade" id="add-participant" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modal-title" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content p-3">
                        <div className="modal-header">
                            <h4 className="modal-title helvetica-medium main-color fw-bold" id="modal-title">{title}</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className=" g-3 helvetica-light sub-color">
                                <div className="row mb-2">
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="name" className="form-label">Participant Name</label>
                                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="user-name" className="form-label">User Name</label>
                                        <input type="text" className="form-control" id="user-name" value={userName} onChange={(e) => setUserName(e.target.value)} />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>

                                </div>
                              
                                <div className="row mb-2">
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="contact-number" className="form-label">Contact Number</label>
                                        <input type="text" className="form-control" id="contact-number" value={contactNo} onChange={(e) => setcontactNo(e.target.value)} />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="email-id" className="form-label">Email ID</label>
                                        <input type="email" className="form-control" id="email-id" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="role" className="form-label">Role</label>
                                        <select id="role" className="form-select text-muted" value={role} onChange={(e) => setRole(e.target.value)}>
                                            <option defaultValue={role ? false : true}>Select</option>
                                            <option value="Distributor">Distributor</option>
                                            <option value="Manufacturer">Manufacturer</option>
                                            <option value="Pharmacy">Pharmacy</option>
                                            <option value="Wholesaler">Wholesaler</option>
                                        </select>
                                    </div>
                                    <div className="col-12 col-md-6 d-flex align-items-end mt-3">
                                        <div className="form-check status-check form-switch d-flex justify-content-between ps-0">
                                            <label className="form-check-label" htmlFor="status">Participant Status</label>
                                            <input className="form-check-input" type="checkbox" id="status" defaultChecked onChange={(e) =>{setStatus(!status); }} />
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="row mb-2">
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="metamask" className="form-label">MetaMask Address</label>
                                        <input type="text" className="form-control" id="metamask" readOnly={type === 'update' ? true : false} value={metaAddress} onChange={(e) => setMetaAddress(e.target.value)} />
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="image" className="form-label">Profile Image</label>
                                        <input type="file" className="fileupload" id="image" />
                                    </div>
                                </div> */}
                                <div className="row mb-2">
                                    <div className="col-12 text-end">
                                        <button className="btn btn-primary" type="submit" data-bs-dismiss="modal" onClick={(e) => saveParticipant(e)}>Save</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
