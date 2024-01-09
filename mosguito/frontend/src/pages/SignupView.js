import React, { useState } from 'react';
import Constants from '../Constants';
import axios from 'axios';
import { Form, Button, Col, Row, InputGroup, Modal } from 'react-bootstrap';
import { BsPencilSquare } from "react-icons/bs"
import { Link, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { AlertBanner } from '@thumbtack/thumbprint-react';

const SignupView = () => {

    const [validated, setValidated] = useState(false);
    const [displayWarning, setDisplayWarning] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const [message, setMessage] = useState(null);

    const register = async (username, email, first_name, last_name, password1, password2) => {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            }
        };
    
        const body = JSON.stringify({ username, email, first_name, last_name, password1, password2 });
    
        try {
            const res = await axios.post(Constants.mosguito_api_url + 'authentication/register', body, config);

            if (res.data.error) {
                setMessage(res.data.error);
            } else {
                setMessage(null);
                setModalShow(true)
            }
        } catch (err) {
            setMessage("Something went wrong when registering the new account. Please try again later.");
        }
    };

    const handleSubmit = (event) => {

        event.preventDefault();
        setDisplayWarning(true);

        const form = event.currentTarget;

        if (form.checkValidity()) {
            register(username, email, first_name, last_name, password1, password2);
        }
        else {
            event.stopPropagation();
        }
        setValidated(true);

    }


    function SignupSuccessModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Successfully registered
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Please check your mailbox to activate your account.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const handleSuccess = () => {
        setModalShow(false)
        window.open("/login")
    }



    return (
        <div className='container'>
            <p className='fw-light mt-5 fs-4' style={{ paddingTop: "40px"}}> <BsPencilSquare size={"50px"} /> Registration Form</p>
            <hr />
            <Form className='fw-light mt-4' noValidate validated={validated} >
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                        <Form.Label>Username</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                name='username'
                                type="text"
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend"
                                required
                                value={username}
                                onChange={(event) => { setUsername(event.target.value); }}
                            />
                            <Form.Control.Feedback type="invalid">Please enter a username.</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            name='first_name'
                            required
                            type="text"
                            placeholder="First name"
                            value={first_name}
                            onChange={(event) => { setFirstName(event.target.value); }}
                        />
                        <Form.Control.Feedback type="invalid">Please enter your first Name.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            name='last_name'
                            required
                            type="text"
                            placeholder="Last name"
                            value={last_name}
                            onChange={(event) => { setLastName(event.target.value); }}
                        />
                        <Form.Control.Feedback type="invalid">Please enter your first Name.</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationCustom03">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name='email' type="email" placeholder="Email" required value={email}
                            onChange={(event) => { setEmail(event.target.value); }} />
                        <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-4">
                    <Form.Group as={Col} md="6" controlId="validationCustom04">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name='password1' type="password" placeholder="Password" required value={password1}
                            onChange={(event) => { setPassword1(event.target.value); }} />
                        <Form.Control.Feedback type="invalid">Please provide a valid password.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom05">
                        <Form.Label>Password confirmation</Form.Label>
                        <Form.Control name='password2' type="password" placeholder="Password" required value={password2}
                            onChange={(event) => { setPassword2(event.target.value); }} />
                        <Form.Control.Feedback type="invalid">Please provide a valid password.</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <SignupSuccessModal
                    show={modalShow}
                    onHide={() => handleSuccess()}
                />
                {displayWarning &&
                    <>
                        {message &&
                            <AlertBanner theme="warning">
                                {message}
                            </AlertBanner>
                        }
                    </>
                }

                <Button className="d-grid mx-auto mt-4" variant="outline-secondary" onClick={(event) => {handleSubmit(event)}}>Register</Button>
                <div className="d-grid mx-auto" style={{ marginBottom: "-60px" }} >
                    <Form.Text className='fw-light' style={{ textAlign: "center" }}>Already have an account? <Link to={"/login"}>Login</Link></Form.Text>
                </div>
            </Form>

        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { })(SignupView);