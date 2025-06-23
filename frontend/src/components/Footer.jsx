import {useNavigate} from 'react-router-dom'
function Footer(){

  const navigate=useNavigate();
  return (
    <>
    <div className=" py-6 px-4 md:px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        
        {/* Helpline */}
        <div className="flex items-start gap-3 items-center">
          <div className="w-8 h-8">
            <i className="ri-customer-service-2-fill text-4xl text-blue-950"></i></div> {/* Icon placeholder */}
          <div>
            <p className="!font-semibold !text-blue-950">Helpline Number</p>
            <p className="!text-sm !text-blue-950">Call: +91 8448449073</p>
            <p className="!text-sm !text-blue-950">(Mon–Sun: 9am–8pm)</p>
          </div>
        </div>

        {/* Return */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8">
            <i className="ri-inbox-archive-fill text-4xl text-blue-950"></i>
          </div>
          <div>
            <p className="!font-semibold !text-blue-950">Return within 7 days</p>
            <p className="!text-sm !text-blue-950">of receiving your order</p>
          </div>
        </div>

        {/* Payment */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8">
            <i className="ri-secure-payment-line text-4xl text-blue-950"></i>
          </div>
          <div>
            <p className="!font-semibold !text-blue-950">100% Safe & Secure Payments</p>
            <p className="!text-sm !text-blue-950">Pay using secure payment methods</p>
          </div>
        </div>

        {/* App Download */}
        <div className="flex flex-col items-start xl:items-center gap-2">
          <p className="!font-semibold !text-blue-950">Experience Industrybuying App</p>
          <div className="flex gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
            <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-10" />
          </div>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-start xl:items-center gap-2">
          <p className="!font-semibold !text-blue-950">Follow us on</p>
          <div className="flex gap-4 text-xl">
            <div className="w-6 h-6"><i className="ri-facebook-box-line text-xl text-blue-950"></i></div>
            <div className="w-6 h-6"><i className="ri-twitter-line text-xl text-blue-950"></i></div>
            <div className="w-6 h-6"><i className="ri-instagram-line text-xl text-blue-950"></i></div>
            <div className="w-6 h-6"><i className="ri-linkedin-line text-xl text-blue-950"></i></div>
            <div className="w-6 h-6"><i className="ri-youtube-line text-xl text-blue-950"></i></div>
          </div>
        </div>

        {/* 100% Original */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8">
            <i className="ri-verified-badge-line text-4xl text-blue-950"></i></div>
          <div>
            <p className="!font-semibold !text-blue-950">100% ORIGINAL</p>
            <p className="!text-sm !text-blue-950">guarantee for all products</p>
          </div>
        </div>

        {/* Complete Products */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 ">
            <i className="ri-service-line text-4xl text-blue-950"></i>
          </div>
          <div>
            <p className="!font-semibold !text-blue-950">Complete products</p>
            <p className="!text-sm !text-blue-950">20,00,000+ products from 12,000+ Brands</p>
          </div>
        </div>

        {/* Buyer Protection */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8">
            <i className="ri-shield-keyhole-line text-4xl text-blue-950"></i>
          </div>
          <div>
            <p className="!font-semibold !text-blue-950">Buyer Protection</p>
            <p className="!text-sm !text-blue-950">Committed to buyer interests to provide a smooth shopping experience.</p>
          </div>
        </div>

      </div>
    </div>

    <div className="bg-gray-50 text-gray-800 px-8 py-10 border-t border-gray-200">
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

    {/* Company Section */}
    <div>
      <h2 className="text-lg font-semibold text-blue-900 mb-4">COMPANY</h2>
      <ul className="space-y-2 text-sm">
        <li><a href="/aboutus" className="hover:underline" >• About Us</a></li>
        <li><a href="/contactus" className="hover:underline" >• Contact Us</a></li>
        <li><a href="#" className="hover:underline">• Careers</a></li>
        <li><a href="#" className="hover:underline">• Become a seller</a></li>
        <li><a href="#" className="hover:underline">• Special Offers</a></li>
        {/* <li><a href="#" className="hover:underline">• Blog</a></li> */}
      </ul>
    </div>

    {/* Help Section */}
    <div>
      <h2 className="text-lg font-semibold text-blue-900 mb-4">HELP</h2>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:underline">• FAQs</a></li>
        <li><a href="#" className="hover:underline">• Report Infringement</a></li>
        <li><a href="#" className="hover:underline">• Cancellations & Returns</a></li>
        <li><a href="#" className="hover:underline">• Privacy Policy</a></li>
        <li><a href="#" className="hover:underline">• Terms & Conditions</a></li>
      </ul>
    </div>

    {/* Get in Touch Section */}
    <div>
      <h2 className="text-lg font-semibold text-blue-900 mb-4">GET IN TOUCH</h2>
      <ul className="space-y-2 text-sm">
        <li><i className="ri-mail-line text-lg pr-2"></i><a href="mailto:support@example.com" className="hover:underline text-blue-800">support@example.com</a></li>
        <li><i className="ri-phone-line text-lg pr-2"></i><a href="tel:+911234567890" className="hover:underline text-blue-800">+91 12345 67890</a></li>
        <li><i className="ri-map-pin-line text-lg pr-2"></i>
          <span className="text-gray-700">
            123 Business Park,<br />
            Industrial Area, New Delhi - 110011
          </span>
        </li>
      </ul>
    </div>

  </div>
</div>

    <footer className="bg-blue-950 text-white py-4">
        
      <div className="container mx-auto px-2 flex flex-col md:flex-row justify-center items-center">
        <p className="!text-sm !text-gray-100">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          {/* <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Contact</a> */}
          
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
