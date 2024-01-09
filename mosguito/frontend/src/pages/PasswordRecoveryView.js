import React, { useState } from 'react';
import { connect } from 'react-redux';
import { password_recovery } from '../actions/authentication';
import { BsShieldLock } from 'react-icons/bs';
import { Form, InputGroup, Button, Row, Col } from 'react-bootstrap';
import { AlertBanner } from '@thumbtack/thumbprint-react';
import Constants from "../Constants";

const PasswordRecoveryView = ({ password_recovery, message }) => {

    const [displayWarning, setDisplayWarning] = useState(false);
    const [username, setUsername] = useState("");
    const [validated, setValidated] = useState(false);

    const handleClick = (event) => {

        event.preventDefault();

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);

        if (form.checkValidity()) {

            password_recovery(username);
            setDisplayWarning(true);

        }
    };

    return (
        <div className='container'>
            <p className='fw-light mt-5 fs-4' style={{ paddingTop: "40px" }}> <BsShieldLock size={"50px"} />Password Recovery</p>
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
                                required
                                value={username}
                                onChange={(event) => { setUsername(event.target.value); }}
                            />
                            <Form.Control.Feedback type="invalid">Please enter a username.</Form.Control.Feedback>
                        </InputGroup>
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
                                    window.open(Constants.mosguito_api_url + "utilities/password-recovery-success/", "_top")
                                }
                            </>
                        }
                    </>
                }

                <Button className="d-grid mx-auto mt-4" style={{ marginBottom: "-60px" }} variant="outline-secondary" onClick={(event) => {handleClick(event)}}>Send password update email</Button>
            </Form>

        </div>

    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message

});

export default connect(mapStateToProps, { password_recovery })(PasswordRecoveryView);