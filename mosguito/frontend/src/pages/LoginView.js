import React, { useState, useEffect, useCallback } from 'react';
import { BiLogInCircle } from "react-icons/bi";
import { Form, Button, Col, Row, InputGroup } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { login, authlogin } from '../actions/authentication';
import { connect } from 'react-redux';
import { AlertBanner } from '@thumbtack/thumbprint-react';
import toast, { Toaster } from 'react-hot-toast';
//import { GoogleLogin } from 'react-google-login';
//import { gapi } from 'gapi-script';
//import Constants from '../Constants';


const LoginView = ({ login, isAuthenticated, message }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);
    const [displayWarning, setDisplayWarning] = useState(false);

    // const clientId = Constants.googleClientId;

    /*
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: 'profile email'
            });
        };
        // gapi.load('client:auth2', initClient);
    });
    */

    const onGoogleLoginSuccess = useCallback(
        response => {
            const idToken = response.tokenId;
            const email = response.profileObj.email;
            const first_name = response.profileObj.givenName;
            const last_name = response.profileObj.familyName;
            authlogin(email, first_name, last_name);
        },
    );

    //const onGoogleLoginFailure = ()=>{}

    const handleSubmit = (event) => {

        event.preventDefault();
        setDisplayWarning(true);

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            login(username, password);
        }
        setValidated(true);

        if (message === null){
            toast.success("User successfully authenticated");
        }
    }

    return (
        <>
            {!isAuthenticated ?
                <div className='container'>
                <Toaster position="top-center" reverseOrder={false} />
                <p className='fw-light mt-5 fs-4' style={{ paddingTop: "40px" }}> <BiLogInCircle size={"50px"} />Login</p>
                <hr />
                <Form className='fw-light mt-4' noValidate validated={validated} >
                    <Row className="row justify-content-center align-items-center mb-3">
                        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                            <Form.Label>Username</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    name='username'
                                    type="text"
                                    placeholder="Username"
                                    aria-describedby="inputGroupPrepend"
                                    autoComplete="username"
                                    required
                                    value={username}
                                    onChange={(event) => { setUsername(event.target.value); }}
                                />
                                <Form.Control.Feedback type="invalid">Please enter a username.</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="row justify-content-center align-items-center mb-4">
                        <Form.Group as={Col} md="4" controlId="validationCustom04">
                            <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name='password'
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    autoComplete="current-password"
                                onChange={(event) => { setPassword(event.target.value); }} />
                            <Form.Control.Feedback type="invalid">Please provide a valid password.</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
    
                    {displayWarning &&
                        <>
                            {message &&
                                <AlertBanner theme="warning">
                                    {message}
                                </AlertBanner>
                            }
                        </>
                    }
    
                    <Button className="d-grid mx-auto mt-4" variant="outline-secondary" onClick={(event) => {handleSubmit(event)}}>Login</Button>
                        <div className="d-grid mx-auto">
                        <Form.Text className='fw-light' style={{ textAlign: "center" }}>Register a new account? <Link to={"/signup"}>Sign up</Link></Form.Text>
                        <Form.Text className='fw-light' style={{ textAlign: "center" }}><Link to={"/password-recovery"}>Forgot password?</Link></Form.Text>
                    </div>
                    </Form>
                    {/* 
                    <div className='d-flex justify-content-center mt-5 aligns-items-center'>
                        <GoogleLogin
                            clientId={clientId}
                            buttonText="Sign in with Google"
                            onSuccess={onGoogleLoginSuccess}
                            onFailure={onGoogleLoginFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={false}
                        />
                    </div>
                */}
            </div>
            :
            <Navigate to='/' />
        }
        </>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message,
});

export default connect(mapStateToProps, { login })(LoginView);