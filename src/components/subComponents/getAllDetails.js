import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header/Header";
import $ from "jquery";

export default function ShipmentTree() {

    const search = useLocation().search;
    const serialNo = new URLSearchParams(search).get('id');
  
    const localhost = "http://localhost:3000/api/";

    const [manufacturer, setManufacturer] = useState({});
    const [distributor, setDistributor] = useState({});
    const [wholesaler, setWholesaler] = useState({});
    const [pharmacy, setPharmacy] = useState({});
    const [drug, setDrug] = useState({})


    function dateToEpoch(date) {
        return Math.floor(new Date(date).getTime() / 1000.0)
    }

    function epochToDate(epoch = Math.floor(new Date().getTime() / 1000.0)) {
        const date = new Date(epoch * 1000);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
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
     //       console.log(res);
            setPharmacy(res);
     //       console.log('-----------------------------------------------------------------');
     //       console.log(pharmacy);

        }
        );

    // console.log("Distributor Details Added");
    }
    function setManufacturerDetails(drug) {
           getManufacturerDetails();
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
}