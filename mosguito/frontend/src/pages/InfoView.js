import React from 'react';
import { Col, Row } from 'react-bootstrap';
import InfoComponent from "../components/InfoComponent";

function InfoView() {
    return (
        <div className='container'>
            <Row className='fw-light fs-6 ms-3'
                style={{
                    marginTop: "60px",
                    marginBottom: "30px"
                }} >
                This project has received funding from ...
            </Row>
            

            <Row className='fw-light mt-5 fs-4 ms-3' style={{ paddingTop: "40px" }}>
                Scientific Coordination and Development
            </Row>
            <hr style={{ marginBottom: "30px" }} />
            <Row>
                <Col>
                    <InfoComponent name="João Sequeira" institution="University of Minho" research_group={
                        <a target={"_blank"} style={{ textDecoration: "none", color: "black" }} href='https://www.ceb.uminho.pt/People/Profile/jsequeira' rel="noreferrer"  >
                            Centre of Biological Engeneering
                        </a>
                    } />
                </Col>

                <Col>
                    <InfoComponent name="Andreia Salvador" institution="University of Minho" research_group={
                        <a target={"_blank"} style={{ textDecoration: "none", color: "black" }} href='https://www.ceb.uminho.pt/People/Profile/andreiasalvador' rel="noreferrer"  >
                            Centre of Biological Engeneering
                        </a>
                    } />
                </Col>

                <Col>
                    <InfoComponent name="Vítor Pereira" institution="University of Minho" research_group={
                        <a target={"_blank"} style={{ textDecoration: "none", color: "black" }} href='https://www.ceb.uminho.pt/People/Profile/vitorpereira' rel="noreferrer"  >
                            Centre of Biological Engeneering
                        </a>
                    } />
                </Col>

            </Row>
            
            <Row className='fw-light fs-4 ms-3' style={{ marginTop: "30px" }}>
                References
            </Row>
            <hr style={{ marginBottom: "30px" }} />

            <InfoComponent
                title={"MOSCA: an automated pipeline for integrated metagenomics and metatranscriptomics data analysis."}
                authors={"Sequeira, João Carlos, et al."}
                article_info={"Bioinformatics, 37, 2494–2496."}
                doi={<> DOI: {" "}
                    <a target={"_blank"} style={{ color: "black" }} href='https://doi.org/10.1007/978-3-319-98702-6_22' rel="noreferrer" >
                    10.1007/978-3-319-98702-6_22</a>
                </>}
            />
            
        </div>
    );
}

export default InfoView;