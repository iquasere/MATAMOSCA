import {TextField} from '@material-ui/core'
import {useState} from "react";
import Alert from 'react-bootstrap/Alert';

const LabelledTextField = ({ label, value, onChange, placeholder, helpMessage ="" }) => {

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return <div className="container">
    <div className='left'>
      <span>{label}</span>
    </div>
    <div className='right' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <TextField
        type='text'
        fullWidth
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
    {helpMessage &&
    <div style={{ height:"60px"}}>
    {isHovering && <Alert variant='info'>{helpMessage}</Alert>}
    </div>}
  </div>
}

export default LabelledTextField