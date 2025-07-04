import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { HelpCenterContext } from "../pages/HelpCenter";
import { styled } from '@mui/material/styles';


const ResponsiveSummary = styled(AccordionSummary)(({ theme }) => ({
  '& .MuiAccordionSummary-content': {
    fontSize: '0.90rem',
    fontWeight: '500',
    padding: '0 0',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.85rem',
    },
  },
}));

const ResponsiveDetails = styled(AccordionDetails)(({ theme }) => ({
  fontSize: '0.80rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
  },
}));


function HelpMainBody(){
    const [helpCenterData,sethelpCenterData]=useState([
  {
    category: "Account & Registration",
    link:"/help/account",
    faqs: [
      {
        question: "How do I create a business account?",
        answer: "To create a business account, click on 'Register' and select 'Business Account'. Fill in your company details, GSTIN, and verification documents. Our team will verify and activate your account within 24-48 hours."
      },
      {
        question: "Can I manage multiple buyers under one account?",
        answer: "Yes, you can add sub-users with different roles and permissions to manage purchases, approvals, and billing under one primary business account."
      }
    ]
  },
  {
    category: "Orders & Quotations",
    link:"/help/order",
    faqs: [
      {
        question: "How do I request a bulk quotation?",
        answer: "Navigate to the product page and click on 'Request Bulk Quote'. Provide quantity and requirement details. Our team will get back with a custom quotation."
      },
      {
        question: "Can I schedule orders for future delivery?",
        answer: "Yes, while placing the order, you can choose a preferred delivery date. We support scheduling up to 30 days in advance."
      }
    ]
  },
  {
    category: "Payments & Invoicing",
    link:"/help/payment",
    faqs: [
      {
        question: "What payment methods are supported?",
        answer: "We support UPI, Net Banking, Credit/Debit Cards, NEFT/RTGS, and Credit Terms for eligible businesses."
      },
      {
        question: "Can I get a GST invoice for my purchase?",
        answer: "Yes, all B2B orders come with a valid GST invoice, downloadable from your order history page once the order is shipped."
      }
    ]
  },
  {
    category: "Shipping & Delivery",
    link:"/help/shipping",
    faqs: [
      {
        question: "What are the delivery timelines?",
        answer: "Standard delivery takes 3-7 business days depending on the location. Express delivery options are available for select pin codes."
      },
      {
        question: "Can I track my shipment?",
        answer: "Yes, once the order is shipped, you’ll receive a tracking link via email and SMS. You can also track it from your dashboard."
      }
    ]
  },
  {
    category: "Returns & Refunds",
    link:"/help/return",
    faqs: [
      {
        question: "What is the return policy for bulk items?",
        answer: "Returns are accepted within 7 days of delivery only for defective or incorrect items. Please initiate the return from your orders page and upload relevant proof."
      },
      {
        question: "How long does it take to get a refund?",
        answer: "Refunds are processed within 5-7 business days after the returned product passes inspection."
      }
    ]
  },
  {
    category: "Product & Availability",
    link:"/help/product",
    faqs: [
      {
        question: "How do I know if a product is in stock?",
        answer: "Product availability is displayed on each product page. For bulk or recurring orders, you can contact our sales team for stock assurance."
      },
      {
        question: "Can I get product samples?",
        answer: "Samples are available for select products. Use the 'Request Sample' button or contact our support to inquire about sample availability."
      }
    ]
  },
  {
    category: "Technical Support",
    link:"/help/technical",
    faqs: [
      {
        question: "Whom do I contact for platform-related issues?",
        answer: "You can reach out to our technical support via the 'Help' button on the bottom-right corner or email us at support@yourdomain.com."
      },
      {
        question: "How do I reset my password?",
        answer: "Click on 'Forgot Password' on the login page. You'll receive a reset link on your registered email."
      }
    ]
  }
]);
    const [displayData,setdisplayData]=useState([])
    const {helpid}=useParams();

    const [Title,setTitle]=useState('')
    const SearchBardata = useContext(HelpCenterContext);
   

    useEffect(()=>{
        setTitle(helpCenterData.filter((item,index)=>{
            if(item.link==`/help/${helpid}`)
                return true;
            else
                return false;
        })[0])

       
    },[helpid

    ])
    
 useEffect(() => {
  const searchTerm = SearchBardata?.toLowerCase?.().trim();

   
  if (!searchTerm || searchTerm.length<4) {
    setdisplayData([])
    return;
  }

  const filtered = helpCenterData
    .map((section) => {
      const matchingFaqs = section.faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm) ||
        section.category.toLowerCase().includes(searchTerm)
        
      );

      if (matchingFaqs.length > 0) {
        return {
          ...section,
          faqs: matchingFaqs,
        };
      }

      return null;
    })
    .filter(Boolean); // Remove nulls

  setdisplayData(filtered);
  
}, [SearchBardata]);


    return <div className="flex flex-col w-full gap-4 p-4 md:p-8 bg-white rounded-md shadow-md md:overflow-y-auto md:h-full">
       <h3 className="!text-md md:!text-lg">{displayData && displayData.length==0?Title.category:"Search Results"}</h3>

      {displayData && displayData.length > 0 && (
  <div className="flex flex-col md:py-4 gap-1 ">
    {displayData.map((category, catIndex) =>
  category.faqs?.map((faq, faqIndex) => (
    <Accordion
      key={`${catIndex}-${faqIndex}`}
      sx={{
        boxShadow: 'none',
        borderTop: faqIndex === 0 ? '1px solid #eee' : 'none',
        borderBottom: '1px solid #eee',
        '&:before': { display: 'none' },
      }}
    >
      <AccordionSummary
      as={ResponsiveSummary}
        expandIcon={<ExpandMoreIcon sx={{ color: 'orangered' }} />}
        aria-controls={`panel${catIndex}-${faqIndex}-content`}
        id={`panel${catIndex}-${faqIndex}-header`}
       
      >
        {faq.question}
      </AccordionSummary>
      <AccordionDetails
      as={ResponsiveDetails}
       
      >
        {faq.answer}
      </AccordionDetails>
    </Accordion>
  ))
)}

  </div>
)}



        <div className="flex flex-col py-4 gap-1">
            
      {displayData.length==0 && Title.faqs && Title.faqs.map((faq, index) => (
        <Accordion
          key={index}
          sx={{
            boxShadow: 'none',
            borderTop: index === 0 ? '2px solid #eee' : 'none',
            borderBottom: '2px solid #eee',
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'orangered' }} />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            as={ResponsiveSummary}
          >
            {faq.question}
          </AccordionSummary>
          <AccordionDetails
           as ={ResponsiveDetails}
          >
            {faq.answer}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
    </div>
}

export default HelpMainBody