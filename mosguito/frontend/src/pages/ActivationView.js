import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/authentication';
import ReactLoading from "react-loading";
import { BsCheckCircle, BsXCircle } from 'react-icons/bs';

const ActivationView = ({ message, verify }) => {

    const [verified, setVerified] = useState(undefined);
    const { uid, token } = useParams();

    useEffect(() => {

        verify(uid, token);

        if (message) {
            setVerified(false);
        }
        else {
            setVerified(true);
        }

    }, [])

    return (<>
        {verified === undefined ?
            <>
                <div style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    <ReactLoading className="d-grid mx-auto align-middle" type="spinningBubbles" color="black" />
                    <p className="text-center mt-3 align-middle fw-light">Account activation. Please wait...</p>
                </div>
            </>
            :
            <>
                {verified ?
                    <>
                        <div>
                            <div style={{
                                position: 'absolute', left: '50%', top: '50%',
                                transform: 'translate(-50%, -50%)'
                            }}>
                                <div className="d-flex align-items-center flex-column">
                                    <BsCheckCircle size={"100px"} color="green" />
                                </div>
                                <p className="text-center mt-3 align-middle fw-light">Account successfully activated. You can now try to <a href='/login'>login</a>.</p>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div>
                            <div style={{
                                position: 'absolute', left: '50%', top: '50%',
                                transform: 'translate(-50%, -50%)'
                            }}>
                                <div className="d-flex align-items-center flex-column">
                                    <BsXCircle size={"100px"} color="red" />
                                </div>
                                <p className="text-center mt-3 align-middle fw-light">It was not possible to activate this account.</p>
                            </div>
                        </div>
                    </>
                }
            </>
        }
    </>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message

});

export default connect(mapStateToProps, { verify })(ActivationView);