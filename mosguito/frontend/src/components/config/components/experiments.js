import React from 'react';
import ExperimentsTable from "../utils/ExperimentsTable";
import Alert from 'react-bootstrap/Alert';

const Experiments = ({ experiments, setExperiments }) => {
  return (
      <div>
        <ExperimentsTable
          experiments={experiments}
          setExperiments={setExperiments}
        />
        <Alert key="info" variant="info">
        <div>
          <p>Files: if two files set as "path/to/mg_R1.fq.gz,path/to/mg_R2.fq.gz". If one file, set as "path/to/mg.fq.gz".</p>
          <p>Sample: relates all files to the same assembly, annotation and binning.</p>
          <p>Data type: dna - metagenomics; mrna - metatranscriptomics; protein - metaproteomics.</p>
          <p>Condition: if same condition, will be considered replicates.</p>
          <p>Name: used to organize output files, if left blank MOSCA will auto-assign based on input filename.</p>
        </div>
        </Alert>
      </div>
  )
}

export default Experiments;