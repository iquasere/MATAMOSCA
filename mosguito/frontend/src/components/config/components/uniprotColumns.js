import React, { useEffect, useState } from 'react';
import UniprotAccordion from "../utils/UniprotAccordion";
import { fetchUniprotColumns } from "../utils/getUniprotColumns";

const Main = ({ uniprotList, onChange, uniprotColumns }) => {
  return (
    <main className='main'>
      <form className='form'>
          <UniprotAccordion uniprotList={uniprotList} onChange={onChange} uniprotPossibilities={uniprotColumns} />
      </form>
    </main>
  )
}


const UniprotColumns = ({ uniprotList, onChange }) => {
  const [uniprotColumns, setUniprotColumns] = useState(null);

  useEffect(() => {
    fetchUniprotColumns()
      .then(data => {
        setUniprotColumns(data.uniprotColumns);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
      <div>
        {uniprotColumns && (
          <Main
            uniprotList={uniprotList}
            onChange={onChange}
            uniprotColumns={uniprotColumns}
          />
        )}
      </div>
  )
}

export default UniprotColumns;
