import { Step, StepLabel, Stepper } from "@mui/material"
import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"

function OrderLayout(){

    const location = useLocation();

    const stepMap = {
    "/order/cart": 0,
    "/order/address": 1,
    "/order/payment": 2
  };


    return <div className="flex-flex-col w-full h-screen">
        <div className="pt-6 flex justify-center"> 
             <Stepper activeStep={stepMap[location.pathname]} orientation="horizontal" sx={{width:'40vw'}}>
                
                {/*  First Step*/}
                <Step>
                    <StepLabel>
                    Cart
                    </StepLabel>
                    
                </Step>
                <Step>
                    {/* Second Step */}
                    <StepLabel>
                    Address
                    </StepLabel>
                    
                </Step>
                  <Step>
                    {/* Third Step */}
                    <StepLabel>
                   Payment
                    </StepLabel>
                    
                </Step>
            </Stepper>
        </div>
        
        <Outlet/>
    </div>
}
export default OrderLayout