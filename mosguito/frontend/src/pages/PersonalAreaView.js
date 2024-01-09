import { ProSidebar, Menu, MenuItem, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link, Navigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaUserCog } from 'react-icons/fa';
import { ImPencil2 } from 'react-icons/im';
import AccountSettingsView from './AccountSettingsView';
import { Row, Col } from 'rsuite';
import { Toaster } from 'react-hot-toast';


const PersonalAreaView = ({ isAuthenticated }) => {

    const { tab } = useParams();
    const[searchparams]=useSearchParams()
    const sid = searchparams.get('sid') 
    return (
        <div className='fw-light container' style={{ marginTop: "40px" }}>
            <Toaster position="top-center" reverseOrder={false} />
            { isAuthenticated ?
                <Row>
                    <Col>
                        <ProSidebar className='container' style={{ marginTop: "30px", marginLeft: "-20px", marginRight: "20px", color: "#2B2B2B" }} >
                            <SidebarContent>
                                <Menu iconShape="circle" style={{ backgroundColor: "#F8F9FA" }} >
                                    <MenuItem icon={<FaUserCog style={{ color: "#F8F9FA" }} />} ><Link to={"/personal-area/account-settings"}><b style={{ color: "black" }}>Account Settings</b></Link></MenuItem>
                                </Menu>
                            </SidebarContent>
                        </ProSidebar>
                    </Col>
                    <Col style={{ marginTop: "30px", width: `calc(100% - 310px)` }}>
                        { tab === "account-settings" && <AccountSettingsView />}
                    </Col>
                </Row>
                :
                <Navigate to={"/"} />
            }
        </div>
    )

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message,
    first_name: state.profile.first_name,
    last_name: state.profile.last_name,
    username: state.profile.username
});

export default connect(mapStateToProps, { })(PersonalAreaView);