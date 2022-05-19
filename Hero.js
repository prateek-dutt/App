    import { useEffect, useState } from "react";
    import Header from "../Header/Header";
    import AddParticipant from "../subComponents/AddParticipant";
    import Toast from "../subComponents/Toast";
    //mport Supplychain from '../../Helper';
    import { isCursorAtEnd } from "@testing-library/user-event/dist/utils";
    console.log('Hello');
    
    export default function AdminDashboard(){
        const [isToastActive, setIsToastActive] = useState(false);
        const [isAdd, setIsAdd] = useState(false);
        const [message, setMessage] = useState('');
        const [messageType, setMessageType] = useState('success');
        const [userList, setUserList] = useState([]);
        const [modelType, setModelType] = useState('');
        const [selectedUser, setSelectedUser] = useState(null);
        const [allUsers, setAllUsers] = useState([]);
        const [role,setRole]=useState('');
        const localhost="http://localhost:3000/api/";
        async function fetchUserAddress() {
            setUserList([]);
            setAllUsers([]);
    
            
             try {
                
                let R='';
                await fetch(localhost+"getUserList").then(res=>res.json())
                .then(res => {
                    res.map(user => {
                        
                        fetch(localhost+"UserDetails/"+user).then((result)=>result.json())
                        .then((result)=>{
                            fetch(localhost+"UserRole/"+result.Name).then((res)=>res.text())
                            .then((res)=>{
                                
                               if(res)
                               {
                                   R=res;
                                
                                
                               }
                               else{
                                R='Admin';
                               }
                               console.log(R)
                               setUserList(oldUserList => [...oldUserList, { name: result.Name, role: R, userName: result.UserName, password: result.password, email: result.Email, contact: result.ContactNo, status: result.IsActive ? 'Active' : 'Inactive', userAddress: result.uAddr }]);
                               setAllUsers(oldUserList => [...oldUserList, { name: result.Name, role: R, userName: result.UserName, password: result.password, email: result.Email, contact: result.ContactNo, status: result.IsActive ? 'Active' : 'Inactive', userAddress: result.uAddr }]);
                            })
                            console.log(R);
                            
                            
                            
                        })
                        //Supplychain.methods.BatchUserDetails(user).call().then(result => {
                           // setUserList(oldUserList => [...oldUserList, { name: result.Name, role: result.Role, userName: result.UserName, password: result.password, email: result.Email, contact: result.ContactNo, status: result.IsActive ? 'Active' : 'Inactive', userAddress: result.uAddr }]);
                            //setAllUsers(oldUserList => [...oldUserList, { name: result.Name, role: result.Role, userName: result.UserName, password: result.password, email: result.Email, contact: result.ContactNo, status: result.IsActive ? 'Active' : 'Inactive', userAddress: result.uAddr }]);
                        })
                    })
                }
                
             catch (error) {
                throw error
            } 
        }
         async function getUserRole(user) {
          //  console.log(currentUser);
           // const address = uaddress ? uaddress : window.ethereum.selectedAddress;
          /*   await Supplychain.methods.userRole(currentUser).call().then(result => {
                setRole(result);
            }); */
            let ret;
            console.log(user);
             await fetch(localhost+"UserRole/"+user).then((res)=>res.text())
            .then((res)=>{
    
                if(res){
                   
                   //console.log("Y"+res);
                   
                   ret=res; 
                   console.log(ret);               
                  // setRole(res);
                  
                   
    
                }
               
              
              
               
            })
                
            return ret;
            
        
        }
        useEffect(() => {
            console.log("Atleast Here");
            fetchUserAddress();
        }, [])
        const sendUpdateDetails = (user) => {
            setModelType('update');
            setSelectedUser(user);
        }
        
        const saveParticipant = (type, message) => {
            setIsToastActive(true);
            setMessageType(type);
            setMessage(message);
            setIsAdd(false);
            fetchUserAddress();
        }
        function filterByParam(filterValue, name = 'name') {
            filterValue === 'All' ? setUserList(allUsers) : setUserList(allUsers.filter(user => user[name] === filterValue));
        }
        return(
            <div>
            <Header />
            <section className="breadcrumb-section">
                <div className="container-fluid">
                    <div className="row breadcrumb-content py-2">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Participants</li>
                            </ol>
                        </nav>
                    </div>
    
                </div>
            </section>
            <main id="main">
            <!--page-title-->
            <section class="page-title mt-4 mx-4">
                <div class="container-fluid">
                    <div class="row ">
                        <h2 class="title mb-1 p-0 pb-3 helvetica-mediumv fw-bold main-color">Participants</h2>
                    </div>
                </div>
            </section>
            <!--Participants section-->
              <section class="participants mt-4 mx-4">
                <div class="container-fluid">
                    <div class="row">                    
                        <div class="table-block bg-white p-4 mb-5 rounded">
                              <!--table-block-header-->
                            <div class="block-header d-flex justify-content-between">
                                <h5 class="text-uppercase helvetica-medium fw-bold main-color">Participants</h5>
                                <div class="search-block d-flex">
                                    <button class="btn btn-primary me-3" type="button" data-bs-toggle="modal" data-bs-target="#add-participant">
                                        Add Participant
                                    </button>
                                    <form class="d-flex">
                                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                                        <button class="btn btn-outline-primary" type="submit">Search</button>
                                      </form>
                                </div>
                            </div>
                            <!--table-block-filter-->
                            <div class="block-filters mt-3 d-flex justify-content-between">
                                <div class="filters-list d-flex">
                                    <div class="filter me-3">
                                        <h6 class="sub-color">Name</h6>
                                        <select class="form-select main-color helvetica-light" aria-label="name selection option">
                                            <option selected>All</option>
                                            <option value="Dominic Boyer">Dominic Boyer</option>
                                            <option value="Jerel Mueller">Jerel Mueller</option>
                                            <option value="NedNolan">NedNolan</option>
                                          </select>
                                    </div>
                                    <div class="filter me-3">
                                        <h6 class="sub-color">Role</h6>
                                        <select class="form-select main-color helvetica-light" aria-label="Role selection option">
                                            <option selected>All</option>
                                            <option value="Distributor">Distributor</option>
                                            <option value="Manufacturer">Manufacturer</option>
                                            <option value="Pharmacy">Pharmacy</option>
                                            <option value="Wholesaler">Wholesaler</option>
                                          </select>
                                    </div>
                                    <div class="filter me-3">
                                        <h6 class="sub-color">Status</h6>
                                        <select class="form-select main-color helvetica-light" aria-label="Status selection option">
                                            <option selected>All</option>
                                            <option value="Dominic Boyer">Active</option>
                                            <option value="Jerel Mueller">Inactive</option>
                                        </select>
                                    </div>
    
                                </div>
                            </div>
                            <!--table-block-->
                            <div class="table-container mt-3">
                                <div class="table-responsive">
                                    <table class="table align-middle">
                                        <thead>
                                            <tr class="text-capitalize">
                                                <th scope="col" class="sorting asc">Name</th>
                                                <th scope="col" class="sorting asc">Role</th>
                                                <th scope="col">Contact Number</th>
                                                <th scope="col">Email ID</th>
                                                <th scope="col" class="sorting desc">Status</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Ned Nolan</td>
                                                <td><span class="manufacturer">Manufacturer</span></td>
                                                <td>+91 8129204925</td>
                                                <td>nednolan@mail.com</td>
                                                <td>Active</td>
                                                <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#update-participant">Update</button></td>
                                            </tr>
                                            <tr>
                                                <td>Ellie McClure</td>
                                                <td><span class="distributor">Distributor</span></td>
                                                <td>+91 9195426816</td>
                                                <td>ellie@mail.com</td>
                                                <td>Active</td>
                                                <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#update-participant">Update</button></td>
                                            </tr>
                                            <tr>
                                                <td>Jerel Mueller</td>
                                                <td><span class="wholesaler">Wholesaler</span></td>
                                                <td>+91 9813102450</td>
                                                <td>jerel.m@mail.com</td>
                                                <td>Active</td>
                                                <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#update-participant">Update</button></td>
                                            </tr>
                                            <tr>
                                                <td>Emmet Douglas</td>
                                                <td><span class="pharmacy">Pharmacy</span></td>
                                                <td>+91 9813102450</td>
                                                <td>emmet.douglas@mail.com</td>
                                                <td>Active</td>
                                                <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#update-participant">Update</button></td>
                                            </tr>
                                            <tr>
                                                <td>Maximo Windler</td>
                                                <td><span class="wholesaler">Wholesaler</span></td>
                                                <td>+91 9213625388</td>
                                                <td>maximowindler@mail.com</td>
                                                <td>Active</td>
                                                <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#update-participant">Update</button></td>
                                            </tr>
                                            <tr>
                                                <td>Dominic Boyer</td>
                                                <td><span class="distributor">Distributor</span></td>
                                                <td>+91 7102704691</td>
                                                <td>dominic.boyer@mail.com</td>
                                                <td>Inactive</td>
                                                <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#update-participant">Update</button></td>
                                            </tr>
                                        </tbody>
                                        
                                    </table>
                                    <div class=" table-footer d-flex  justify-content-between align-items-baseline">
                                        <div class="total_items text-muted">Total Items: 17</div>
                                        <div class="Tables_paginate d-flex me-2">
                                            <div class="table-count me-3">
                                                <label for="inputcount" class="form-label me-2 text-muted">Items per page:</label>
                                                    <select id="inputcount" class="form-select d-inline-block w-auto">
                                                        <option value="10" selected>10</option>
                                                        <option value="25">25</option>
                                                        <option value="50">50</option>
                                                        <option value="100">100</option>
                                                    </select> 
                                                
                                            </div>
                                            <div class="paginate-block ">
                                                <nav aria-label="Page navigation">
                                                    <ul class="pagination">
                                                      <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
                                                      <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                                      <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                      <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
              </section>
            <!--Participants section end-->
    
        </main>
        </div>
        )
    }
    