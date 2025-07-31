import React from 'react';
import { Stepper, Step, StepLabel, StepConnector } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

// Dummy icons (replace with images or actual icons as needed)
const stepIcons = [
  "📦", // Booked
  "✅", // Confirmed
  "🛠️", // Processing
  "📦", // Packed
  "🚚", // Shipped
  "📬", // Delivered
];


const steps=['Processing','Packed', 'Shipped', 'Delivered', 'Cancelled', 'Refunded']
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  alternativeLabel: {
    top: 22,
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#4caf50',
    borderRadius: 1,
  },
}));

const StepIcon = ({ active, completed, icon }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-2xl">{icon}</div>
      {completed ? (
        <CheckCircleIcon sx={{ color: '#4caf50' }} />
      ) : active ? (
        <CheckCircleIcon sx={{ color: '#4caf50' }} />
      ) : (
        <RadioButtonUncheckedIcon sx={{ color: '#9e9e9e' }} />
      )}
    </div>
  );
};

export default function TrackingStepper({ currentStep = 3 }) {
  return (
    <div className="w-full flex justify-center py-6 px-4 bg-white">
      <Stepper
        alternativeLabel
        activeStep={currentStep}
        connector={<CustomConnector />}
        sx={{ width: '100%', maxWidth: 1000 }}
      >
        {steps.map((label, index) => (
          <Step key={label} >
            <StepLabel
              StepIconComponent={() => (
                <StepIcon
                  icon={stepIcons[index]}
                  active={currentStep === index}
                  completed={currentStep > index}
                />
              )}
            >
              <span className="!text-sm !font-medium text-center">{label}</span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
