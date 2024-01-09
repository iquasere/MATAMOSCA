import React from 'react'
import YAML from 'yaml'
import { Row, Col } from "rsuite";
import { Button } from 'react-bootstrap'
import { defaultValues } from './utils/defaultValues'
import { emptyValues } from './utils/emptyValues'
import download from './utils/download'
import { Steps } from 'rsuite';
import General from './components/General';
import UniprotDatabases from './components/uniprotDatabases';
import UniprotColumns from './components/uniprotColumns';
import KeggMaps from './components/keggmaps';
import Experiments from './components/experiments';
import { remoteMOSCA } from '../../actions/mosca';

const Main = ({ configData, onConfigChange, onConfigOverwrite, hasMt, toggleHasMt, hasMp, toggleHasMp }) => {

  const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

  const [step, setStep] = React.useState(0);
  const onChange = nextStep => {
    setStep(nextStep < 0 ? 0 : nextStep > 5 ? 5 : nextStep);
  };

  const onNext = () => onChange(step + 1);
  const onPrevious = () => onChange(step - 1);

  const runMOSCA = (ev) => {
    ev.preventDefault()
    if (configData['doAssembly']) { onConfigChange('errorModel', 'complete') }
    const snake_case_values = {}
    Object.keys(configData).map((key) => snake_case_values[camelToSnakeCase(key)] = configData[key])
    jsonConfig = JSON.stringify(snake_case_values, null, 2);
    remoteMOSCA(jsonConfig)
  }

  const downloadJson = (ev) => {
    ev.preventDefault()
    if (configData['doAssembly']) { onConfigChange('errorModel', 'complete') }
    const snake_case_values = {}
    Object.keys(configData).map((key) => snake_case_values[camelToSnakeCase(key)] = configData[key])
    download(JSON.stringify(snake_case_values, null, 2), 'config.json', 'json')
  }

  const downloadYaml = (ev) => {
    ev.preventDefault()
    if (configData['doAssembly']) { onConfigChange('errorModel', 'complete') }
    const snake_case_values = {}
    Object.keys(configData).map((key) => snake_case_values[camelToSnakeCase(key)] = configData[key])
    download(YAML.stringify(snake_case_values, null), 'config.yaml', 'yaml')
  }

  return (
    <main>
      <div style={{ height: "40px" }}></div>
      <form>
        <div>
          <Button className="m-2"
            onClick={() => onConfigOverwrite(defaultValues)}
            variant="dark"
          >
            Set to default values
          </Button>

          <Button className="m-2"
            onClick={() => onConfigOverwrite(emptyValues)}
            variant="dark"
          >
            Clear values
          </Button>

          <Button className="m-2"
            onClick={(ev) => downloadYaml(ev)}
            variant="secondary"
          >
            Download YAML
          </Button>

          <Button className="m-2"
            onClick={(ev) => downloadJson(ev)}
            variant="secondary"
          >
            Download JSON
          </Button>

          <p className='align-middle m-4'>MOSCA {configData.version}</p>

        </div>

        <div>
          <Steps className="container mt-5" current={step} vertical>
            <Steps.Item title={<div className=" fw-light align-items-top" style={{ fontSize: "18px" }}>
              <Button variant="link" className="shadow-none" onClick={() => setStep(0)}>General Configuration</Button></div>}
              description=
              {step === 0 &&
                <div>
                  <General
                    configData={configData}
                    onConfigChange={onConfigChange}
                    hasMt={hasMp}
                    toggleHasMt={toggleHasMp}
                    hasMp={hasMt}
                    toggleHasMp={toggleHasMp}
                  />
                </div>
              } />

            <Steps.Item title={<div className=" fw-light align-items-top" style={{ fontSize: "18px" }}>
              <Button variant="link" className="shadow-none" onClick={() => setStep(1)}>Uniprot Columns</Button></div>}
              description=
              {step === 1 &&
                <div>
                  <UniprotColumns
                    uniprotList={configData.upimapiColumns}
                    onChange={(value) => onConfigChange('upimapiColumns', value)}
                  />
                </div>
              } />

            <Steps.Item title={<div className=" fw-light align-items-top" style={{ fontSize: "18px" }}>
              <Button variant="link" className="shadow-none" onClick={() => setStep(2)}>Uniprot Databases</Button></div>}
              description=
              {step === 2 &&
                <div>
                  <UniprotDatabases
                    uniprotList={configData.upimapiDatabases}
                    onChange={(value) => onConfigChange('upimapiDatabases', value)}
                  />
                </div>
              } />

            <Steps.Item title={<div className=" fw-light align-items-top" style={{ fontSize: "18px" }}>
              <Button variant="link" className="shadow-none" onClick={() => setStep(3)}>KEGG Metabolic Maps</Button></div>}
              description=
              {step === 3 &&
                <div>
                  <KeggMaps configData={configData} onConfigChange={onConfigChange} />
                </div>
              } />

            <Steps.Item title={<div className=" fw-light align-items-top" style={{ fontSize: "18px" }}>
              <Button variant="link" className="shadow-none" onClick={() => setStep(4)}>Experiments</Button></div>}
              description=
              {step === 4 &&
                <div>
                  <Experiments
                    experiments={configData.experiments}
                    setExperiments={(value) => onConfigChange('experiments', value)}
                  />
                </div>
              } />

            <Steps.Item title={<div className=" fw-light align-items-top" style={{ fontSize: "18px" }}>
              <Button variant="link" className="shadow-none" onClick={() => setStep(5)}>Run</Button></div>}
              description=
              {step === 5 &&
                <Col>
                  <Row>
                    <Button variant="dark" onClick={(ev) => runMOSCA(ev)}>
                      Run the Configuration
                    </Button>
                  </Row>
                </Col>
              } />

          </Steps>
          <hr />

          <div>
            <Button className="m-2" onClick={onPrevious} disabled={step === 0} variant="dark">
              Previous Step
            </Button>
            <Button className="m-2" onClick={onNext} disabled={step === 5} variant="dark">
              Next Step
            </Button>
          </div>
        </div>
      </form>
    </main>
  )
}

function Config({ configData, onConfigChange, onConfigOverwrite, hasMt, toggleHasMt, hasMp, toggleHasMp }) {
  return (
    <div>
      <Main
        configData={configData}
        onConfigChange={onConfigChange}
        onConfigOverwrite={onConfigOverwrite}
        hasMt={hasMt}
        toggleHasMt={toggleHasMt}
        hasMp={hasMp}
        toggleHasMp={toggleHasMp}
      />
    </div>
  )
}

export default Config
