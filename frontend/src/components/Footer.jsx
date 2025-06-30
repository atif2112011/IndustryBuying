import {useNavigate} from 'react-router-dom'
function Footer(){

  const navigate=useNavigate();
  return (
    <>
   <div className="py-6 px-4 md:px-12">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
    {/* 1. Helpline */}
    <div className="flex items-start gap-3">
      <div className="w-8 h-8">
        <i className="ri-customer-service-2-fill text-3xl text-blue-950"></i>
      </div>
      <div>
        <p className="!font-semibold !text-xs md:!text-sm !text-blue-950">Helpline Number</p>
        <p className="!text-xs md:!text-sm !text-blue-950">Call: +91 8448449073</p>
        <p className="!text-xs md:!text-sm !text-blue-950">(Mon–Sun: 9am–8pm)</p>
      </div>
    </div>

    {/* 2. Return */}
    <div className="flex items-start gap-3">
      <div className="w-8 h-8">
        <i className="ri-inbox-archive-fill text-3xl text-blue-950"></i>
      </div>
      <div>
        <p className="!font-semibold !text-xs md:!text-sm !text-blue-950">Return within 7 days</p>
        <p className="!text-xs md:!text-sm !text-blue-950">of receiving your order</p>
      </div>
    </div>

    {/* 3. Payment */}
    <div className="flex items-start gap-3">
      <div className="w-8 h-8">
        <i className="ri-secure-payment-line text-3xl text-blue-950"></i>
      </div>
      <div>
        <p className="!font-semibold !text-xs md:!text-sm !text-blue-950">100% Safe & Secure Payments</p>
        <p className="!text-xs md:!text-sm !text-blue-950">Pay using secure payment methods</p>
      </div>
    </div>

    {/* 4. App Download */}
    <div className="flex flex-col items-start xl:items-center gap-2">
      <p className="!font-semibold !text-sm !text-blue-950">Experience Industrybuying App</p>
      <div className="flex gap-2 ">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
        <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-10" />
      </div>
    </div>

    {/* 5. Social */}
    <div className="flex flex-col items-start xl:items-center gap-2">
      <p className="!font-semibold !text-sm !text-blue-950">Follow us on</p>
      <div className="flex gap-4 text-xl">
        <i className="ri-facebook-box-line text-blue-950"></i>
        <i className="ri-twitter-line text-blue-950"></i>
        <i className="ri-instagram-line text-blue-950"></i>
        <i className="ri-linkedin-line text-blue-950"></i>
        <i className="ri-youtube-line text-blue-950"></i>
      </div>
    </div>

    {/* 6. Original */}
    <div className="flex items-start gap-3">
      <div className="w-8 h-8">
        <i className="ri-verified-badge-line text-3xl text-blue-950"></i>
      </div>
      <div>
        <p className="!font-semibold !text-xs md:!text-sm !text-blue-950">100% ORIGINAL</p>
        <p className="!text-xs md:!text-sm !text-blue-950">guarantee for all products</p>
      </div>
    </div>

    {/* 7. Complete Products */}
    <div className="flex items-start gap-3">
      <div className="w-8 h-8">
        <i className="ri-service-line text-3xl text-blue-950"></i>
      </div>
      <div>
        <p className="!font-semibold !text-xs md:!text-sm !text-blue-950">Complete products</p>
        <p className="!text-xs md:!text-sm !text-blue-950">20,00,000+ products from 12,000+ Brands</p>
      </div>
    </div>

    {/* 8. Buyer Protection */}
    <div className="flex items-start gap-3">
      <div className="w-8 h-8">
        <i className="ri-shield-keyhole-line text-3xl text-blue-950"></i>
      </div>
      <div>
        <p className="!font-semibold  !text-xs md:!text-sm !text-blue-950">Buyer Protection</p>
        <p className="!text-xs md:!text-sm !text-blue-950">Committed to buyer interests to provide a smooth shopping experience.</p>
      </div>
    </div>
  </div>
</div>

{/* Footer Links */}
<div className="bg-gray-50 text-gray-800 px-6 py-10 border-t border-gray-200">
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">


    {/* Company */}
    <div>
      <h2 className="!text-blue-900 !text-base md:!text-lg !font-semibold mb-4">COMPANY</h2>
      <ul className="space-y-2 text-xs md:text-sm">
        <li><a href="/aboutus" className="hover:underline">• About Us</a></li>
        <li><a href="/contactus" className="hover:underline">• Contact Us</a></li>
        <li><a href="#" className="hover:underline">• Careers</a></li>
        <li><a href="#" className="hover:underline">• Become a seller</a></li>
        <li><a href="#" className="hover:underline">• Special Offers</a></li>
      </ul>
    </div>

    {/* Help */}
    <div>
      <h2 className="!text-blue-900 !text-base md:!text-lg !font-semibold mb-4">HELP</h2>
      <ul className="space-y-2 text-xs md:text-sm">
        <li><a href="#" className="hover:underline">• FAQs</a></li>
        <li><a href="#" className="hover:underline">• Report Infringement</a></li>
        <li><a href="#" className="hover:underline">• Cancellations & Returns</a></li>
        <li><a href="#" className="hover:underline">• Privacy Policy</a></li>
        <li><a href="#" className="hover:underline">• Terms & Conditions</a></li>
      </ul>
    </div>

    {/* Contact */}
    <div>
      <h2 className="!text-blue-900 !text-base md:!text-lg !font-semibold mb-4">GET IN TOUCH</h2>
      <ul className="space-y-2 text-xs md:text-sm">
        <li>
          <i className="ri-mail-line text-base pr-2"></i>
          <a href="mailto:support@example.com" className="hover:underline !text-blue-800">support@example.com</a>
        </li>
        <li>
          <i className="ri-phone-line text-base pr-2"></i>
          <a href="tel:+911234567890" className="hover:underline !text-blue-800">+91 12345 67890</a>
        </li>
        <li className="flex items-start">
          <i className="ri-map-pin-line text-base pr-2 mt-1"></i>
          <span className="!text-xs !text-gray-700">
            123 Business Park,<br />
            Industrial Area, New Delhi - 110011
          </span>
        </li>
      </ul>
    </div>
  </div>
</div>

{/* Copyright */}
<footer className="bg-blue-950 text-white py-4">
  <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-2">
    <p className="!text-xs md:!text-sm text-center !text-white">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
  </div>
</footer>

    </>
  );
};

export default Footer;
