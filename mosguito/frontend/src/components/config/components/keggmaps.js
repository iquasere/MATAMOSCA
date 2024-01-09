import React from 'react';
import KeggMapsAccordion from "../utils/KeggMapsAccordion";

const Main = ({ configData, onConfigChange }) => {

  return (
    <main className='main'>
      <form className='form' >
      <KeggMapsAccordion
        keggMapList={configData.keggcharterMaps}
        onChange={(value) => onConfigChange('keggcharterMaps', value)}
      />
      </form>
    </main>
  )
}

const KeggMaps = ({ configData, onConfigChange }) => {
  return (
      <div>
      <Main
        configData={configData}
        onConfigChange={onConfigChange}
      />
      </div>
  )
}

export default KeggMaps;