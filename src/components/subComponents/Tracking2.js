import { each } from "jquery";
import React, { useEffect,useState } from "react";
import $ from 'jquery';
import { useLocation } from "react-router-dom";

export default function Tracking(props)
{
    const [manufacturer, setManufacturer] = useState({});
    const [distributor, setDistributor] = useState({});
    const [wholesaler, setWholesaler] = useState({});
    const [pharmacy, setPharmacy] = useState({});
    const localhost = "http://localhost:3000/api/";
    const [style, setStyle] = useState({display: 'none'});
    const[manList,setManList] = useState([]);
   // const[distlist,setDistList] = useState([]);
    const[wholedistist, setWholeDistList] = useState([]);
    
    const ManStatus="";
    const {drugs,drugDL,distlist,wholesalerlist,pharmalist,overview,selectedDetails,sendUpdateDetails} =props;
    const currentUser= localStorage.getItem('currentUser');
    // console.log('00000000000000000000000000000000000000000000000000000000');
    // console.log(props);
    function dateToEpoch(date) {
        return Math.floor(new Date(date).getTime() / 1000.0)
    }

    function epochToDate(epoch = Math.floor(new Date().getTime() / 1000.0)) {
        const date = new Date(epoch * 1000);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    }

   async function getManufacturerDetails(serialNo) {
        await fetch(localhost+"ManufacturerDetails/"+serialNo).then(res=>res.json()).
        then((res)=>{
           
            return res.DrugStatus;

        }
        );

  //   console.log("Manufacture Details Added");

    }
  
    async function getDistributorDetails(serialNo)
    {

       await fetch(localhost+"DistributorDetails/"+serialNo).then(res=>res.json()).
        then((res)=>{
            return res.DrugStatus;
        }
        );

    // console.log("Distributor Details Added");
    }
   
    async function getWholesalerDetails(serialNo)
    {
        await fetch(localhost+"WholesalerDetails/"+serialNo).then(res=>res.json()).
        then((res)=>{
            return res.DrugStatus;

        }
        );

   //  console.log("Distributor Details Added");
    }
    async  function getPharmacyDetails(serialNo)
    {
        await fetch(localhost+"PharmacyDetails/"+serialNo).then(res=>res.json()).
        then((res)=>{
            return res.DrugStatus;
        }
        );

    // console.log("Distributor Details Added");
    }
   
    
    
   
    function Map()
    {

    }
    function getShipmentStaus(n, type)
    {   
        let a;
        
        // console.log("Man++++++++++"+type);
        if(type==="Manufacturer"){
        // console.log("+++++++++++++++",n);
        drugDL.forEach(element => {
            if(element.serialNumber===n)
            {
                
                a=getManufacturerDetails(n);
            }
        });
        //console.log(a);
        return a;
    }
    if(type==="Distributor"){
       // console.log("DIST++++++++++++++++++");
        distlist.forEach(element => {
            if(element.serialNumber===n)
            {
             a=getDistributorDetails(n);
            }
            console.log(a);
        });
        return a;
    }
    if(type==="Wholesaler"){
        
        wholesalerlist.forEach(element => {
            if(element.serialNumber===n)
            {
             a=getWholesalerDetails(n)
            }
        });
        return a;
    }
    if(type==="Pharmacy"){
        
        //console.log("PHARMA +++++++",);
        pharmalist.forEach(element => {
            if(element.serialNumber===n)
            {
             a= getPharmacyDetails(n);
            }
        });
    }
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
                  
                    <td><span className="">{getShipmentStaus(drug.serialNumber,"Manufacturer")==="Shipped" ? "Complete" :"processing"}</span></td>
                     <td><span className={drug.shipmentStatus ==="" ? "processing" : "complete"}>{getShipmentStaus(drug.serialNumber,"Distributor")==="" ? "Waiting" :getShipmentStaus(drug.serialNumber,"Distributor")==="Shipped"?"Complete":" "}</span></td>
                   <td><span className={drug.shipmentStatus ==="" ? "processing" : "complete"}>{getShipmentStaus(drug.serialNumber,"Wholesaler")==="" ? "Waiting" :getShipmentStaus(drug.serialNumber,"Wholesaler")==="Shipped"?"Complete":"Processing"}</span></td>
                    <td><span className={drug.shipmentStatus ==="" ? "processing" : "complete"}>{getShipmentStaus(drug.serialNumber,"Pharmacy")==="" ? "Waiting" :"Complete"}</span></td>
                   
                    
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