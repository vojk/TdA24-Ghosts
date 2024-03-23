import { TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

/* import TDA_LOGO_white from "../TdA/TdA_LOGO/TeacherDigitalAgency_LOGO_colour-white.svg";
import TDA_All_blue from "../TdA/TdA_ikony/SVG/TdA_ikony_celek_blue.svg"; */

import TdA_ikony_celek_blue from "../svg/TdA_ikony_celek_blue.svg"

import Group3 from "../svg/Group1.svg"
import Group1 from "../svg/Group1.svg"
import { Button } from "@mui/material";

export function MainPage() {

    return (
        <>
            <div className="min-h-fit h-full w-full flex justify-center self-center bg-jet-50">
                <div className="flex flex-col gap-10 w-[60%] items-center justify-center">
                    <div className="w-full flex">
                        <img src={Group1} alt="TdA Logo" className="w-[15rem] pb-20"></img>
                    </div>
                    <img src={TdA_ikony_celek_blue} alt="TdA ikony" className="w-[100%] "></img>
                    
                        <div className="flex flex-col w-full gap-2">
                            <TextField id="promptText" fullWidth multiline className="text-white-50 w-full [&_*]:text-white-50" label="Jakou aktivitu hledáte?" sx={{
                                "& .MuiOutlinedInput-root": {
                                    color: "white",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "white",
                                        borderWidth: "2px",
                                    },
                                    "&:hover:not(.Mui-focused)": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                          borderColor: "white",
                                        },
                                      },
                                   
                                    "& .MuiInputLabel-outlined": {
                                        color: "white",
                                        fontWeight: "bold",
                                        "&.Mui-focused": {
                                            color: "white",
                                            fontWeight: "bold",
                                        },
                                    },
                                }}} InputLabelProps={{
                                    sx: { color: "white", "&.Mui-focused": { color: "#FECB2E" } },
                                  }} ></TextField>
                    

                </div>
                <div className="w-full flex justify-center">

                    <Button style={{ width: '13rem', padding: '0.5rem' }} variant="contained" size="large" color="primary"><span className="font-bold">Hledat</span></Button>

                </div>
            </div>

        </div >
    </>
  );
}

export default MainPage;