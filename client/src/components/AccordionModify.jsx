import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Children } from 'react';

const AccordionModify = (props) => {
    return (
        <Accordion id={props.id}>
            <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                {props.name}
            </AccordionSummary>
            <AccordionDetails>

                <div className=''>
                    {props.children}
                </div>
            </AccordionDetails>
        </Accordion>
    )
}

export default AccordionModify;