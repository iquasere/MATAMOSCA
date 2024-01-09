import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsHandIndex} from "react-icons/bs";
import { VscDesktopDownload} from "react-icons/vsc"
import "./HomeHow.css"

function HomeHow() {
    return (
    <div className="container container-how">
        <header className="masthead mt-5 d-flex mb-2">
            <div className="container mt-5 text-center">
                <h1 className="mb-1">How it works</h1>
                <p className="mb-5">
                  You upload your data and MOSCA characterizes it activation
                  at the taxonomic and functional levels.
                </p>
            </div>
        </header>
    <div className="card-group">
      <div className="card border-0">
        <div className="view overlay text-center mt-5">
            <i className="medium-icon"><AiOutlineCloudUpload size={"80px"}/></i>     
        </div>
        <div className="card-body">
          <h4 className="card-title text-center mt-5 mb-5">Upload your data</h4>
          <p className="card-text">
            Obtain MAGs (metagenome assembled genomes) and informs on the
            functional potential of genes.
          </p>
        </div>
      </div>
  
      <div className="card border-0">
        <div className="view overlay text-center mt-5">
            <i className="medium-icon"><BsHandIndex size={"80px"}/></i>     
        </div>
        <div className="card-body">
          <h4 className="card-title text-center mt-5 mb-5">Select the analysis</h4>
          <p className="card-text">
            Quantify gene expression and performs differential gene expression analysis.
          </p>
        </div>
      </div>
    
      <div className="card border-0 px-3">
        <div className="view overlay text-center mt-5">
            <i className="medium-icon"><VscDesktopDownload size={"80px"}/></i>     
        </div>
  
        <div className="card-body">
  
          <h4 className="card-title text-center mt-5 mb-5">Get your outputs</h4>
          <p className="card-text">
            Quantifies protein expression and performs differential protein expression analysis.
          </p>
        </div>
      </div>
    </div>
  </div>
    );
}


export default HomeHow