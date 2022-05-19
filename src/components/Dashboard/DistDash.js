import React from "react";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Profile from "../subComponents/Profile";
//import Supplychain from '../../Helper';
import ShipModel from "../subComponents/DistributorShipModel";
import Toast from "../subComponents/Toast";


export default function DistDash()
{
    const currentUser = localStorage.getItem("currentUser");
    // const [userAddress, setUserAddress] = useState(address);
     const [userList, setUserList] = useState([]);
     const [drugList, setDrugList] = useState([]);
     const [drugDetList, setDrugDetList] = useState([]);
     const [isOverview, setIsOverview] = useState(true);
     const [allDrug, setAllDrug] = useState([]);
     const [drugInfoList, setDrugInfoList] = useState([]);
     const [allProducts, setAllProducts] = useState([]);
     const [filterbyName, setFilterbyName] = useState([]);
     const [selectedDrugDetails, SetSelectedDrugDetails] = useState([]);
     const [isToastActive, setIsToastActive] = useState(false);
     const [message, setMessage] = useState('');
     const [messageType, setMessageType] = useState('success');
     const [shipmentStatus,setShipmentStatus] = useState([]);
     const [ManStatus,setManStatus]= useState('');
     const[ distStatus, setDistStatus] = useState('');
     const [wholeSalerStatus, setWholesalerStaus] = useState('');
     const[pharmacyStatus, setPharmacyStaus]= useState('');
    async function drugInfo() {
        setDrugList([]);
        setAllDrug([]);

        setDrugDetList([]);
        try {
            await fetch(localhost+"getDrugKeyList").then((data) => 
              
              data.json()
            )
            .then((data)=>{
                B(data);
                console.log(data);
            })
            
           
                       
        
        }
        catch (error) {
            throw error
        }
     /*    try {
            await Supplychain.methods.getDrugKeyList().call().then(data => {
                if (data) {
                    setDrugList(data);
                    data.map(drug => {
                        Supplychain.methods.BatchDrugDetails(drug).call().then(result => {
                            setAllDrug(oldDta => [...oldDta, { serialNumber: drug, name: result.DrugName, batchId: result.BatchID, nextOwner: result.NextOwner, status: result.IsBad, location: result.Currentlocation, drugId: result.DrugID }])
                        })
                        Supplychain.methods.BatchManufactureringDetails(drug).call().then(res =>{
                            setShipmentStatus(oldDta => [...oldDta, { serialNumber: drug,shipment: res.DrugStatus === 'Shipped' ? false : true}])
                        })
                    })

                }
            });
        } */
        
    }


    async function B(data)
    {
        
            console.log(data);
            setDrugList(data);
            setAllDrug([]);
            data.map(drug => {
               
                 fetch(localhost+"getDrugDetails/"+drug).then((result)=>result.json())
                .then((result) => {
                    console.log(result);
                    setAllDrug(oldDta => [...oldDta, { serialNumber: drug, name: result.DrugName, batchId: result.BatchID, status: result.IsBad, location: result.Currentlocation, drugId: result.DrugID, shipmentStatus: result.Status, idealTemp: result.MaxTemperature,currentTemp:result.CurrentTemperature,manufactureDate:result.MfgTimeStamp,expiryDate:result.ExpTimeStamp,owner:result.CurrentproductOwner, nextOwner:result.NextOwner,Status:result.Status}]); 
                    setDrugDetList(oldDta => [...oldDta, { serialNumber: drug, name: result.DrugName, batchId: result.BatchID, status: result.IsBad, location: result.Currentlocation, drugId: result.DrugID, shipmentStatus: result.Status, idealTemp: result.MaxTemperature,currentTemp:result.CurrentTemperature,manufactureDate:result.MfgTimeStamp,expiryDate:result.ExpTimeStamp,owner:result.CurrentproductOwner,nextOwner:result.NextOwner,Status:result.Status}]) ;
                })
                
                fetch(localhost+"DistributorDetails/"+drug).then((res)=>res.json())
                .then((res)=>{
                    setShipmentStatus(oldDta => [...oldDta, { serialNumber: drug,shipment: res.DrugStatus === 'Shipped' ? true : "Manufactured"}])
                })
                /*  Supplychain.methods.BatchManufactureringDetails(drug).call().then(res =>{
                    setShipmentStatus(oldDta => [...oldDta, { serialNumber: drug,shipment: res.DrugStatus === 'Shipped' ? false : true}])
                }) */
            })
    
        
    }


    return(


        <>
        <Header />
        <section class="breadcrumb-section">
            <div class="container-fluid">
                <div class="row breadcrumb-content py-2">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
                        </ol>
                    </nav>
                </div>

            </div>
        </section>
        <main id="main">

            <section class="page-title mt-3 mx-4">
                <div class="container-fluid">
                    <div class="row ">
                        <h2 class="title mb-1 p-0 pb-3 helvetica-mediumv fw-bold main-color">Dashboard</h2>
                    </div>
                </div>
            </section>
            <Profile  />
          {/*   <section class="profile-section mt-3 mx-4">
                <div class="container-fluid">
                    <div class="row">
                        <div class="profile-content d-flex flex-wrap bg-white p-4  rounded">
                            <div class="profile-img me-4">
                                <img class="img-fluid rounded-pill h-auto" alt="profile Image" src="./images/default-profile-img.jpg" width="100px" />
                            </div>
                            <div class="profile-details d-flex align-items-center flex-wrap mt-3">
                                <div class="personal me-5">
                                    <div class="name d-flex ">
                                        <h6 class="fw-bold me-3">Name</h6>
                                        <p>Ellie McClure</p>
                                    </div>
                                    <div class="role d-flex ">
                                        <h6 class="fw-bold me-3">Role</h6>
                                        <p>Distributor</p>
                                    </div>
                                </div>
                                <div class="contact ms-md-5 me-3">
                                    <div class="contact d-flex">
                                        <h6 class="fw-bold me-3">Contact No.</h6>
                                        <p>+91 8129204925</p>
                                    </div>
                                    <div class="email d-flex">
                                        <h6 class="fw-bold me-3">Email ID</h6>
                                        <p>ellie.mcclure@mail.com</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </section> */}



            <section class="products table-section mt-4 mx-4">
                <div class="container-fluid">
                    <div class="row">
                        <div class="table-block bg-white p-4 mb-5 rounded">

                            <div class="block-header d-flex justify-content-between">
                                <h5 class="text-uppercase helvetica-medium fw-bold main-color">PRODUCTS</h5>
                                <div class="search-block d-flex d-none">
                                   {/*  <button class="btn btn-primary me-3" type="button" data-bs-toggle="modal" data-bs-target="#add-participant">
                                        Add Participant
                                    </button> */}
                                    <form class="d-flex">
                                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                        <button class="btn btn-outline-primary" type="submit">Search</button>
                                    </form>
                                </div>
                            </div>

                            <div className="table-buttons mt-3">
                                <div className="btn-group text-uppercase" role="group" aria-label="table buttons">
                                    <button type="button" className={`btn btn-outline-primary ${isOverview ? 'active' : ''}`} onClick={() => { setIsOverview(true); drugInfo() }}>OVERVIEW</button>
                                    <button type="button" className={`btn btn-outline-primary ${!isOverview ? 'active' : ''}`} onClick={() => { setIsOverview(false); drugInfo() }}>TRACKING</button>
                                </div>
                            </div>

                            <div class="block-filters mt-4 d-flex justify-content-between flex-wrap">
                                <div class="filters-list d-flex">
                                    <div class="filter me-3">
                                        <h6 class="sub-color">Product Name</h6>
                                        <select class="form-select main-color helvetica-light" aria-label="Product Name option" onChange={(e) => filterByParam(e.target.value, 'name')}>
                                            
                                            <option defaultValue>All</option>
                                            {allDrug.map((product, index) => {
                                                return (
                                                    <option value={product.name}>   {product.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div class="filter me-3">
                                        <h6 class="sub-color">Product Status</h6>
                                        <select class="form-select main-color helvetica-light" aria-label="Product Status option" onChange={(e)=>{filterByParam(e.target.value,'status')}}>
                                            <option selected>All</option>
                                            <option value="true">Active</option>
                                            <option value="false">Inactive</option>
                                        </select>
                                    </div>
                                    <div class="filter me-3">
                                        <h6 class="sub-color">Present Location</h6>
                                        <select class="form-select main-color helvetica-light" aria-label="Present Location option" onChange={(e)=>{filterByParam(e.target.value,'location')}}>
                                            <option selected>All</option>
                                            <option value="Distributor">Distributor</option>
                                            <option value="Manufacturer">Manufacturer</option>
                                            <option value="Pharmacy">Pharmacy</option>
                                            <option value="Wholesaler">Wholesaler</option>
                                           
                                        </select>
                                    </div>
                                    <div class="filter me-3">
                                        <h6 class="sub-color">Shipment Status</h6>
                                        <select class="form-select main-color helvetica-light" aria-label="Product Status option" onChange={(e)=>{filterByParam(e.target.value,'shipmentstatus')}}>
                                            <option selected>All</option>
                                            <option value="Received">Received</option>
                                            <option value="Manufactured">Manufactured</option>
                                            <option value="Shipped">Shipped</option>
                                        </select>
                                    </div>


                                </div>
                                <div class="search-block mt-2 align-self-end">
                                    <form class="d-flex">
                                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>doSearch(e.target.value)}/>
                                       
                                    </form>
                                </div>
                            </div>

                            <div class="table-container mt-4">
                                <div class="table-responsive">
                                    <table class="table align-middle">
                                        <thead>
                                            <tr class="text-capitalize">
                                                <th scope="col">Serial No.</th>
                                                <th scope="col" class="sorting desc">Product Name</th>
                                                <th scope="col">Batch ID</th>
                                                <th scope="col" class="sorting asc">Product Status</th>
                                                {isOverview && <th scope="col" className="sorting asc" >Present Location</th>}
                                                {isOverview && <th scope="col" className="sorting asc">Shipment Status</th>}
                                                {!isOverview && <th scope="col">Manufacturer</th>}
                                                {!isOverview && <th scope="col">Distributor</th>}
                                                {!isOverview && <th scope="col">Wholesaler</th>}
                                                {!isOverview && <th scope="col">Pharmacy</th>}
                                                <th scope="col">Action</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {drugDetList.map((drug, index) => {
                                                return (
                                                    <tr key={index}>
                                                        {getDrugJourney(drug.serialNumber)}
                                                        <td>{drug.serialNumber}</td>
                                                        <td>{drug.name}</td>
                                                        <td>{drug.batchId}</td>
                                                        <td>{drug.status ? 'Inactive' : 'Active'}</td>
                                                        {isOverview && <td><span className={drug.location.toLowerCase()}>{drug.location}</span></td>}
                                                        {isOverview && <td>{drug.shipmentStatus}</td>}
                                                        {!isOverview && <td><span className={drug.shipmentStatus ==="Manufactured" ? "processing" : "complete"}>{ManStatus==="Shipped" ? "Complete" :"Processing"}</span></td>}
                                                        {!isOverview && <td><span className={distStatus==="" || distStatus==="Recieved" ? "processing" : "complete"}>{distStatus===""?"Waiting":distStatus==="Shipped"?"Complete":"Received"}</span></td>}
                                                        {!isOverview && <td><span className={ wholeSalerStatus===""|| wholeSalerStatus==="Received"? "processing" : "complete"}>{wholeSalerStatus===""?"Waiting":wholeSalerStatus==="Shipped"?"Complete":"Received"}</span></td>}
                                                        {!isOverview && <td><span className={pharmacyStatus===""? "processing" : "complete"}>{pharmacyStatus==="" ? "Waiting" : "Received"}</span></td>}
                                                        <td><a href={`/shipment-progress?id=${drug.serialNumber}`} type="button" className="btn btn-outline-primary" >Details</a></td>
                                                        {drug.Status==='Shipped'&&drug.nextOwner===currentUser && <td><a href="#" data-bs-toggle="modal" data-bs-target="#receive-product" type="button" className="btn btn-outline-primary" onClick={() => selectedDetails(drug,"From Receeive")}>Receive</a></td>}
                                                       
                                                       
                                                        {drug.Status==='Received'&&drug.nextOwner==="" && drug.owner===currentUser && <td><a href="#" data-bs-toggle="modal" data-bs-target="#shipped-product" type="button" className="btn btn-outline-primary" onClick={() => selectedDetails(drug,"From Ship")}>Ship</a></td>}
                                                       </tr>
                                                );
                                            })}

                                        {/*     <tr>
                                                <td>710283</td>
                                                <td>Product 1</td>
                                                <td>101674</td>
                                                <td>Active</td>
                                                <td><span class="pharmacy">Pharmacy</span></td>
                                                <td>Received</td>
                                                <td><a href="#" type="button" class="btn btn-outline-primary" >Details</a></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>192830</td>
                                                <td>Product 2</td>
                                                <td>820458</td>
                                                <td>Active</td>
                                                <td><span class="manufacturer">Manufacturer</span></td>
                                                <td>Manufactured</td>
                                                <td><a href="#" type="button" class="btn btn-outline-primary" >Details</a></td>
                                                <td><a href="#" type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#shipped-product" >Ship</a></td>
                                            </tr>
                                            <tr>
                                                <td>812047</td>
                                                <td>Product 3</td>
                                                <td>812047</td>
                                                <td>Active</td>
                                                <td><span class="distributor">Distributor</span></td>
                                                <td>Received</td>
                                                <td><a href="#" type="button" class="btn btn-outline-primary" >Details</a></td>
                                                <td><a href="#" type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#receive-product">Receive</a></td>
                                            </tr>
                                            <tr>
                                                <td>719284</td>
                                                <td>Product 4</td>
                                                <td>748294</td>
                                                <td>Active</td>
                                                <td><span class="wholesaler">Wholesaler</span></td>
                                                <td>Received</td>
                                                <td><a href="#" type="button" class="btn btn-outline-primary" >Details</a></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>732048</td>
                                                <td>Product 5</td>
                                                <td>193028</td>
                                                <td>Inactive</td>
                                                <td><span class="">NA</span></td>
                                                <td>NA</td>
                                                <td><a href="#" type="button" class="btn btn-outline-primary disabled" >Details</a></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>748294</td>
                                                <td>Product 6</td>
                                                <td>719284</td>
                                                <td>Active</td>
                                                <td><span class="manufacturer">Manufacturer</span></td>
                                                <td>Manufactured</td>
                                                <td><a href="#" type="button" class="btn btn-outline-primary" >Details</a></td>
                                                <td><a href="#" type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#shipped-product" >Ship</a></td>
                                            </tr> */}

                                        </tbody>

                                    </table>
                                    <div class=" table-footer d-flex  justify-content-between align-items-baseline">
                                        <div class="total_items text-muted">Total Items: {drugList.length}</div>
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
           

            <div className="model-section">
             <ReceiveModel id="receive-product" selectedDrugDetails={selectedDrugDetails} updateReceiving={updateReceiving} />
             </div>
        
            <div className="model-section">
                <ShipModel id="shipped-product" selectedDrugDetails={selectedDrugDetails} updateShipment={updateShipment} />
            </div>
            {isToastActive && <Toast message={message} type={messageType} />}

        </main>


    </>
    )
}