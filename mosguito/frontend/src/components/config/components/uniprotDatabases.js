import React, { useEffect, useState } from 'react';
import UniprotAccordion from "../utils/UniprotAccordion";
import { fetchUniprotColumns } from "../utils/getUniprotColumns"

const Main = ({ uniprotList, onChange, uniprotDatabases }) => {

  return (
    <main className='main'>
      <form className='form' >
        <UniprotAccordion uniprotList={uniprotList} onChange={onChange} uniprotPossibilities={uniprotDatabases} />
      </form>
    </main>
  )
}


const UniprotDatabases = ({ uniprotList, onChange }) => {
  const [uniprotDatabases, setUniprotDatabases] = useState(null);

  useEffect(() => {
    fetchUniprotColumns()
      .then(data => {
        setUniprotDatabases(data.uniprotDatabases);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
      <div>
      {uniprotDatabases && (
        <Main
          uniprotList={uniprotList}
          onChange={onChange}
          uniprotDatabases={uniprotDatabases}
        />
      )}
      </div>
  )
}

export default UniprotDatabases;