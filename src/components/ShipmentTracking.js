import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header/Header";
//import Supplychain from '../Helper';
import $ from 'jquery'; 


export default function ShipmentTracking() {
    const search = useLocation().search;
    console.log(search);
    //getting the id from the link
    const serialNo = new URLSearchParams(search).get('id');
    const [manufacturer, setManufacturer] = useState({});
    const [distributor, setDistributor] = useState({});
    const [wholesaler, setWholesaler] = useState({});
    const [pharmacy, setPharmacy] = useState({});
    const [drug, setDrug] = useState();
    const [overview,setOverview]=useState('');
    const localhost ="http://localhost:3000/api/";

    async function getDrugDetails(serialNo)
    {
        

        /* console.log(drug);
        if(drug&&drug.Currentlocation==='Manufacturer')
        {
            setOverview('Manufactuere');
            setManufacturerDetails();
            console.log("Hello");
            $("#man").addClass('active step0');
        } */
    
     // return r;
    }
    function getDrugLocation(serialNo)
    {
        let res= getDrugDetails(serialNo);
        console.log(res.then()  );
    }

    async function InitiateTree()
    {     
        console.log("Hello");
      console.log(serialNo);

       /*  let promise = Promise.resolve(a);
        promise.then((p)=>{
            setDrug(p);
            console.log(drug);
         
        }); */

    
     //console.log(drug);
        

    }
    async function setManufacturerDetails()
    {
        await fetch(localhost+"ManufacturerDetails/"+serialNo).then((res)=>(res.json()))
        .then((res)=>{
            console.log(res);
            setManufacturer({ 
                drugStatus: res.DrugStatus, 
                exporterUsername: res.ExporterUserName, 
                exportingDateTime: res.ExportingDateTime, 
                exportingTemparature: res.ExportingTemparature, 
                location: res.Location, 
                manufacturerUserName: res.ManufacturerUserName 
            })
        })
    }

    //Populating Distributor Details

    async function setDistDetails(){
        await fetch(localhost+"DistributorDetails/"+serialNo).then((res)=>res.json())
        .then((res)=>{
            setDistributor({
                distributorUserName: res.DistributorUserName,
                location: res.Location,
                importingTemparature: res.ImportingTemparature,
                exportingTemparature: res.ExportingTemparature,
                importingDateTime: res.ImportingDateTime,
                exportingDateTime: res.ExportingDateTime,
                exporterUserName: res.ExporterUserName,
                drugStatus: res.DrugStatus
            })
        })
    }

    useEffect(() => {

        console.log("Hello");
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

                                            <li id="man" ></li>
                                            <li id="dist" className=" step0"></li>
                                            <li id="whole" className=" step0"></li>
                                            <li id="pahrma" className="step0"></li>
                                        </ul>
                                    </div>
                                </div>
                               
                                    <div className="col-11 col-md-5" id="man_col">
                                        <div className="card shadow">
                                            <div className="card-header border-0 mt-3 bg-white">
                                                <h4 className="text-uppercase main-color">MANUFACTURER 1</h4>
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
                                                                <td>{drug.DrugName}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Batch ID</th>
                                                                <td>{drug.BatchID}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Source</th>
                                                                <td>self</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Destination</th>
                                                                <td>{manufacturer.ExporterUserName || 'NA'}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Current Temp.</th>
                                                                <td>{manufacturer.importingTemparature ? `${manufacturer.importingTemparature}°F` : 'NA'}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Timestamp</th>
                                                                <td>{manufacturer.exportingDateTime}</td>
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
                                                <h4 className="text-uppercase main-color">DISTRIBUTOR 1</h4>
                                                <div className="block-header-text mt-3 pb-4"><span className="fw-bold mt-3 me-5 pe-2">Name</span> Ellie McClure</div>
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
                                                                <td> {drug.DrugName}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Batch ID</th>
                                                                <td>{drug.BatchID}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Source</th>
                                                                <td>{drug.location}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Destination</th>
                                                                <td>{distributor.ExporterUserName}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Current Temp.</th>
                                                                <td>{distributor.ExportingTemparature}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Timestamp</th>
                                                                <td>{distributor.exportingDateTime}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 mt-3 d-flex justify-content-end justify-content-md-start" id="wholeseller_col">
                                    <div className="col-11 col-md-5">
                                        <div className="card shadow">
                                            <div className="card-header border-0 mt-3 bg-white">
                                                <h4 className="text-uppercase main-color">WHOLESALER 1</h4>
                                                <div className="block-header-text mt-3 pb-4"><span className="fw-bold mt-3 me-5 pe-2">Name</span> Jerel Mueller</div>
                                            </div>
                                            <div className="card-body">
                                                <div className="details">
                                                    <table className="table table-borderless ">
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row">Serial Number</th>
                                                                <td>812047</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Product Name</th>
                                                                <td>Product 3</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Batch ID</th>
                                                                <td>379472</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Source</th>
                                                                <td>Distributor 1</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Destination</th>
                                                                <td>Pharmacy 1</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Current Temp.</th>
                                                                <td>40°F</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Timestamp</th>
                                                                <td>10:30 AM, 05/03/2022</td>
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
                                                <h4 className="text-uppercase main-color">PHARMACY 1</h4>
                                                <div className="block-header-text mt-3 pb-4"><span className="fw-bold mt-3 me-5 pe-2">Name</span> Ned Nolan</div>
                                            </div>
                                            <div className="card-body">
                                                <div className="details">
                                                    <table className="table table-borderless">
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row">Serial Number</th>
                                                                <td>NA</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Product Name</th>
                                                                <td>NA</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Batch ID</th>
                                                                <td>NA</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Source</th>
                                                                <td>NA</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Destination</th>
                                                                <td>NA</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Current Temp.</th>
                                                                <td>NA</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Timestamp</th>
                                                                <td>NA</td>
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