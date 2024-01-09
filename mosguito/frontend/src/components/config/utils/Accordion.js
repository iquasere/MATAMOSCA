import { useState } from 'react'
import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary
} from '@material-ui/core'
import { Col, Row } from 'react-bootstrap'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const Accordion = ({ title, style, children, helpMessage = "" }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const [isOpen, setIsOpen] = useState(false)
  const toggleIsOpen = () => setIsOpen(!isOpen)
  return (
    <Row onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <MuiAccordion
        expanded={isOpen}
        onChange={toggleIsOpen}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {title}
        </AccordionSummary>
        <AccordionDetails>
          <Col>
            {children}
          </Col>
        </AccordionDetails>
      </MuiAccordion>

      {helpMessage &&
        <div style={{ height: "60px" }}>
          {isHovering && <div className="alert alert-info">{helpMessage}</div>}
        </div>}
    </Row>
  )
}

export default Accordion
