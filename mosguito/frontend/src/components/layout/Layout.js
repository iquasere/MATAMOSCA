import Navigation from "./Navigation";
import Footer from "./Footer";
import "./Layout.css";
import CSRFToken from "../CSRFToken";
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from "../../actions/authentication";
import { useEffect } from "react";

const Layout = ({ children, checkAuthenticated, load_user }) => {
    useEffect(() => {
        checkAuthenticated();
        load_user();
    }, []);

    return (
        <div style={{ position:"relative", minHeight: `calc(100vh - 180px)` }} >
            <CSRFToken />
            <Navigation />
                <main className="container" id="content-wrap">
                {children}
                </main>
            <Footer />
        </div>
    );
}


export default connect(null, { checkAuthenticated, load_user })(Layout);