import userEvent from "@testing-library/user-event";
import { useEffect, useState } from "react";
import web3 from "../../web3";
import Contract,{abi,address} from '../../helper';
//import Supplychain from '../../Helper';


export default function ReceiveModel(props)
{

    const localhost="http://localhost:3000/api/"
    const {selectedDrugDetails} =props;
    console.log(props);

    const [location, setLocation] =useState('Distributor');
    const[serialNumber,setSerialNumber]= useState(null);
   // const [destinationUName, setDestinationUName] = useState(null);

    const [importingTemp, setImportingTemp] = useState(null);
    const resetFields=(e)=>{
        

    }
    async function ReceiveDrug()
    {
        console.log("PROCESSING DRUG"+serialNumber+importingTemp);
       /*  let post ={
            "CurrentUser": localStorage.getItem('currentUser'),
            "SerialNumber": serialNumber,
            "Location": 'Distributor',
            "ImportTemp": importingTemp
        }
 */
       // console.log(post);

        //Updated Contract Calls

        const accounts =await  web3.eth.getAccounts();
        console.log(accounts);
        let ret = await Contract.methods.Receving(serialNumber,importingTemp).send({from:accounts[0]});
        console.log("))))))))))))))))))))))))))))");
        console.log(ret);

        props.updateReceiving('success', 'Drug shipment details updated successfully.');
                console.log("Your Drug Has Been Received");
                

      /*   await fetch(localhost+"DistributorReceiving",{
            method:"POST",
            body:JSON.stringify(post),
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            }

        }).then((res)=>{
            if(res.status==200)
            {
                props.updateReceiving('success', 'Drug shipment details updated successfully.');
                console.log("Your Drug Has Been Received");
            }
            else{
                props.updateReceiving('failed', 'Something went wrong. Please check the values you have entered and try again');
                console.log(res.status);
                
            }
        }) */
    }
    async function processReceiving(e)
    {
        e.preventDefault();
        ReceiveDrug()
        
    }
    useEffect(() => {
        console.log(selectedDrugDetails);
        if (selectedDrugDetails) {
            setLocation(selectedDrugDetails.location);
            setSerialNumber(selectedDrugDetails.serialNumber);
            console.log(selectedDrugDetails);
        }
    }, [props, selectedDrugDetails]);


    
    return(   <div className="modal fade" id="receive-product" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modal-title" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content p-3">
            <div className="modal-header">
                <h4 className="modal-title helvetica-medium main-color fw-bold" id="modal-title">Receive Product</h4>
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
                       {/*  <div className="col-12 col-md-6 mb-2">
                            <label htmlFor="destination" className="form-label">Destination</label>
                            <select id="destination" className="form-select">
                                <option defaultValue='Distributor'>Distributor</option>
                                <option value="Select" disabled>Select</option>
                                <option value="Pharmacy">Pharmacy</option>
                                <option value="Wholesaler">Wholesaler</option>
                            </select>
                        </div> */}
                        <div className="col-12 col-md-6 d-flex">
                            <div className="col-6 me-2">
                                <label htmlFor="current-temp" className="form-label">Current Temp..</label>
                                <input id="current-temp" type="text" className="form-control" value={importingTemp} onChange={(e) => { setImportingTemp(e.target.value) }} />
                                
                            </div>
                           
                        </div>
                    </div>
                   {/*  <div className="row mb-2">
                        <div className="col-12 col-md-6">
                            <label htmlFor="destinationUName" className="form-label">Distributor Username</label>
                            <input id="destinationUName" type="text" className="form-control" value={destinationUName} onChange={(e) => { setDestinationUName(e.target.value) }} />
                        </div>
                        <div className="col-12 col-md-6 ">
                            <label htmlFor="date-time" className="form-label">Time</label>
                            <input id="date-time" type="time" className="form-control" />
                        </div>
                    </div> */}
                    <div className="row mb-2">
                        <div className="col-12 text-end">
                            <button className="btn btn-primary" type="submit" data-bs-dismiss="modal" onClick={(e) => { processReceiving(e) }}>Receive</button>
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
</div>);
     
       /* <>
        <div class="modal fade" id="receive-product" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modal-title" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content p-3">
                <div class="modal-header">
                    <h4 class="modal-title helvetica-medium main-color fw-bold" id="modal-title">Receive Product</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
    
                    <form class=" g-3 helvetica-light sub-color">
    
                        <div class="row mb-2">
                            <div class="col-12 col-md-6 ">
                                <label for="product-name" class="form-label">Product Name</label>
                                <input type="text" class="form-control" id="product-name" disabled value="Product 3" />
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="serial-number" class="form-label">Serial Number</label>
                                <input type="text" class="form-control" id="serial-number" disabled value="812047" />
                            </div>
    
                        </div>
                        <div class="row mb-2">
                            <div class="col-12 col-md-6">
                                <label for="batch-id" class="form-label">Batch ID</label>
                                <input type="text" class="form-control" id="batch-id" disabled value="379472" />
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="destination" class="form-label">Destination</label>
                                <select id="destination" class="form-select" disabled>
                                    <option >Select</option>
                                    <option value="Pharmacy">Pharmacy</option>
                                    <option selected value="Distributor">Distributor</option>
                                    <option value="Wholesaler">Wholesaler</option>
                                </select>
                            </div>
                        </div>
    
    
                        <div class="row  mb-2">
                            <div class="col-12 col-md-6 mb-2">
                                <label for="source" class="form-label">Source</label>
                                <select id="source" class="form-select" >
                                    <option selected>Select</option>
                                    <option value="Manufacturer 1">Manufacturer 1</option>
                                    <option value="Manufacturer">Manufacturer 2</option>
                                    <option value="Pharmacy">Manufacturer 3</option>
                                    <option value="Wholesaler">Manufacturer 4</option>
                                </select>
                            </div>
                            <div class="col-12 col-md-6 d-flex">
                                <div class="col-6 me-2">
                                    <label for="current-temp" class="form-label">Current Temp..</label>
                                    <input id="current-temp" type="text" class="form-control" />
                                </div>
                                <div class="col-6">
                                    <label for="scale" class="form-label">Scale</label>
                                    <select id="scale" class="form-select">
                                        <option selected>Select</option>
                                        <option value="Received">°F</option>
                                        <option value="na">NA</option>
                                    </select>
                                </div>
    
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-12 col-md-6">
                                <label for="date" class="form-label">Date</label>
                                <input id="date" type="date" class="form-control" />
                            </div>
                            <div class="col-12 col-md-6 ">
                                <label for="date-time" class="form-label">Time</label>
                                <input id="date-time" type="time" class="form-control" />
                            </div>
                        </div>
    
                        <div class="row mb-2">
                            <div class="col-12 text-end">
                                <button class="btn btn-primary" type="submit">Save</button>
                            </div>
                        </div>
    
                    </form>
                </div>
    
            </div>
        </div>
     </div> */
    
    
      
    
     }
     
     