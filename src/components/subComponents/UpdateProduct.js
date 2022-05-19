import React from "react";




import { useEffect, useState } from "react";
import $, { isEmptyObject } from "jquery";
import axios from 'axios';
//import Supplychain from '../../Helper';

export default function UpdateProduct(props) {

    console.log(props);
    const { title, type, selectedProduct } = props;
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [drugId, setDrugId] = useState('');
    const [currTemp, setCurrTemp] = useState('');
    const [temperature, setTemperature] = useState('');
    const [batchId, setBatchId] = useState('');
    const [location, setLocation] = useState('');
    const [manufacturedDate, setManufacturedDate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [scale, setScale] = useState('');

    const resetFields=()=>{

    }
    const saveProduct=()=>{
        
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
                                <select id="location" className="form-select" value={location} onChange={(e) => setLocation(e.target.value)}>
                                    <option defaultValue>Select</option>
                                    <option value="Distributor">Distributor</option>
                                    <option value="Manufacturer">Manufacturer</option>
                                    <option value="Pharmacy">Pharmacy</option>
                                    <option value="Wholesaler">Wholesaler</option>
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
                                        <option value="na">NA</option>
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
                                        <option value="na">NA</option>
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