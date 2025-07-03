import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
const productData = {
  title: "BONEX Eco 1.5 sq.mm 1 Core Flame Retardant House Wires Blue (Roll of 90 m)",
  brand: "BONEX",
  productId: "BONEXECO150BL90M", // you can generate or assign this uniquely
  description:`The BONEX Eco 1.5 sq.mm 1 Core Flame Retardant House Wires Blue (Roll of 90 Metre) are revolutionizing the world of residential wiring, setting new standards for both safety and sustainability.\n
These wires are more than just a means to connect your home's electrical systems; they represent a commitment to safeguarding lives and protecting the environment.\n
At the core of these house wires is a groundbreaking flame-retardant technology. Engineered to resist the spread of fire, these wires enhance the safety of your home, giving you precious extra minutes in the event of an electrical fault. This critical feature can be a lifesaver, providing peace of mind for homeowners and their families.\n
What sets BONEX Eco wires apart is their dedication to sustainability. These wires are manufactured with a focus on reducing their environmental impact. They are constructed from eco-friendly materials that minimize carbon emissions during production. This commitment to sustainability extends to their long-term use, as they are designed to last, reducing the need for frequent replacements and minimizing waste.\n
Installation is a breeze, thanks to their user-friendly design. Electricians and DIY enthusiasts alike will appreciate the ease with which these wires can be worked with. They are flexible and durable, ensuring a smooth and hassle-free installation process.\n`,

  specifications: [
    { label: "Color", value: "Blue" },
    { label: "Current Carrying Capacity (Amps)", value: "13 A" },
    { label: "Leakage Current", value: "0.009 Amps" },
    { label: "Insulation Material", value: "PVC Insulated" },
    { label: "Country of Origin", value: "India" },
    { label: "Certification", value: "ISO-9001-2015" },
    { label: "Conductor Material", value: "Copper" },
    { label: "No of Core", value: "1" },
    { label: "Cable Length", value: "90 m" },
    { label: "Nominal Area", value: "1.5 Sq. mm" },
    { label: "Dimensions (cm)", value: "18.8x18.8x5.08 cm" },
    { label: "Voltage Rating", value: "1100 V" },
    { label: "Dimension", value: "7.4x7.4x2 Inch" },
    { label: "Application", value: "Resedential & Industrial" },
    { label: "Series", value: "Eco" },
    { label: "Type of Product", value: "Flame Retardant (FR) House Cable" },
    { label: "Model No", value: "BESK150BL" },
    { label: "Standard", value: "IS-694 (RoHS)" },
    { label: "Model Year", value: "2023" },
    { label: "Name of Manufacturer/Packer/Importer", value: "M/S SUNIL KUMAR" },
    { label: "Dimension (mm)", value: "187.96x187.96x50.8 mm" }
  ]
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function DescriptionTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Specifications" {...a11yProps(0)} className='!text-xs md:!text-sm' />
          <Tab label="Description" {...a11yProps(1)} className='!text-xs md:!text-sm'/>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} className="pt-4">
  

  {/* Feature List */}
  <div className=" p-2 py-3  md:p-4 text-sm space-y-3 text-gray-800 bg-gray-100 md:m-2 rounded-sm">
    {productData.specifications.map((item,index)=>(
<div className="flex flex-row justify-between">
      <span className="!text-xs md:!text-sm text-gray-700 w-1/2">{item.label}</span>
      <span className="!text-xs md:!text-sm font-medium w-1/2">{item.value}</span>
    </div>
    ))}
    
  
</div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} className="pt-4">
        {/* Feature List */}
  <div className="p-2 py-3  md:p-4 text-sm space-y-3 text-gray-800 bg-gray-100 md:m-2 rounded-sm">
    {productData.description.split('\n').map((line)=>(
        
        <p className="!text-xs md:!text-sm text-gray-700">{line}</p>
    ))}
    </div>
      </CustomTabPanel>

    </Box>
  );
}