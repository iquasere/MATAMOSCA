import { FaDna } from "react-icons/fa";
import { GiDna2} from "react-icons/gi";


function HomeLevels() {
    return (

    <div className="container">
        <header className="masthead mt-5 d-flex mb-2">
            <div className="container mt-5 text-center">
                <h4 className="mb-1" style={{color:"red"}}>MOSCA explores</h4>
                <h2 className="mb-5 display-1">The 3 Levels of Omics Data</h2>
            </div>
        </header>
    <div className="row">
    <div className="col-lg-4 d-flex align-items-stretch">
      <div className="card shadow px-3">
        <div className="view overlay text-center mt-5">
            <i className="medium-icon"><FaDna size={"80px"} color='red'/></i>     
        </div>
        <div className="card-body">
          <h4 className="card-title text-center mt-5 mb-5">Metagenomic</h4>
          <p className="card-text">
            Obtain MAGs (metagenome assembled genomes) and informs on the
            functional potential of genes.
          </p>
        </div>
      </div>
    </div>

    <div className="col-lg-4 d-flex align-items-stretch">
      <div className="card shadow px-3">
        <div className="view overlay text-center mt-5">
            <i className="medium-icon"><GiDna2 size={"80px"} color='red'/></i>     
        </div>
        <div className="card-body">
          <h4 className="card-title text-center mt-5 mb-5">Metatranscriptomics</h4>
          <p className="card-text">
            Quantify gene expression and performs differential gene expression analysis.
          </p>
        </div>
      </div>
    </div>

    <div className="col-lg-4 d-flex align-items-stretch">
      <div className="card shadow px-3">
        <div className="view overlay text-center mt-5">
            <i className="medium-icon"><GiDna2 size={"80px"} color='red'/></i>     
        </div>
  
        <div className="card-body">
  
          <h4 className="card-title text-center mt-5 mb-5">Metaproteomics</h4>
          <p className="card-text">
            Quantifies protein expression and performs differential protein expression analysis.
          </p>
        </div>
      </div>
    </div>
  </div>
  </div>
    );
}


export default HomeLevels