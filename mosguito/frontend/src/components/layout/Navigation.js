import { Nav, Navbar } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";
import { ImSearch } from "react-icons/im";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from '../../actions/authentication';
import { Whisper, Tooltip } from "rsuite";
import mosca from './mosca-h-100.png';

const Navigation = ({ isAuthenticated, first_name, logout }) => {

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mt-2" style={{ height: "65px" }}>
                <div className="container fw-light">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="navbar-brand" to="/"><img src={mosca} alt="MOSCA" height="40" /></Link>
                            </li>
                        </ul>
                        {isAuthenticated ?

                            <Nav>
                                <Nav.Item>
                                    <Link className="navbar-brand" to="/config/">Mosca</Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Link className="navbar-brand" to="/">UMAPI</Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Link className="navbar-brand" to="/">KEGGCharter</Link>
                                </Nav.Item>
                            </Nav>

                            : <></>
                        }
                        {isAuthenticated ?
                            <>
                                <Navbar.Brand className="fw-light fs-6">Welcome {first_name} </Navbar.Brand>
                                <Nav>
                                    <Whisper placement="right" trigger="hover" speaker={
                                        <Tooltip>Personal area</Tooltip>
                                    }>
                                        <Link className="navbar-brand" to="/personal-area/account-settings"><FaUserAlt size={"20px"} /></Link>
                                    </Whisper>
                                </Nav>
                                <Nav>
                                    <Whisper placement="right" trigger="hover" speaker={
                                        <Tooltip>Logout</Tooltip>
                                    }>
                                        <Link className="navbar-brand" to="/" onClick={() => { logout(); }}><AiOutlineLogout size={"25px"} /></Link>
                                    </Whisper>
                                </Nav>
                            </>
                            :
                            <>
                                <Nav>
                                    <Whisper placement="right" trigger="hover" speaker={
                                        <Tooltip>Login</Tooltip>
                                    }>
                                        <Link className="navbar-brand" to="/login"><AiOutlineLogin size={"25px"} /></Link>
                                    </Whisper>
                                </Nav>
                            </>}
                    </div>
                </div>
            </nav>
        </header >
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    first_name: state.profile.first_name
});

export default connect(mapStateToProps, { logout })(Navigation);
