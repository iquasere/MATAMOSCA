import 'react-pro-sidebar/dist/css/styles.css';
import { connect } from 'react-redux';
import { Row, Input, Stack, Button } from 'rsuite';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { update_username, update_user_info, delete_user } from '../actions/authentication';
import { AlertBanner } from '@thumbtack/thumbprint-react';
import toast from 'react-hot-toast';
import { IoWarningOutline } from "react-icons/io5";


const AccountSettingsView = ({ username, first_name, last_name, message, update_user_info, update_username, delete_user }) => {

    const [new_username, setNewUsername] = useState(username);
    const [new_first_name, setNewFirstName] = useState(first_name);
    const [new_last_name, setNewLastName] = useState(last_name);
    const [open, setOpen] = useState(false);

    const [displayDeleteRequestWarning, setDisplayDeleteRequestWarning] = useState(false);
    const [displayUsernameRequestWarning, setDisplayUsernameRequestWarning] = useState(false);
    const [displayUserInfoRequestWarning, setDisplayUserInfoRequestWarning] = useState(false);

    const handleConfirmation = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeUserInfo = () => {

        setDisplayUsernameRequestWarning(false);
        setDisplayDeleteRequestWarning(false);
        setDisplayUserInfoRequestWarning(false);

        update_user_info(new_first_name, new_last_name);
        setDisplayUserInfoRequestWarning(true);

    }

    const handleDeleteAccount = () => {

        setDisplayUserInfoRequestWarning(false);
        setDisplayUsernameRequestWarning(false);
        setDisplayDeleteRequestWarning(false);

        setOpen(false);
        delete_user();
        setDisplayDeleteRequestWarning(true);

    }

    const handleSuccess = (message_) => {
        toast.success(message_);
        setDisplayUserInfoRequestWarning(false);
        setDisplayUsernameRequestWarning(false);
        setDisplayDeleteRequestWarning(false);
    };

    return (
        <>
            <div className='container' >
                <div style={{ fontSize: "30px", marginTop: "15px" }}><b>User profile</b></div>
                <hr className='mb-5' />
                <p style={{ marginTop: "20px", marginBottom: "5px", fontSize: "13px" }}>Username</p>
                <Stack style={{ marginBottom: "50px" }} direction="row" spacing={6} >
                    <Input readOnly style={{ borderColor: "lightgray", marginBottom: "-3px", borderTop: "none", borderLeft: "none", borderRight: "none", borderRadius: 0, boxShadow: "none" }} value={new_username} />
                </Stack>

                <p style={{ fontSize: "20px", marginTop: "20px" }}><b>Update personal information</b></p>
                <p style={{ marginTop: "20px", marginBottom: "5px", fontSize: "13px" }}>First name</p>
                <Input style={{ borderColor: "lightgray", marginBottom: "-3px", borderTop: "none", borderLeft: "none", borderRight: "none", borderRadius: 0, boxShadow: "none" }} value={new_first_name} onChange={(value) => { setNewFirstName(value) }} />
                <p style={{ marginTop: "20px", marginBottom: "5px", fontSize: "13px" }}>Last Name</p>
                <Input style={{ borderColor: "lightgray", marginBottom: "-3px", borderTop: "none", borderLeft: "none", borderRight: "none", borderRadius: 0, boxShadow: "none" }} value={new_last_name} onChange={(value) => { setNewLastName(value) }} />
                <Row style={{ display: "flex", justifyContent: "center" }}>
                    <Button style={{ marginBottom: "30px", marginTop: "20px" }} type="submit" appearance="default" onClick={() => { handleChangeUserInfo() }}>Update personal information</Button>
                </Row>

                {displayUserInfoRequestWarning &&
                    <>
                        {message ?
                            <div style={{ marginTop: "-30px", marginBottom: "50px" }}>
                                <AlertBanner theme="warning">
                                    {message}
                                </AlertBanner>
                            </div>
                            :
                            handleSuccess('User informations successfully updated')
                        }
                    </>
                }

                <p style={{ fontSize: "20px", marginTop: "20px" }}><b>Detele account</b></p>
                <p>
                    Deleting an account entails that all user's comments, ratings and solutions will
                    be permanently removed from the database.
                </p>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                    <Button style={{ marginTop: "10px", width: "140px" }} type="submit" onClick={() => { handleConfirmation() }} color="red" appearance="ghost">Delete account</Button>
                </Row>

                {displayDeleteRequestWarning &&
                    <>
                        {message ?
                            <div style={{ marginTop: "-30px", marginBottom: "50px" }}>
                                <AlertBanner theme="warning">
                                    {message}
                                </AlertBanner>
                            </div>
                            :
                            handleSuccess('Account successfully deleted')
                        }
                    </>
                }

                <Dialog
                    open={open}
                    onClose={(event, reason) => {
                        if (reason !== 'backdropClick') {
                            handleClose(event, reason);
                        }
                    }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <IoWarningOutline color='#8f1300' />
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Be aware that this action cannot be reversed. All information related to
                            your user will be lost. Proceed anyway?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" onClick={() => { handleClose() }}>Cancel</Button>
                        <Button type="submit" style={{ color: "#8f1300" }} onClick={() => { handleDeleteAccount() }}>Proceed</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    message: state.auth.message,
    first_name: state.profile.first_name,
    last_name: state.profile.last_name,
    username: state.profile.username
});

export default connect(mapStateToProps, { update_username, update_user_info, delete_user })(AccountSettingsView);