import {Checkbox} from '@material-ui/core'
import React, {useState} from "react";

const LabelledCheckbox = ({ label, checked, setChecked, helpMessage ="" }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return <div className="container">
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <Checkbox
        checked={checked}
        onChange={setChecked}
      /> <span>{label}</span>
    </div>
    { helpMessage &&
    <div style={{ height:"60px"}}>
    {isHovering && <div className="alert alert-info">{helpMessage}</div>}
    </div>}
  </div>
}

export default LabelledCheckbox