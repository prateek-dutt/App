import './Login.css';
//import Supplychain from '../../Helper';
import { useEffect, useState } from 'react';
import { type } from '@testing-library/user-event/dist/type';
//import web3 from '../../web3';

export default function Login() {
    //const ethereum = window.ethereum;
    //localStorage.setItem("isAuthenticated", false);
    

    const localhost =" http://localhost:3000/api/";
    const [result, setResult] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');

    useEffect(() => {
        result ? setLoggedIn(true) : setLoggedIn(false);
    }, [result])

    useEffect(() => {
        localStorage.removeItem('currentUser');
    },[])
    /* function getMeta() {
        ethereum.request({ method: 'eth_requestAccounts' });
    } */

    async function onSubmit(event) {
        event.preventDefault();
        console.log("hello");
         try {
           /*  await  fetch("http://localhost:3000/api/Authenticate/"+name+"/"+pass).then(res => {
                console.log(res.text());
                if(res.text()) {
                    res=res.text();
                    console.log(res)
                    setResult(res);
                    console.log(res);
                    localStorage.setItem("isAuthenticated", true);
                    localStorage.setItem("currentUser", name);
                    res ? window.location.pathname = "/login" : window.location.pathname = "/dashboard";
                }
                else{
                    console.log("No")
                }
            }); */  
           
        
            await fetch("http://localhost:3000/api/Authenticate/"+name+"/"+pass).then(res => 
                
               res.json())
               

    .then((res)=>{
        if(res)
        {
           setResult(res);
           localStorage.setItem("isAuthenticated", true);
           localStorage.setItem("currentUser", name);
        loggedIn ? window.location.pathname = "/login" : window.location.pathname = "/dashboard";
        }
      
    }

        );
            
        } catch (error) {
            console.log(error);
            throw error
        } 
    }

    return (
        <main id="main">
            <section className="login-section">
                <div className="container-fluid">
                    <div className="row justify-content-center pt-5">
                        <div className="login-block bg-white m-5 p-lg-5 p-3 col-lg-5 col-md-5 col-sm-6 col-8">
                            <h3 className="text-center mb-4 fw-bold">Welcome to Pharma Supply Chain</h3>
                            {/* <div className="login-header">
                                <button className="btn btn-primary d-block mx-auto mb-4" onClick={() => getMeta()} >Get MetaMask</button>
                                <hr className="mb-4" />
                                <h6 className="text-center">or login with your credentials</h6>
                            </div> */}
                            <form className="login-form" onSubmit={(e) => onSubmit(e)}>
                                <div className="mb-4">
                                    <label htmlFor="username" className="form-label">User Name</label>
                                    <input type="text" className="form-control" id="username" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" value={pass} onChange={(e) => setPass(e.target.value)} required />
                                </div>
                                <div className=" mb-4 d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="remember-me" />
                                        <label className="form-check-label" htmlFor="remember-me">Remember me</label>
                                    </div>
                                    <a href="/" className="text-body">Forgot password?</a>
                                </div>
                                <div className="mb-2 d-flex justify-content-end ">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </section>
        </main>
    )
} 