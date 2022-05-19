

import {React,useState} from "react";

import $ from 'jquery';

export default function Overview(props)
{
    const [style, setStyle] = useState({display: 'none'});

    const {drugs,overview,selectedDetails,sendUpdateDetails} =props;
    const currentUser= localStorage.getItem('currentUser');

    function showSerialNumber(n){
        $("."+n).css('display','block')
    }

    function  hideSerialNumber(n) { 
        $("."+n).css('display','none');
     }

    return(

        <>
        {drugs.map((drug, index) => {
            ;
            return (
                <tr key={index}>
                    
                    <td className="qrcode" ><img src={`http://api.qrserver.com/v1/create-qr-code/?data=${drug.serialNumber}`} 
                    alt="#"  width="50"height="50" 
                    onMouseEnter={e => { console.log(e);
                    showSerialNumber(drug.serialNumber) }}
                     onMouseLeave={e => { hideSerialNumber(drug.serialNumber); }}/>
                    <div style={style} className={drug.serialNumber}>{drug.serialNumber}</div>
                    </td>
                    <td>{drug.name}</td>
                    <td>{drug.batchId}</td>
                  

                    <td> <span className={drug.status ? 'not-available' : 'complete'}>{drug.status ? 'Inactive' : 'Active'}</span></td>
                    {<td><span className={drug.location.toLowerCase()}>{drug.location}</span></td>}
                    {  <td>{drug.shipmentStatus}</td>}

                   {/*  {!isOverview && <td><span className={drug.shipmentStatus ==="Manufactured" ? "processing" : "complete"}>{ManStatus==="Shipped" ? "Complete" :"Processing"}</span></td>}
                    {!isOverview && <td><span className={distStatus==="" || distStatus==="Recieved" ? "processing" : "complete"}>{distStatus===""?"Waiting":distStatus==="Shipped"?"Complete":"Received"}</span></td>}
                    {!isOverview && <td><span className={ wholeSalerStatus===""|| wholeSalerStatus==="Received"? "processing" : "complete"}>{wholeSalerStatus===""?"Waiting":wholeSalerStatus==="Shipped"?"Complete":"Received"}</span></td>} */}
{/*                                                             {!isOverview && <td><span className={pharmacyStatus===""? "processing" : "complete"}>{pharmacyStatus==="" ? "Waiting" : "Received"}</span></td>}
*/}                                                            <td><a href={`/shipment-progress?id=${drug.serialNumber}`} type="button"  className="btn btn-outline-primary">Details</a></td>
                    {currentUser===drug.owner && drug.shipmentStatus==='Manufactured'   && <td><a href="#" data-bs-toggle="modal" data-bs-target="#shipped-product" type="button" className="btn btn-outline-primary" onClick={() => {selectedDetails(drug); sendUpdateDetails(drug)}}>Ship</a></td>}
                    {currentUser===drug.owner && drug.shipmentStatus==='Received' && drug.location != "Pharmacy"  && <td><a href="#" data-bs-toggle="modal" data-bs-target="#shipped-product" type="button" className="btn btn-outline-primary" onClick={() => {selectedDetails(drug); sendUpdateDetails(drug)}}>Ship</a></td>}
                    {currentUser===drug.nextOwner && drug.shipmentStatus==='Shipped'  && <td><a href="#" data-bs-toggle="modal" data-bs-target="#receive-product" type="button" className="btn btn-outline-primary" onClick={() => {selectedDetails(drug); sendUpdateDetails(drug)}}>Receive</a></td>}
                </tr>
            );
        })}
        </>
    )

}


