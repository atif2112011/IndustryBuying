
import cert1 from '../assets/images/certificates/cert1.jpeg'
import cert2 from '../assets/images/certificates/cert2.jpeg'
import cert3 from '../assets/images/certificates/cert3.jpg'

function Certification(){
    return<div class="px-22 py-12 bg-gray-50">
  <h2 class="!text-3xl !font-bold !text-center !text-blue-900 mb-12">Our Certifications</h2>

  {/* <!-- Certification 1 --> */}
  <div class="flex flex-col md:flex-row items-center mb-16">
    <div class="md:w-1/2 mb-6 md:mb-0">
      <h3 class="!text-xl !font-semibold !text-blue-800">ISO 9001:2015 Certified</h3>
      <p class="mt-4 !text-md !text-gray-700">
        Our processes comply with international standards for quality management. This certification ensures consistent service, improved efficiency, and customer satisfaction across all our operations.
      </p>
    </div>
    <div class="md:w-1/2 flex justify-center">
      <img src={cert1} alt="ISO 9001 Certification" class="w-64 h-48 object-contain rounded shadow-lg"></img>
    </div>
  </div>

  {/* <!-- Certification 2 --> */}
  <div class="flex flex-col md:flex-row-reverse items-center mb-16">
    <div class="md:w-1/2 mb-6 md:mb-0">
      <h3 class="!text-xl !font-semibold !text-blue-800">FDA Registered Facility</h3>
      <p class="mt-4 !text-md !text-gray-700">
        We meet the rigorous requirements of the U.S. Food & Drug Administration. This reflects our commitment to producing and handling medical products safely and reliably.
      </p>
    </div>
    <div class="md:w-1/2 flex justify-center">
      <img src={cert2} alt="FDA Registered" class="w-64 h-48 object-contain rounded shadow-lg"></img>
    </div>
  </div>

  {/* <!-- Certification 3 --> */}
  <div class="flex flex-col md:flex-row items-center mb-16">
    <div class="md:w-1/2 mb-6 md:mb-0">
      <h3 class="!text-xl !font-semibold !text-blue-800">GMP Compliant</h3>
      <p class="mt-4 !text-md !text-gray-700">
        Good Manufacturing Practices are embedded in every aspect of our operations, ensuring that our products are consistently high in quality and safe for their intended use.
      </p>
    </div>
    <div class="md:w-1/2 flex justify-center">
      <img src={cert3} alt="GMP Certified" class="w-64 h-48 object-contain rounded shadow-lg"></img>
    </div>
  </div>
</div>
}

export default Certification