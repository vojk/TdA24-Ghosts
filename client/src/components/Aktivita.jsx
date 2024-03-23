import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccordionModify from './AccordionModify';

function Aktivita() {

    return (
        <div className='flex flex-col max-w-screen min-h-screen bg-sky-50'>
            <div className='w-full h-fit'>Nazev aktivity</div>
            <div className='h-full flex border-solid border-white-50 border-t-2'>
                <div className='flex-1 flex-col p-4'>Hlavni cast aktivit

                    <AccordionModify id="1" name="Název části">jako ID použít index z map(), popř. "accord"+index</AccordionModify>
                    <AccordionModify name="Název části">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe consequuntur iure nihil, soluta, distinctio doloribus quod modi expedita dolorem nam quidem pariatur. Perspiciatis consectetur nam sequi voluptas aspernatur? Nisi, rerum.</AccordionModify>
                    <AccordionModify name="Název části">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero eos suscipit consectetur velit facere! Ducimus optio earum architecto soluta aliquam cupiditate. Reprehenderit corrupti fugiat nihil ipsam blanditiis eum quaerat aspernatur!</AccordionModify>
                    <AccordionModify name="Název části">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione ad ipsum dignissimos, dicta corporis error aliquid earum aspernatur laudantium assumenda blanditiis consectetur tempore voluptatem reiciendis a eaque quia qui iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, vel perferendis velit veritatis quod itaque repudiandae omnis illum cupiditate doloremque asperiores est iure vero totam impedit soluta nisi tempora ea! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae iure, error tempora debitis laudantium assumenda vitae optio cum totam saepe accusantium consequatur molestiae amet recusandae ipsa accusamus animi voluptate quisquam.</AccordionModify>

                </div>
                <div className=' bg-sunglow-50 min-w-[13rem] h-full flex flex-col sticky top-2'>Rozcestnik
                    <div><a  href={"#1"}> <ArrowDropDownIcon className='-rotate-90'/> prvni cast</a></div>
                
                </div>
            </div>
        </div>
    )
}

export default Aktivita;