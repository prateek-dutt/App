import { useEffect, useState } from "react";
import $, { isEmptyObject } from "jquery";
import axios from 'axios';
import UpdateProduct from "./UpdateProduct";
//import Supplychain from '../../Helper';
import Contract,{abi,address} from '../../../src/helper'
import web3 from '../../web3';
export default function AddProduct(props) {

    console.log(props);
    const { title, type, selectedProduct } = props;

    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [status,setStatus] = useState(false);
    const [drugId, setDrugId] = useState('');
    const [currTemp, setCurrTemp] = useState('');
    const [temperature, setTemperature] = useState('');
    const [batchId, setBatchId] = useState('');
    const [location, setLocation] = useState('Manufacturer');
    const [manufacturedDate, setManufacturedDate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [scale, setScale] = useState('');
    const [serialNumber,setSerialNumber]=useState('');
    const localhost = "http://localhost:3000/api/";
    const[accounts,setAccounts]= useState(null);
   
    function dateToEpoch(date) {
        return Math.floor(new Date(date).getTime() / 1000.0)
    }
    function epochToDate(epoch = Math.floor(new Date().getTime() / 1000.0)) {
        const date = new Date(epoch * 1000);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    }


    async function createProduct(drugId, batchId, name, location, manufacturedDate, expiryDate, currTemp, temperature) {
      //Updated Contract Calls
      const accounts = await  web3.eth.getAccounts(); 
      console.log(accounts[0]);
      let result = await Contract.methods.addDrugDetails(drugId,
            "2",
            name,
            location,
            dateToEpoch(manufacturedDate),
            dateToEpoch(expiryDate),
            currTemp,
            temperature,
            '0x0000000000000000000000000000000000000000',
            status


        ).send({from:accounts[0]});
     

        console.log(result);
        window.location.reload(false)


       



/* 
        let drug = {
            "CurrentUser":localStorage.getItem('currentUser'),
            "DrugID": drugId,
            "BatchID": batchId,
            "DrugName": name,
            "Location": location,
            
            "Exp": dateToEpoch(expiryDate),
            "CurrentTemp": currTemp,
            "MaxTemp": temperature,
            "IsBad":status,
        };
        await fetch(localhost + "AddDrug", {
            method: "POST",
            body: JSON.stringify(drug),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }

        }).then((res) => {
            if (res.status == 200) {
                props.saveProduct('Success',"Product Added Successfully");
                resetFields();
            }
            else {
                 props.saveProduct("Failed","Something went wrong. Please check the values you have entered and try again");
                 resetFields();
            }

            resetFields();
        }
        
        ) */

        resetFields();
    }

    async function UpdateProduct(selectedProduct) {
        //console.log("The Update Function is runninh",selectedProduct);
        const accounts = await  web3.eth.getAccounts(); 
        try {

            //Updated Contract Calls

            let res = await Contract.methods.addDrugDetails(drugId,batchId,name,location,dateToEpoch(manufacturedDate), dateToEpoch(expiryDate),currTemp,temperature,serialNumber,status).send({from:accounts[0]});
            console.log("*********UPDATING DRUG*******************");
            console.log(serialNumber);
            console.log(res);


            let drug = {
                "CurrentUser": localStorage.getItem('currentUser'),
                "DrugID": drugId,
                "BatchID": ""+batchId,
                "DrugName": name,
                "Location": location,
                "Mfg": dateToEpoch(manufacturedDate),
                "Exp": dateToEpoch(expiryDate),
                "CurrentTemp": currTemp,
                "MaxTemp": temperature,
                "SerialNumber": serialNumber,
                "IsBad":status
            };
         /*    await fetch(localhost + "UpdateDrug", {
                method: "POST",
                body: JSON.stringify(drug),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then((res) => {
                console.log(res);
                if (res.status == 200) {
                    //  console.log("Hitting The Swagger End Point"+res);
                    props.saveProduct('success', 'Participant updated successfully.');
                    resetFields();
                }
                else {
                    props.saveProduct("Failed", "Something went wrong. Please check the values you have entered and try again");
                }
            }); */
        }
        catch (Error) {

            throw Error;
        }
        window.location.reload(false)
    }

    useEffect(() => {
       // console.log(selectedProduct);
        if (selectedProduct) {
            setName(selectedProduct.name);
            setUserName(localStorage.getItem('currentUser'));
            setDrugId(selectedProduct.drugId);
            setBatchId(selectedProduct.batchId);
            setSerialNumber(selectedProduct.serialNumber);
            setCurrTemp(selectedProduct.currentTemp);
            setTemperature(selectedProduct.idealTemp);
            var a = selectedProduct.manufactureDate;
            
            setManufacturedDate(epochToDate(selectedProduct.manufactureDate));
            setExpiryDate(epochToDate(selectedProduct.expiryDate));
            setSerialNumber(selectedProduct.serialNumber);
            console.log(selectedProduct);
        }
    }, [props, selectedProduct])


    const saveProduct = (event) => {
        event.preventDefault();
        if (type === 'add') {
            createProduct(drugId, batchId, name, location, manufacturedDate, expiryDate, currTemp, temperature) ;
        }
        else {
            console.log(selectedProduct);
            UpdateProduct(selectedProduct);
        }

    }
    const resetFields = () => {
        $("#").children("input").value="";

    }
    return (
        <div className="modal fade" id="add-product" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modal-title" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content p-3">
                    <div className="modal-header">
                        <h4 className="modal-title helvetica-medium main-color fw-bold" id="modal-title">{title || 'Add Product'}</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={(e) => { resetFields(e) }}></button>
                    </div>
                    <div className="modal-body">
                        <form className=" g-3 helvetica-light sub-color">
                            <div className="row mb-2">
                                <div className="col-12 col-md-6">
                                    <label htmlFor="serial-number" className="form-label">Drug ID</label>
                                    <input type="text" className="form-control" id="serial-number" value={drugId} onChange={(e) => setDrugId(e.target.value)} />
                                </div>
                                <div className="col-12 col-md-6 ">
                                    <label htmlFor="product-name" className="form-label">Product Name</label>
                                    <input type="text" className="form-control" id="product-name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-12 col-md-6">
                                    <label htmlFor="batch-id" className="form-label">Batch ID</label>
                                    <input type="text" className="form-control" id="batch-id" value={batchId} onChange={(e) => setBatchId(e.target.value)} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label htmlFor="location" className="form-label">Present Location</label>
                                    <select id="location" className="form-select" value={location}>
                                       
                                      
                                        <option defaultValue="Manufacturer">Manufacturer</option>
                                       
                                       
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-12 col-md-6">
                                    <label htmlFor="manufactured-date" className="form-label">Manufactured Date</label>
                                    <input type="text" className="form-control" id="manufactured-date" placeholder="mm/dd/yyyy" value={manufacturedDate} onChange={(e) => setManufacturedDate(e.target.value)} />
                                </div>
                                <div className="col-12 col-md-6 ">
                                    <label htmlFor="expiry-date" className="form-label">Expiry Date</label>
                                    <input type="text" className="form-control" id="expiry-date" placeholder="mm/dd/yyyy" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                                </div>
                            </div>
                            <div className="row  mb-2">
                                <div className="col-12 col-md-6 d-flex">
                                    <div className="col-6 me-2">
                                        <label htmlFor="maximum-temp" className="form-label">Max Temp.</label>
                                        <input type="text" className="form-control" id="maximum-temp" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="scale" className="form-label">Scale</label>
                                        <select id="scale" className="form-select" value={scale} onChange={(e) => setScale(e.target.value)}>
                                            <option value disabled>Select</option>
                                            <option defaultValue="°F">°F</option>
                                            <option value="na">°C</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 d-flex">
                                    <div className="col-6 me-2">
                                        <label htmlFor="current-temp" className="form-label">Current Temp.</label>
                                        <input type="text" className="form-control" id="current-temp" value={currTemp} onChange={(e) => setCurrTemp(e.target.value)} />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="scale" className="form-label">Scale</label>
                                        <select id="scale" className="form-select" value={scale} onChange={(e) => setScale(e.target.value)}>
                                            <option value disabled>Select</option>
                                            <option defaultValue="°F">°F</option>
                                            <option value="na">°C</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {/*         <div className="row mb-2">
                                <div className="col-12 col-md-6">
                                    <label htmlFor="shipment-status" className="form-label">Shipment Status</label>
                                    <select id="shipment-status" className="form-select" value={shipmentStatus} onChange={(e) => setShipmentStatus(e.target.value)}>
                                        <option defaultValue>Select</option>
                                        <option value="Received">Received</option>
                                        <option value="Manufactured">Manufactured</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="na">NA</option>
                                    </select>
                                </div>
                                <div className="col-12 col-md-6 d-flex align-items-end mt-3">
                                    <div className="form-check status-check form-switch d-flex justify-content-between ps-0">
                                        <label className="form-check-label" htmlFor="status">Product Status</label>
                                        <input className="form-check-input" type="checkbox" id="status" checked={status} onChange={() => setStatus(!status)} />
                                    </div>
                                </div>
                            </div> */}
                                   <div className="col-12 col-md-6 d-flex align-items-end mt-3">
                                        <div className="form-check status-check form-switch d-flex justify-content-between ps-0">
                                            <label className="form-check-label" htmlFor="status">Drug Status</label>
                                            <input className="form-check-input" defaultChecked type="checkbox" id="status"  onChange={(e) => {setStatus(!status); console.log(status)}} />
                                        </div>
                                    </div>

                            <div className="row mb-2">
                                <div className="col-12 text-end">
                                    <button className="btn btn-primary" data-bs-dismiss="modal" type="submit" onClick={(e) => saveProduct(e)}>Save</button>
                                </div>
                            </div>

                        </form>
                    </div>
                    <div className="modal-footer d-none">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={(e) => { resetFields(e) }}>Close</button>
                        <button type="button" className="btn btn-primary">Understood</button>
                    </div>
                </div>
            </div>
        </div>
    )
}