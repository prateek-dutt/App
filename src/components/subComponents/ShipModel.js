import { useEffect, useState } from "react";
//import Supplychain from '../../Helper';

export default function ShipModel(props) {
    const { selectedDrugDetails} = props;
    const [destination, setDestination] = useState('');
    const[serialNumber,setSerialNumber] = useState('');
    const [destinationUName, setDestinationUName] = useState('');
    const [exportingTemp, setExportingTemp] = useState(null);
    const localhost="http://localhost:3000/api/";
    const resetFields = () => {

    }
    async function shipDrug(destination,destinationUName,exportingTemp)
    {
        
        console.log("SHIPMODEL");
        let post={
            "CurrentUser":localStorage.getItem('currentUser'),
            "SerialNumber": serialNumber,
            "Location":'Manufacturer',
            "DistributorUserName":destinationUName,
            "ExportTemp":exportingTemp
        }
        await fetch(localhost+"ManufacturerShipping",{
            method:"POST",
            body:JSON.stringify(post),
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            }

        }).then((res)=>{
            if(res.status==200)
            {
                props.updateShipment('success', 'Drug shipment details updated successfully.');
                resetFields();
                console.log("Your Drug Has Been Shipped");
            }
            else{
                props.updateShipment('failed', 'Something went wrong. Please check the values you have entered and try again');
                console.log(res.status);
                
            }
        })

    }
    const processShipment=(e)=> {
        e.preventDefault();
        shipDrug(destination,destinationUName,exportingTemp);



       


        
        /* try {
            
            Supplychain.methods.moveFromManufacturer(drug.serialNumber, localStorage.getItem("currentUser"), destination, destinationUName, exportingTemp).send({ from: window.ethereum.selectedAddress }).then(res => {
                if (res) {
                    props.updateShipment('success', 'Drug shipment details updated successfully.');
                }
            })
        } catch (error) {
            props.updateShipment('failed', 'Something went wrong. Please check the values you have entered and try again');
            throw error;
        } */
    }

    useEffect(() => {
        console.log(selectedDrugDetails);
        
        setDestination("Distributor");
        setSerialNumber(selectedDrugDetails.serialNumber)
        setExportingTemp(selectedDrugDetails.exportingTemp);
    }, [props,selectedDrugDetails])

    return (
        <div className="modal fade" id="shipped-product" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modal-title" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content p-3">
                    <div className="modal-header">
                        <h4 className="modal-title helvetica-medium main-color fw-bold" id="modal-title">Ship Product</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className=" g-3 helvetica-light sub-color">
                            <div className="row mb-2">
                                <div className="col-12 col-md-6 ">
                                    <label htmlFor="product-name" className="form-label">Product Name</label>
                                    <input type="text" className="form-control" id="product-name" disabled value={selectedDrugDetails.name} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label htmlFor="serial-number" className="form-label">Serial Number</label>
                                    <input type="text" className="form-control" id="serial-number" disabled value={selectedDrugDetails.serialNumber} />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-12 col-md-6">
                                    <label htmlFor="batch-id" className="form-label">Batch ID</label>
                                    <input type="text" className="form-control" id="batch-id" disabled value={selectedDrugDetails.batchId} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label htmlFor="source" className="form-label">Source</label>
                                    <select id="source" className="form-select" disabled>
                                        <option defaultValue={selectedDrugDetails.location}>{selectedDrugDetails.location}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row  mb-2">
                                <div className="col-12 col-md-6 mb-2">
                                    <label htmlFor="destination" className="form-label">Destination</label>
                                    <select id="destination" className="form-select">
                                        <option defaultValue='Distributor'>Distributor</option>
                                        <option value="Select" disabled>Select</option>
                                        <option value="Pharmacy" disabled>Pharmacy</option>
                                        <option value="Wholesaler" disabled>Wholesaler</option>
                                    </select>
                                </div>
                                <div className="col-12 col-md-6 d-flex">
                                    <div className="col-6 me-2">
                                        <label htmlFor="current-temp" className="form-label">Current Temp..</label>
                                        <input id="current-temp" type="text" className="form-control" value={exportingTemp} onChange={(e) => { setExportingTemp(e.target.value) }} />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="scale" className="form-label">Scale</label>
                                        <select id="scale" className="form-select">
                                            <option value="selected">Select</option>
                                            <option defaultValue="°F">°F</option>
                                            <option value="na">°C</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-12 col-md-6">
                                    <label htmlFor="destinationUName" className="form-label">Distributor Username</label>
                                    <input id="destinationUName" type="text" className="form-control" value={destinationUName} onChange={(e) => { setDestinationUName(e.target.value) }} />
                                </div>
                                {/* <div className="col-12 col-md-6 ">
                                    <label htmlFor="date-time" className="form-label">Time</label>
                                    <input id="date-time" type="time" className="form-control" />
                                </div> */}
                            </div>
                            <div className="row mb-2">
                                <div className="col-12 text-end">
                                    <button className="btn btn-primary" type="submit" data-bs-dismiss="modal"  onClick={(e) => { processShipment(e) }}>Save</button>
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