import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header/Header";
import $ from "jquery";

export default function ShipmentTree() {
    
    const search = useLocation().search;
    const serialNo = new URLSearchParams(search).get('id');
    const [drugName, setDrugName] = useState('');
    const [batchId, setBatchId] = useState(null);
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [currentTemp, setCurrTemp] = useState(null);
    const [timestamp, setTimeStamp] = useState(null);
    const [location, setLocation] = useState('');
    const localhost = "http://localhost:3000/api/";

    //console.log(JSON.parse(drug));
    //const drug = JSON.parse(selectedDrug);


   // console.log(serialNo);
    //const drug={};
    // const serialN

    // console.log(url_array[url_array.length-1]);
    const [manufacturer, setManufacturer] = useState({});
    const [distributor, setDistributor] = useState({});
    const [wholesaler, setWholesaler] = useState({});
    const [pharmacy, setPharmacy] = useState({});
    const [drug, setDrug] = useState({})
    //const [drugdet,setDrugDet]=useState([]);
    //const [drug,setDrug]=useState({});
    /*   function setDrug(res)
     {
         var drug={};
         drug.DrugName=res.DrugName;
         drug.BatchID=res.BatchID;
         drug.CurrentLocation=res.Currentlocation;
         console.log("Hello");
         console.log(drug);
         setDrugi(drug);
 
     } */



    /* async function getDrugDetails()
    {

        
        //setDrug({});
       console.log("Hello");
        await fetch("http://localhost:3000/api/getDrugDetails/"+serialNo).then((res)=>res.json())
        .then((res)=>{
           
           
            if(res){
           
            console.log(res);
           // setDrugDet(res);
            
            
            }

        })
   
    } */
     function dateToEpoch(date) {
        return Math.floor(new Date(date).getTime() / 1000.0)
    }
    function epochToDate(epoch = Math.floor(new Date().getTime() / 1000.0)) {
        const date = new Date(epoch * 1000);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    }
    async function getDrugDetails() {

        await fetch(localhost + "/getDrugDetails/" + serialNo).then(res => res.json()).
            then((res) => {
               // console.log(res);
                //this is the drug
                //setting the drug 
                setDrug(res);
                //setTimeout(200000000000000);
                initateTree(res)
                // setLocation(res.CurrentLocation);
            });

    }
    function getManufacturerDetails() {
        let r;
        let url = localhost +"ManufacturerDetails/"+serialNo;

        
        console.log(url);

        fetch(url).then(res=>res.json()).
        then((res)=>{
//            console.log(res);
            setManufacturer(res);

        }
        );

  //   console.log("Manufacture Details Added");

    }
    function setManufacturerDetails(drug) {
     //   console.log(drug);
        getManufacturerDetails();


        /* 
        else{
            console.log("NO DRUG");
        } */
    }
    function getDistributorDetails()
    {
        let url = localhost +"DistributorDetails/"+serialNo;

        
       // console.log(url);

        fetch(url).then(res=>res.json()).
        then((res)=>{
          //  console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=')
            //console.log(res);
            setDistributor(res);

        }
        );

    // console.log("Distributor Details Added");
    }
   
    function getWholesalerDetailser()
    {
        let url = localhost +"WholesalerDetails/"+serialNo;

        
     //   console.log(url);

        fetch(url).then(res=>res.json()).
        then((res)=>{
         //   console.log(res);
            setWholesaler(res);

        }
        );

   //  console.log("Distributor Details Added");
    }
    function getPharmacyDetails()
    {
        let url = localhost +"PharmacyDetails/"+serialNo;

        
    //    console.log(url);

        fetch(url).then(res=>res.json()).
        then((res)=>{
            console.log(res);
            setPharmacy(res);
     //       console.log('-----------------------------------------------------------------');
     //       console.log(pharmacy);

        }
        );

    // console.log("Distributor Details Added");
    }
    function setDistributorDetails(drug)
    {
        getDistributorDetails();
    }
    function setWholesalerDetials(drug)
    {
        getWholesalerDetailser();
    }
    function setPharmacyDetails()
    {
        getPharmacyDetails();
    }
    function initateTree(drug) {
       if(drug.Status != "Manufactured"){

       
        if (drug.Currentlocation === "Manufacturer") {
           console.log(drug);
           getAllDetails();
          
            if(drug.Status ===   "Shipped" ){
                $("#man").addClass('step0 active');
            }
            else{
                $("#man").addClass('step0 inactive');
               
            }
        }
           
            
        }
        if(drug.Currentlocation==="Distributor")
        {
            $("#man").addClass('step0 active');
            getAllDetails();
            console.log(distributor.DrugStatus);
            if(drug.Status ===  ("Received" || "Shipped" )){
                $("#dist").addClass('step0 active');
            }
            else{
                $("#dist").addClass('step0 inactive');
            }
        }
        if(drug.Currentlocation==="Wholesaler")
        {
            $("#man").addClass('step0 active');
            $("#dist").addClass('step0 active');
            getAllDetails();
            if(drug.Status===  ("Received" || "Shipped" )){
                
                $("#whole").addClass('step0 active');
            }
            else{
                $("#whole").addClass('step0 inactive');
            }
            
        }


       

        if(drug.Currentlocation==="Pharmacy")
        {
            getAllDetails();
            $("#man").addClass('step0 active');
            $("#dist").addClass('step0 active');
            $('#whole').addClass('step0 active');
      
            
            
            console.log(pharmacy.DrugStatus);
            console.log(pharmacy);
           
            if(drug.Status==='Received') {
                $("#pharma").addClass('step0 active');
            }
            else{
                $("#pharma").addClass('step0 inactive');
            }
            

        }
    }
   function getAllDetails(){
    setManufacturerDetails(drug);
    setDistributorDetails(drug);
    setWholesalerDetials(drug);
    setPharmacyDetails(drug);
   }
    useEffect(() => {
       
        //getting the basic details of the drug
        getDrugDetails();
       
        
        //find currentLoaction



    }, [])

    return (

        <>

            <Header />
            <section className="breadcrumb-section">
                <div className="container-fluid">
                    <div className="row breadcrumb-content py-2">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Shipment Progress</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>
            <main id="main">
                <section className="page-title mt-3 mx-4">
                    <div className="container-fluid">
                        <div className="row ">
                            <h2 className="title mb-1 p-0 pb-3 helvetica-mediumv fw-bold main-color">Shipment Progress - {drug.DrugName}</h2>
                        </div>
                    </div>
                </section>
                <section className="shipment-progress mt-3 mx-4">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="shipment-block bg-white p-4 mb-5 rounded position-relative">
                                <div className="col-12 ">
                                    <div className="card1">
                                        <ul id="progressbar" className="text-center p-0 position-absolute" >

                                            <li id="man" className="step0" ></li>
                                            <li id="dist" ></li>
                                            <li id="whole" className="step0"></li>
                                            <li id="pharma" className="step0"></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-11 col-md-5" id="man_col">
                                    <div className="card shadow">
                                        <div className="card-header border-0 mt-3 bg-white">
                                            <h4 className="text-uppercase main-color">Manufacturer</h4>
                                            <div className="block-header-text mt-3 pb-4"><span className="fw-bold mt-3 me-5 pe-2">Name</span> {manufacturer.manufacturerUserName}</div>
                                        </div>
                                        <div className="card-body">
                                            <div className="details ">
                                                <table className="table table-borderless">
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">Serial Number</th>
                                                            <td>{serialNo}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Product Name</th>
                                                            <td>{drug[2]}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Batch ID</th>
                                                            <td>{drug[1]}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Source</th>
                                                            <td>{manufacturer.ManufacturerUserName || 'Self'}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Destination</th>
                                                            <td>{manufacturer.ExporterUserName || 'NA'}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Current Temp.</th>
                                                            <td>{manufacturer.ExportingTemparature || 'NA'}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Exporting Timestamp</th>
                                                            <td>{  (manufacturer.ExportingDateTime!= 0)?epochToDate(manufacturer.ExportingDateTime) : 'NA'}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Status</th>
                                                            <td>{manufacturer.DrugStatus || 'Self'}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div className="col-12 mt-3 d-flex justify-content-end" id="dist_col">
                                    <div className="col-11 col-md-5">
                                        <div className="card shadow">
                                            <div className="card-header border-0 mt-3 bg-white">
                                                <h4 className="text-uppercase main-color">DISTRIBUTOR</h4>
                                                <div className="block-header-text mt-3 pb-4"><span className="fw-bold mt-3 me-5 pe-2">Name</span> {distributor.DistributorUserName || 'NA'}</div>
                                            </div>
                                            <div className="card-body">
                                                <div className="details ">
                                                    <table className="table table-borderless">
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row">Serial Number</th>
                                                                <td>{serialNo}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Product Name</th>
                                                                <td> {drug.DrugName || 'NA'}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Batch ID</th>
                                                                <td>{drug.BatchID || 'NA'}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Source</th>
                                                                <td>{manufacturer.ManufacturerUserName || 'NA'}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Importing Temparature </th>
                                                                <td>{distributor.ImportingTemparature || 'NA'}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Importing Timestamp</th>
                                                                <td>{ (distributor.ImportingDateTime!= 0)?epochToDate(distributor.ImportingDateTime) : 'NA'}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Destination</th>
                                                                <td>{distributor.ExporterUserName || 'NA'}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Exporting Temparature</th>
                                                                <td>{distributor.ExportingTemparature || 'NA'}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Exporting Timestamp</th>
                                                                <td>{(distributor.ExportingDateTime!= 0)?epochToDate(distributor.ExportingDateTime):'NA'}</td>
                                                            </tr>
                                                            <tr>
                                                            <th scope="row">Status</th>
                                                            <td>{distributor.DrugStatus || 'Self'}</td>
                                                        </tr>

                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-12 mt-3 d-flex justify-content-end justify-content-md-start" id="wholeseller_col">
                                    <div className="col-18 col-md-5">
                                        <div className="card shadow">
                                            <div className="card-header border-0 mt-3 bg-white">
                                                <h4 className="text-uppercase main-color">WHOLESALER </h4>
                                                <div className="block-header-text mt-3 pb-4"><span className="fw-bold mt-3 me-5 pe-2">Name</span> {wholesaler.WholeSalerUserName || 'NA'}</div>
                                            </div>
                                            <div className="card-body">
                                                <div className="details">
                                                    <table classNameS="table table-borderless ">
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row">Serial Number</th>
                                                                <td>{serialNo}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Product Name</th>
                                                                <td> {drug.DrugName}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Batch ID</th>
                                                                <td>{drug.BatchID}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Source</th>
                                                                <td>{distributor.DistributorUserName || 'NA'}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Importing Temparature </th>
                                                                <td>{wholesaler.ImportingTemparature || 'NA'}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Importing Timestamp</th>
                                                                <td>{(wholesaler.ImportingDateTime!= 0)? epochToDate(wholesaler.ImportingDateTime):'NA'}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Destination</th>
                                                                <td>{wholesaler.ExporterUserName || 'NA'}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Exporting Temparature</th>
                                                                <td>{wholesaler.ExportingTemparature || 'NA'}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Exporting Timestamp</th>
                                                                <td>{(wholesaler.ExportingDateTime!= 0)? epochToDate(wholesaler.ExportingDateTime):'NA'}</td>
                                                            </tr>
                                                            <tr>
                                                            <th scope="row">Status</th>
                                                            <td>{wholesaler.DrugStatus || 'Self'}</td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 mt-3 d-flex justify-content-end" id="pharma_col">
                                    <div className="col-11 col-md-5">
                                        <div className="card shadow">
                                            <div className="card-header border-0 mt-3 bg-white">
                                                <h4 className="text-uppercase main-color"> Pharmacy</h4>
                                                <div className="block-header-text mt-3 pb-4"><span className="fw-bold mt-3 me-5 pe-2">Name</span> {pharmacy.PharmacyName || 'NA'}</div>
                                            </div>
                                            <div className="card-body">
                                                <div className="details">
                                                    <table className="table table-borderless">
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row">Serial Number</th>
                                                                <td>{serialNo}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Product Name</th>
                                                                <td>{drug.DrugName}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Batch ID</th>
                                                                <td>{drug.BatchID}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Source</th>
                                                                <td>{wholesaler.WholeSalerUserName || 'NA'}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Current Temp.</th>
                                                                <td>{pharmacy.ImportingTemparature || 'NA'}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Importing Timestamp</th>
                                                                <td>{(pharmacy.ImportingDateTime!= 0)?epochToDate(pharmacy.ImportingDateTime):'NA'}</td>
                                                            </tr>
                                                            <tr>
                                                            <th scope="row">Status</th>
                                                            <td>{pharmacy.DrugStatus || 'Self'}</td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )

}