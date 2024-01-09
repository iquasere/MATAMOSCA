import React, { useState, useEffect } from "react";
import 'rsuite/dist/rsuite.min.css';
//import { Col, Row } from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { connect } from "react-redux";
import Constants from "../Constants";
import axios from "axios";
import Config from "../components/config/config";
import { defaultValues } from '../components/config/utils/defaultValues'

const ConfigurationView = ({ isAuthenticated }) => {

  const [configData, setConfig] = useState(defaultValues)
  const [outputsFiles, setOutputsFiles] = useState({})
  const [hasMt, setHasMt] = useState(true)
  const toggleHasMt = () => setHasMt(!hasMt)
  const [hasMp, setHasMp] = useState(false)
  const toggleHasMp = () => setHasMp(!hasMp)

  const onConfigChange = (field, value) => {
    const newValue = { ...configData, [field]: value }
    setConfig(newValue)
  }

  const onConfigOverwrite = (newConfigData) => {
    const newValue = newConfigData
    setConfig(newValue)
    console.log(newValue)
  }

    return(
        <>
        {isAuthenticated ? 
        <Config
            configData={configData}
            onConfigChange={onConfigChange}
            onConfigOverwrite={onConfigOverwrite}
            hasMt={hasMt}
            toggleHasMt={toggleHasMt}
            hasMp={hasMp}
            toggleHasMp={toggleHasMp}
          />
          :
        <Navigate to="/login" />
        }    
        </>
    );


}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(ConfigurationView);
