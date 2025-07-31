import { Outlet } from "react-router-dom";
import HelpSideMenu from "../components/HelpSideMenu"
import SearchBar from "../components/SearchBar"
import { createContext, useEffect, useState } from "react";
import searchimg from '../assets/images/search.png'

const helpCenterData = [
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
];

export const HelpCenterContext = createContext();

function HelpCenter(){
    const [searchTerm,setSearchTerm]=useState("");
    

return <div className="flex flex-col w-full md:h-screen items-center p-4 px-8 mt-4">
    {/* Search Area */}
    <div className="flex flex-col w-full p-4 py-5 items-center rounded-md shadow-md !bg-[url(/search.png)] bg-cover ">
    <div className="flex flex-col gap-4 md:w-3/4 md:p-4">
    <h2 className="!text-4xl !font-medium text-center md:!text-blue-950 !text-white-900">How can we help you ?</h2>
    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder={"Search keywords, queries and topics"}/>
    </div>
    </div>
    {/* Search Area ends*/}

    {/* Main Div */}
    <div className="flex flex-col md:flex-row rounded-md flex-1 gap-4 items-start w-full pt-6">

    <HelpSideMenu options={helpCenterData} setSearchTerm={setSearchTerm}/>
    <HelpCenterContext.Provider value={searchTerm}>

    <Outlet clas/>
    </HelpCenterContext.Provider>
    </div>

</div>
}

export default HelpCenter