import { useEffect, useState } from "react";
import Header from "../Header/Header";
import ShipmentTree from "../ShipmentTree";
import Profile from "../subComponents/Profile";
//import Supplychain from '../../Helper';
import ShipModel from "../subComponents/ShipModel";
import Toast from "../subComponents/Toast";
import './styles/style.css';
import Tracking from "../subComponents/Tracking";
import Overview from "../subComponents/Overview";
export default function ManufacturerDashboard() {
    // const address = window.ethereum.selectedAddress;
    const currentUser = localStorage.getItem("currentUser");
    // const [userAddress, setUserAddress] = useState(address);
    const [userList, setUserList] = useState([]);
    const [drugList, setDrugList] = useState([]);
    const [drugDetList, setDrugDetList] = useState([]);
    //const [isOv, setIsOverview] = useState(true);
    const [allDrug, setAllDrug] = useState([]);
    const [drugInfoList, setDrugInfoList] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [filterbyName, setFilterbyName] = useState([]);
    const [selectedDrugDetails, SetSelectedDrugDetails] = useState([]);
    const [isToastActive, setIsToastActive] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success');
    const [shipmentStatus, setShipmentStatus] = useState([])
    const [isOverview, setIsOverview] = useState(true);
    const [ManStatus,setManStatus]= useState('');
    const[ distStatus, setDistStatus] = useState('');
    const [wholeSalerStatus, setWholesalerStaus] = useState('');
    const[pharmacyStatus, setPharmacyStaus]= useState('');
    const localhost = "http://localhost:3000/api/";
    const[drugDL, setDrugDL] = useState([]);
    const[distlist,setDistList] = useState([]);
    const[wholesalerlist,setWholeSalerList] = useState([]);
    const[pharmalist,setPharmaList] = useState([]);

    function getManDetails(drug)
    {
      manufacturerStatus(drug);
    
    }
    function getDistDetails(drug)
    {
        distributorStatus(drug);
    }
    function getWholesalerDetails(drug)
    {
        wholeDistStatus(drug);
    }
    function getPharmaDetails(drug)
    {
        pharmaStatus(drug);
    }
    async function DrugDet()
    {
       setDrugDL([]);
        //let ManDetials={};
        let DistDetails={};
        let WholesalerDetails={};
        let PharmaDetails={};

        try{
             fetch(localhost + "getDrugKeyList").then((data) => data.json())
            .then((data)=>
            {
                data.map(drug=>
                    {
                        getManDetails(drug);
                        getDistDetails(drug);
                        getWholesalerDetails(drug);
                        getPharmaDetails(drug);
                       
                       


                    })

            })
        }
        catch(error)
        {
            throw error;
        }
    }
  //  const currentUser=localhost.getItem('currentUser');
  
  const sendUpdateDetails = (product) => {
    //setModelType('update');
    SetSelectedDrugDetails(product);
}
    async function drugInfo() {
        setDrugDetList([]);
        try {
            await fetch(localhost + "getDrugKeyList").then((data) =>

                data.json()
            )
                .then((data) => {
                    B(data);
                })




        } catch (error) {
            throw error
        }
    }
    function getDrugJourney(n)
    {
        //getManufacturerDetails()
        manufacturerStatus(n);
        wholeDistStatus(n);
        pharmaStatus(n);


    }
     function manufacturerStatus(n)

    {
        setDrugDL([]);
        let ret;
         fetch(localhost+"ManufacturerDetails/"+n).then((res)=>res.json())
        .then((res)=>
        {
        setDrugDL(oldDta =>[...oldDta,{serialNumber:n,DrugStatus:res.DrugStatus}]);

         
        });
      
    }
    async function distributorStatus(n)
    {
        setDistList([]);
        await fetch(localhost+"DistributorDetails/"+n).then(res=>res.json())
        .then((res)=>{
          // setDistStatus(res.DrugStatus);
           setDistList(oldDta =>[...oldDta,{serialNumber:n,DrugStatus:res.DrugStatus}]);
        });
    }
    async function wholeDistStatus(n)
    {
        setWholeSalerList([]);
        await fetch(localhost+"WholesalerDetails/"+n).then(res=>res.json())
        .then((res)=>{
           // setWholesalerStaus(res.DrugStatus);
           setWholeSalerList(oldDta =>[...oldDta,{serialNumber:n,DrugStatus:res.DrugStatus}]);
           
        });
    }
    async function pharmaStatus(n)
    {
        setPharmaList([]);
        await fetch(localhost+"PharmacyDetails/"+n).then(res=>res.json())
        .then((res)=>{
            //setPharmacyStaus(res.DrugStatus);
            setPharmaList(oldDta =>[...oldDta,{serialNumber:n,DrugStatus:res.DrugStatus}]);
        })
    }
     function B(data) {

        {
            setDrugList(data);
            setAllDrug([]);
           // let manstat=manufacturerStatus(data);
            data.map(drug => {

                fetch(localhost + "getDrugDetails/" + drug).then((result) => result.json())
                    .then((result) => {
                        console.log(result);
                        console.log(drug);
                        manufacturerStatus(drug);
                        distributorStatus(drug);
                        wholeDistStatus(drug);
                        pharmaStatus(drug);
                       console.log(ManStatus);
                       console.log(pharmacyStatus);
                       console.log(distStatus);
                       console.log(wholeSalerStatus);
                       
                       
                      //  let manstat="";
                      
                        setAllDrug(oldDta => [...oldDta, { serialNumber: drug, name: result.DrugName, batchId: result.BatchID, nextOwner: result.NextOwner, status: result.IsBad, location: result.Currentlocation, drugId: result.DrugID ,shipmentStatus:result.Status, owner:result.CurrentproductOwner, manufacturerDetails:ManStatus,distDetails:distStatus,wholesellerDetails:wholeDistStatus,pharamadetails:pharmaStatus}])
                        setDrugDetList(oldDta => [...oldDta, { serialNumber: drug, name: result.DrugName, batchId: result.BatchID, nextOwner: result.NextOwner, status: result.IsBad, location: result.Currentlocation, drugId: result.DrugID ,shipmentStatus:result.Status, owner:result.CurrentproductOwner, manufacturerDetails:ManStatus, distDetails:distStatus,wholesellerDetails:wholeDistStatus,pharamadetails:pharmaStatus}])
                      /*   setDrugInfoList(oldDta => [...oldDta, {
                            manufactureDate: res.MfgTimeStamp,
                            expiryDate: res.ExpTimeStamp,
                            maxTemp: res.IdealTemperature,
                            currentTemp: res.CurrentTemperature,
                            currentOwner: res.CurrentproductOwner,
                            nextOwner: res.NextOwner
                        }]) */

                    })

                fetch(localhost + "ManufacturerDetails/" + drug).then((res) => res.json())
                    .then((res) => {
                        setShipmentStatus(oldDta => [...oldDta, { serialNumber: drug, shipment: res.DrugStatus === 'Shipped' ? false : true,status:res.DrugStatus }])
                    })
                /*  Supplychain.methods.BatchManufactureringDetails(drug).call().then(res =>{
                    setShipmentStatus(oldDta => [...oldDta, { serialNumber: drug,shipment: res.DrugStatus === 'Shipped' ? false : true}])
                }) */
            })

        }
    }
    async function A(res, det) {
        await fetch(localhost + "getDrugDetails/" + det).then((res) => res.json())
            .then((res) => {
                setDrugDetList(oldList => [...oldList, { serialNumber: det, name: res.DrugName, batchId: res.BatchID, shipmentStatus: res.Status,IsBad:res.IsBad, location: res.Currentlocation, drugId: res.DrugID }]);
                setDrugInfoList(oldDta => [...oldDta, {
                    manufactureDate: res.MfgTimeStamp,
                    expiryDate: res.ExpTimeStamp,
                    maxTemp: res.IdealTemperature,
                    currentTemp: res.CurrentTemperature,
                    currentOwner: res.CurrentproductOwner,
                    nextOwner: res.NextOwner
                }])
            })

    }
    async function getDetails() {

        try {


            fetch(localhost + "getUserList").then((res) => res.json())
                .then((res) => {
                    setUserList(res);
                    console.log(res);
                })



        } catch (error) {
            throw error;
        }
        drugInfo();
        console.log(drugDetList);
    }

    function selectedDetails(drug) {
        console.log("Hello");
        SetSelectedDrugDetails(drug);
       // localStorage.setItem('drug')=drug;
       console.log(drug);
    }

    function filterByParam(filterValue,name='name') {
        let drugs=[];
        console.log("Filter is being called");
        console.log(filterValue,name);
        console.log(allDrug)
        var a=allDrug[0];
        filterValue === 'All' ? setDrugDetList(allDrug) : setDrugDetList(allDrug.filter(drug => drug[name] === filterValue));
  
       // filterValue === 'All' ? setAllDrug(allProducts) : setAllDrug(allProducts.filter(drug => drug[name] === filterValue));
      
        if(name==='status')
        {
            if(filterValue.toLowerCase()=='false')
            {
                filterValue=true;
                
                allDrug.forEach(drug=>{
                    if(drug.status==filterValue)
                    {
                        console.log('bingo');
                       // setDrugDetList(drug);
                       drugs.push(drug);
                    }
                       

                    
                })
                

            }
            else{
                console.log('not bingo')
                filterValue=false;
                allDrug.forEach(drug=>{
                    if(drug.status==filterValue)
                    {
                        drugs.push(drug);
                    }
                })
            }
            setDrugDetList(drugs);
           // console.log("Hello");
          
       //filterValue === 'All' ? setDrugDetList(allDrug) : setDrugDetList(allDrug.filter(drug => drug[name] == filterValue));
        }
        if (name=='shipmentstatus')
        {
            
            console.log(shipmentStatus);
            if(filterValue==='All')
            {
               drugs=allDrug;
            }
           allDrug.forEach(drug => {
            if(drug.shipmentStatus===filterValue)
            {
                drugs.push(drug);
            }
           
               
           });

           setDrugDetList(drugs)
        }
       
    }
    function doSearch(filterValue,name='name')
    {
        console.log("Hello",filterValue);
        filterValue === 'All' ? setDrugDetList(allDrug) : setDrugDetList(allDrug.filter(drug => drug[name].toLowerCase().includes(filterValue.toLowerCase()) ));
    }
    function setSerialNumber(serialNumber)
    {
        console.log("Hello");
    }
    useEffect(() => {
        /*  if (!userAddress) {
             setUserAddress(window.ethereum.selectedAddress);
         } */
        try {
            getDetails();
            DrugDet();
            //drugInfo();
        } catch (error) {
            throw error;
        }
    }, [])

    const updateShipment = (message) => {
        setIsToastActive(true);
        
        setMessage(message);
       // setMessageType(type);
        //setIsAdd(false);
      
       //drugListing();
       console.log("Setting Up",message,messageType);
        drugInfo();
    }
    /*   useEffect(() => {
console.log(drugDetList);
 setAllDrug([])
a drugDetList.forEach((prod1, index) => {
     const prod2 = drugInfoList[index];
     setAllDrug(drug => [...drug, { ...prod1, ...prod2 }])
     setAllProducts(drug => [...drug, { ...prod1, ...prod2 }])
 });
 
 }, [drugList.length > allDrug.length])
*/
    function setColor(location) {

    }

    return (
        <div>
            <Header />
            <section className="breadcrumb-section">
                <div className="container-fluid">
                    <div className="row breadcrumb-content py-2">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                <li className="breadcrumb-item active" aria-current="page">All Users</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>
            <main id="main">
                <section className="page-title mt-3 mx-4">
                    <div className="container-fluid">
                        <div className="row ">
                            <h2 className="title mb-1 p-0 pb-3 helvetica-mediumv fw-bold main-color">Dashboard</h2>
                        </div>
                    </div>
                </section>
                <Profile />
                <section className="data-count-section mt-4 mx-4">
                    <div className="container-fluid">
                        <div className="row">
                            
                            <div className="col-12 col-lg-6 ps-0">
                                <div className="participants-count d-flex bg-white w-100 flex-wrap bg-white p-4  rounded justify-content-between">
                                    <div className="count-block d-flex">
                                        <div className="count-img m-auto me-3">
                                            <img className="img-fluid p-3" alt="user image" src={require('../../assets/images/users.jpg').default} />
                                        </div>
                                        <div className="count main-color m-auto">
                                            <h5 className="helvetica-medium text-uppercase">PARTICIPANTS</h5>
                                            <div className="fs-1">{userList.length}</div>
                                        </div>

                                    </div>
                                    <div className="button-block">
                                        <a href="/user-list" className="btn btn-outline-primary">View</a>
                                    </div>

                                </div>
                            </div>
                            <div className="col-12 col-lg-6 pe-0">
                                <div className="all-products-count d-flex bg-white w-100 flex-wrap bg-white p-4  rounded justify-content-between">
                                    <div className="count-block d-flex">
                                        <div className="count-img m-auto me-3">
                                            <img className="img-fluid p-3" alt="user image" src={require('../../assets/images/cube.jpg').default} />
                                        </div>
                                        <div className="count main-color m-auto">
                                            <h5 className="helvetica-medium text-uppercase">ALL PRODUCTS</h5>
                                            <div className="fs-1">{drugList.length}</div>
                                        </div>

                                    </div>
                                    <div className="button-block">
                                        <a href="/all-products" className="btn btn-outline-primary">Update</a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="products table-section mt-4 mx-4">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="table-block bg-white p-4 mb-5 rounded">
                                <div className="block-header d-flex justify-content-between">
                                    <h5 className="text-uppercase helvetica-medium fw-bold main-color">PRODUCTS</h5>
                                </div>
                                <div className="table-buttons mt-3">
                                    <div className="btn-group text-uppercase" role="group" aria-label="table buttons">
                                        <button type="button" className={`btn btn-outline-primary ${isOverview ? 'active' : ''}`} onClick={() => { setIsOverview(true); drugInfo() }}>OVERVIEW</button>
                                        <button type="button" className={`btn btn-outline-primary ${!isOverview ? 'active' : ''}`} onClick={() => { setIsOverview(false); drugInfo() }}>TRACKING</button>
                                    </div>
                                </div>
                                <div className="block-filters mt-4 d-flex justify-content-between flex-wrap">
                                    <div className="filters-list d-flex">
                                        <div className="filter me-3">
                                            <h6 className="sub-color">Product Name</h6>
                                            <select className="form-select main-color helvetica-light" aria-label="Product Name option" onChange={(e) => filterByParam(e.target.value, 'name')}>
                                                <option defaultValue>All</option>
                                               
                                                {allDrug.map((product, index) => {
                                                    console.log("Is this even Working")
                                                    return (
                                                        
                                                        <option /*key={Math.random() * (index + 1)}*/ value={product.name}>{product.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="filter me-3">
                                            <h6 className="sub-color">Product Status</h6>
                                            <select className="form-select main-color helvetica-light" aria-label="Product Status option" onChange={(e) => filterByParam(e.target.value, 'status')}>
                                                <option defaultValue>All</option>
                                                <option value="true">Active</option>
                                                <option value="false">Inactive</option>
                                            </select>
                                        </div>
                                        {isOverview && <div className="filter me-3">
                                            <h6 className="sub-color">Present Location</h6>
                                            <select className="form-select main-color helvetica-light" aria-label="Present Location option" onChange={(e)=>filterByParam(e.target.value,'location')}>
                                                <option defaultValue>All</option>
                                                <option value="Distributor">Distributor</option>
                                                <option value="Manufacturer">Manufacturer</option>
                                                <option value="Pharmacy">Pharmacy</option>
                                                <option value="Wholesaler">Wholesaler</option>
                                               
                                            </select>
                                        </div>}
                                        {isOverview && <div className="filter me-3">
                                            <h6 className="sub-color">Shipment Status</h6>
                                            <select className="form-select main-color helvetica-light" aria-label="Product Status option" onChange={(e)=>filterByParam(e.target.value,'shipmentstatus')}>
                                                <option defaultValue>All</option>
                                                <option value="Received">Received</option>
                                                <option value="Manufactured">Manufactured</option>
                                                <option value="Shipped">Shipped</option>
                                            </select>
                                        </div>}
                                    </div>
                                    <div className="search-block mt-2 align-self-end">
                                        <form className="d-flex">
                                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>{
                                                doSearch(e.target.value,'name')
                                            }} />
                                           {/*  <button className="btn btn-outline-primary" type="submit">Search</button> */}
                                        </form>
                                    </div>
                                </div>
                                <div className="table-container mt-4">
                                    <div className="table-responsive">
                                        <table className="table align-middle">
                                            <thead>
                                                <tr className="text-capitalize">
                                                    <th scope="col">Serial No.</th>
                                                    <th scope="col" className="sorting desc">Product Name</th>
                                                    <th scope="col">Batch ID</th>
                                                    <th scope="col" className="sorting asc">Product Status</th>
                                                    {isOverview && <th scope="col" className="sorting asc">Present Location</th>}
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
                                                {isOverview?<Overview  drugs={drugDetList} overview={isOverview} selectedDetails ={selectedDetails} sendUpdateDetails = {sendUpdateDetails}/>:<Tracking drugs={drugDetList}  drugDL={drugDL} distlist={distlist} wholesalerlist={wholesalerlist} pharmalist={pharmalist}  overview={isOverview} selectedDetails={selectedDetails} sendUpdateDetails={sendUpdateDetails}/>   }
                                              
                                                {/* <tr>
                                                                                        <td>710283</td>
                                                                                        <td>Product 1</td>
                                                                                        <td>101674</td>
                                                                                        <td>Active</td>
                                                                                        <td><span className="pharmacy">Pharmacy</span></td>
                                                                                        <td>Received</td>
                                                                                        <td><a href="#" type="button" className="btn btn-outline-primary" >Details</a></td>
                                                                                        <td></td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>192830</td>
                                                                                        <td>Product 2</td>
                                                                                        <td>820458</td>
                                                                                        <td>Active</td>
                                                                                        <td><span className="manufacturer">Manufacturer</span></td>
                                                                                        <td>Manufactured</td>
                                                                                        <td><a href="#" type="button" className="btn btn-outline-primary" >Details</a></td>
                                                                                        <td><a href="#" type="button" className="btn btn-outline-primary" >Ship</a></td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>812047</td>
                                                                                        <td>Product 3</td>
                                                                                        <td>812047</td>
                                                                                        <td>Active</td>
                                                                                        <td><span className="distributor">Distributor</span></td>
                                                                                        <td>Received</td>
                                                                                        <td><a href="#" type="button" className="btn btn-outline-primary" >Details</a></td>
                                                                                        <td></td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>719284</td>
                                                                                        <td>Product 4</td>
                                                                                        <td>748294</td>
                                                                                        <td>Active</td>
                                                                                        <td><span className="wholesaler">Wholesaler</span></td>
                                                                                        <td>Received</td>
                                                                                        <td><a href="#" type="button" className="btn btn-outline-primary" >Details</a></td>
                                                                                        <td></td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>732048</td>
                                                                                        <td>Product 5</td>
                                                                                        <td>193028</td>
                                                                                        <td>Inactive</td>
                                                                                        <td><span className="">NA</span></td>
                                                                                        <td>NA</td>
                                                                                        <td><a href="#" type="button" className="btn btn-outline-primary disabled" >Details</a></td>
                                                                                        <td></td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>748294</td>
                                                                                        <td>Product 6</td>
                                                                                        <td>719284</td>
                                                                                        <td>Active</td>
                                                                                        <td><span className="manufacturer">Manufacturer</span></td>
                                                                                        <td>Manufactured</td>
                                                                                        <td><a href="#" type="button" className="btn btn-outline-primary" >Details</a></td>
                                                                                        <td><a href="#" type="button" className="btn btn-outline-primary" >Ship</a></td>
                                                                                    </tr> */}
                                            </tbody>
                                        </table>
                                        <div className=" table-footer d-flex  justify-content-between align-items-baseline">
                                            <div className="total_items text-muted">Total Items: {drugList.length}</div>
                                            {drugList.length > 10 && <div className="Tables_paginate d-flex me-2">
                                                <div className="table-count me-3">
                                                    <label for="inputcount" className="form-label me-2 text-muted">Items per page:</label>
                                                    <select id="inputcount" className="form-select d-inline-block w-auto">
                                                        <option value="10" defaultValue>10</option>
                                                        <option value="25">25</option>
                                                        <option value="50">50</option>
                                                        <option value="100">100</option>
                                                    </select>
                                                </div>
                                                <div className="paginate-block ">
                                                    <nav aria-label="Page navigation">
                                                        <ul className="pagination">
                                                            <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                                                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                                        </ul>
                                                    </nav>
                                                </div>
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="model-section">
                    <ShipModel id="shipped-product" selectedDrugDetails={selectedDrugDetails} updateShipment={updateShipment} />
                   
                </div>
              
                {isToastActive && <Toast message={message}  />}
            </main>

        </div>

    );

}
