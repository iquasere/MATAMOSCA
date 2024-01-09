import { Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ceb from './ceb.png';
import um from './um.png';
import "./Layout.css";

function Footer() {
    return (<>
            <footer className="bg-dark text-white" style={{ position:"absolute", bottom: "-150px", display: 'flex', alignItems: "center", width: "100%", height: "120px"}} >
            <div className='container'>
                <Stack direction="horizontal" gap={5} >
                    <div className="col-md-7 fw-light px-5" style={{ verticalAlign: "middle" }}>
                    <small>Copyright &copy; CEB University of Minho</small>
                    <p>
                        <Link to='about' className='text-white' style={{ textDecoration: "none"}} ><small>About</small></Link>
                    </p>
                    </div>
                    <a className="text-center" href="https://www.ceb.uminho.pt/"><img src={ceb} alt="CEB" height="75" /></a>
                    <a className="text-center" href="https://www.uminho.pt/"><img src={um} alt="University of Minho" height="75" /></a>
                </Stack>
            </div>
            </footer>
            </>
    );
}

export default Footer;