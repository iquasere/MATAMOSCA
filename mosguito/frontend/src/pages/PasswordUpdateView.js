import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { password_update } from '../actions/authentication';
import { BsShieldLock } from 'react-icons/bs';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { AlertBanner } from '@thumbtack/thumbprint-react';
import Constants from "../Constants";


const PasswordUpdateView = ({ password_update, message }) => {

    const [displayWarning, setDisplayWarning] = useState(false);
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [validated, setValidated] = useState(false);

    const { uid, token } = useParams();

    const handleClick = (event) => {

        event.preventDefault();

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);

        if (form.checkValidity()) {

            password_update(uid, token, password1, password2);
            setDisplayWarning(true);

        }
    };

    return (
        <div className='container'>
            <p className='fw-light mt-5 fs-4' style={{ paddingTop: "40px" }}> <BsShieldLock size={"50px"} />Password Update</p>
            <hr />
            <Form className='fw-light mt-4' noValidate validated={validated} >
                <Row className="row justify-content-center align-items-center mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name='password1' type="password" placeholder="Password" required value={password1}
                            onChange={(event) => { setPassword1(event.target.value); }} />
                        <Form.Control.Feedback type="invalid">Please provide a valid password.</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="row justify-content-center align-items-center mb-4">
                    <Form.Group as={Col} md="4" controlId="validationCustom05">
                        <Form.Label>Password confirmation</Form.Label>
                        <Form.Control name='password2' type="password" placeholder="Password" required value={password2}
                            onChange={(event) => { setPassword2(event.target.value); }} />
                        <Form.Control.Feedback type="invalid">Please provide a valid password.</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                {displayWarning &&
                    <>
                        {message ?
                            <AlertBanner theme="warning">
                                {message}
                            </AlertBanner>
                            :
                            <>
                                {message === null &&
                                    window.open(Constants.mosguito_api_url + "utilities/password-update-success/", "_top")
                                }
                            </>
                        }
                    </>
                }

                <Button className="d-grid mx-auto mt-4" style={{ marginBottom: "-60px" }} variant="outline-secondary" onClick={(event) => {handleClick(event)}}>Update password</Button>
            </Form>

        </div>

    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message

});

export default connect(mapStateToProps, { password_update })(PasswordUpdateView);