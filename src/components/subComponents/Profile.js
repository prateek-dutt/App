import { useEffect, useState } from "react";
//import Supplychain from '../../Helper';

export default function Profile() {
    const [details, setDetails] = useState(null);
    const currentUser = localStorage.getItem("currentUser");
    console.log(currentUser);
    var Role;
    const localhost = "http://localhost:3000/api/";
    useEffect(() => {
        

        fetch(localhost + "UserDetails/" + currentUser)
            .then((result) => result.json())
            .then((result) => {
                setDetails({
                    name: result.Name,
                    email: result.Email,
                    contact: result.ContactNo,
                    role: result.Role,
                });
            });
        /*   try {

            
                Supplychain.methods.BatchUserDetails(currentUser).call().then(result => {
                    setDetails({ name: result.Name, email: result.Email, contact: result.ContactNo, role: result.Role });
                })
            } catch (error) {
                throw error
            } */
    }, []);

    return ( <
        section class = "profile-section mt-4 mx-4" >
        <
        div class = "container-fluid" >
        <
        div class = "row" >
        <
        div class = "profile-content d-flex flex-wrap bg-white px-4 py-3  rounded" >
        <
        div class = "profile-img me-4" >
        <
        img class = "img-fluid rounded-pill h-auto"
        alt = "profile Image"
        src = "./images/default-profile-img.jpg"
        width = "100px" /
        >
        <
        /div> <
        div className = "profile-details d-flex align-items-center flex-wrap mt-3" >
        <
        div className = "personal me-5" >
        <
        div className = "name d-flex " >
        <
        h6 className = "fw-bold me-3" > Name < /h6> <
        p > { details && details.name } < /p> <
        /div> <
        div className = "role d-flex " >
        <
        h6 className = "fw-bold me-3" > Role < /h6> <
        p > { details && details.role } < /p> <
        /div> <
        /div> <
        div className = "contact ms-md-5 me-3" >
        <
        div className = "contact d-flex" >
        <
        h6 className = "fw-bold me-3" > Contact No. < /h6> <
        p > { details && details.contact } < /p> <
        /div> <
        div className = "email d-flex" >
        <
        h6 className = "fw-bold me-3" > Email ID < /h6> <
        p > { details && details.email } < /p> <
        /div> <
        /div> <
        /div> <
        /div> <
        /div> <
        /div> <
        /section>
    );
}