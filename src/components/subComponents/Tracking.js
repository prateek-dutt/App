import { each } from "jquery";
import React, { useEffect,useState } from "react";
import $ from 'jquery';
import web3 from "../../web3";
import Contract,{abi,address} from '../../helper';
export default function Tracking(props)
{

    const [style, setStyle] = useState({display: 'none'});
    const[manList,setManList] = useState([]);
   // const[distlist,setDistList] = useState([]);
    const[wholedistist, setWholeDistList] = useState([]);
    
    const ManStatus="";
    
    const {drugs,drugDL,distlist,wholesalerlist,pharmalist,overview,selectedDetails,sendUpdateDetails} =props;
    console.log(drugs);
    const currentUser= localStorage.getItem('currentUser');
    
    function Map()
    {

    }
    function getShipmentStaus(n, type)
    {   
        let a;
        console.log("Man++++++++++"+type);
        if(type==="Manufacturer"){
        console.log("+++++++++++++++",n);
        drugDL.forEach(element => {
            if(element.serialNumber===n)
            {
                a=element.DrugStatus;
            }
        });
        //console.log(a);
        return a;
    }
    if(type==="Distributor"){
        console.log("DIST++++++++++++++++++");
        distlist.forEach(element => {
            if(element.serialNumber===n)
            {
             a=element.DrugStatus;
            }
        });
        return a;
    }
    if(type==="Wholesaler"){
        
        wholesalerlist.forEach(element => {
            if(element.serialNumber===n)
            {
             a=element.DrugStatus;
            }
        });
        return a;
    }
    if(type==="Pharmacy"){
        
        console.log("PHARMA +++++++",);
        pharmalist.forEach(element => {
            if(element.serialNumber===n)
            {
             a=element.DrugStatus;
            }
        });
    }
        //console.log(a.DrugStatus);
       return a;
    }

    function showSerialNumber(n){
        $("."+n).css('display','block')
    }

    function  hideSerialNumber(n) { 
        $("."+n).css('display','none');
     }

     
    useEffect(()=>
    {
        
        //fetchRoles();
        console.log(drugDL);
        
    },[props])

    return(
        <>
        
         {drugs.map((drug, index) => {
            
            return (
                <tr key={index}>
                    {}
                    <td className="qrcode" ><img src={`http://api.qrserver.com/v1/create-qr-code/?data=${drug.serialNumber}`} 
                    alt="#"  width="50"height="50" 
                    onMouseEnter={e => { 
                    showSerialNumber(drug.serialNumber) }}
                     onMouseLeave={e => { hideSerialNumber(drug.serialNumber); }}/>
                    <div style={style} className={drug.serialNumber}>{drug.serialNumber}</div>
                    </td>
                    <td>{drug.name}</td>
                    <td>{drug.batchId}</td>
                    <td>{drug.status ? 'Inactive' : 'Active'}</td>
                  
                    <td><span className={drug.Status ==="Manufactured" ? "processing" : "complete"}>{getShipmentStaus(drug.serialNumber,"Manufacturer")==="Shipped" ? "complete" :"Manufactured"}</span></td>
                    <td><span className={getShipmentStaus(drug.serialNumber,"Distributor") ==="" ? "not-available" :(getShipmentStaus(drug.serialNumber,"Distributor")==="Shipped"?"complete":"processing")}>
                        {getShipmentStaus(drug.serialNumber,"Distributor") ==="" ? "not-available" :(getShipmentStaus(drug.serialNumber,"Distributor")==="Shipped"?"complete":"processing")}</span></td>

                        <td><span className={getShipmentStaus(drug.serialNumber,"Wholesaler") ==="" ? "not-available" :(getShipmentStaus(drug.serialNumber,"Wholesaler")==="Shipped"?"complete":"processing")}>
                        {getShipmentStaus(drug.serialNumber,"Wholesaler") ==="" ? "not-available" :(getShipmentStaus(drug.serialNumber,"Wholesaler")==="Shipped"?"complete":"processing")}</span></td>
                    <td><span className={getShipmentStaus(drug.serialNumber,"Pharmacy")==="Received"?"complete":"not-available"}>{getShipmentStaus(drug.serialNumber,"Pharmacy")==="Received"?"complete":"not-available"}</span></td>
                   
                    
                   {/*  {!isOverview && <td><span className={drug.shipmentStatus ==="Manufactured" ? "processing" : "complete"}>{ManStatus==="Shipped" ? "Complete" :"Processing"}</span></td>}
                    {!isOverview && <td><span className={distStatus==="" || distStatus==="Recieved" ? "processing" : "complete"}>{distStatus===""?"Waiting":distStatus==="Shipped"?"Complete":"Received"}</span></td>}
                    {!isOverview && <td><span className={ wholeSalerStatus===""|| wholeSalerStatus==="Received"? "processing" : "complete"}>{wholeSalerStatus===""?"Waiting":wholeSalerStatus==="Shipped"?"Complete":"Received"}</span></td>} */}
{/*                                                             {!isOverview && <td><span className={pharmacyStatus===""? "processing" : "complete"}>{pharmacyStatus==="" ? "Waiting" : "Received"}</span></td>}
*/}                                                            <td><a href={`/shipment-progress?id=${drug.serialNumber}`} type="button"  className="btn btn-outline-primary">Details</a></td>
                    {currentUser===drug.owner && drug.shipmentStatus==='Manufactured' && <td><a href="#" data-bs-toggle="modal" data-bs-target="#shipped-product" type="button" className="btn btn-outline-primary" onClick={() => {selectedDetails(drug); sendUpdateDetails(drug)}}>Ship</a></td>}
                </tr>
            );
        })}
        
        
        </>
    )
}