import { useNavigate } from 'react-router-dom'
import gst4 from '../assets/images/gst/gst4.webp'


function GST(){
  const navigate=useNavigate();


return <div className='flex flex-col px-12 md:px-22 '>
 <div class="md:px-8 py-16 md:px-20 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
  {/* <!-- Left Text Content --> */}
  <div class="md:w-1/2 text-left">
    <p class="!text-sm tracking-widest !text-gray-500 !uppercase">GST Benefits</p>
    <h2 class="mt-2 !text-xl md:!text-4xl font-bold !text-gray-900 leading-tight">
      What is a <span className="mt-2 !text-2xl md:!text-4xl font-bold !text-orange-600 leading-tight">GST Invoice</span> ?
    </h2>
    <p class="mt-6 !text-gray-600 !text-sm md:!text-md">
      A GST-compliant purchase invoice lists all the goods and services sold and their prices and includes information about the parties engaged in the transaction. In addition to other news, this invoice shows the taxes and discount percentages applied to each item.
    </p>
    <p class="mt-4 !text-gray-600 !text-sm md:!text-md">
      The registered businesses can claim an input tax credit, which allows them to offset the GST they have paid on inputs (goods and services used in their business) against the GST they have collected on their sales. This helps in avoiding double taxation and encourages proper compliance.</p>
    <button class="!text-sm md:!text-md mt-8 bg-blue-700 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded shadow-md transition duration-300 " onClick={()=>navigate('/user')}>
      Verify and Add GSTIN
    </button>
  </div>

  {/* <!-- Right Image --> */}
  <div class="md:w-2/5 relative">
    <div class="relative z-10">
      <img src={gst4} alt="Medical Collaboration" class="rounded-xl object-cover w-full aspect-square"></img>
    </div>
    {/* <!-- Decorative SVG or pattern shapes (optional) --> */}
    {/* <div class="absolute bottom-0 left-0 w-32 h-32 bg-green-900 opacity-30 rounded-full blur-2xl z-0"></div> */}
  </div>
  </div>

  {/* <!-- Top: Heading & Paragraphs --> */}
  {/* <section class="px-6 my-4 md:px-24 mb-22 text-gray-800">
  <div class="flex flex-col md:flex-row justify-between gap-8">
    <div class="md:w-1/2">
      <h2 class="!text-2xl md:text-3xl !font-bold mb-6">
        Built for healthcare providers and suppliers,<br/> powered by AI
      </h2>
    </div>
    <div class="md:w-1/2 text-gray-600 text-lg space-y-4">
      <p>
        We believe in the power of technology to strengthen hospital-supplier relationships and empower medical professionals
        with real-time procurement capabilities.
      </p>
      <p>
        Our AI-driven insights help streamline inventory, forecast demand, and reduce overhead—helping providers save time and ensure critical supplies are always available.
      </p>
      <p>
        At MediConnect, we're committed to improving patient outcomes by optimizing backend operations across the healthcare supply chain.
      </p>
    </div>
  </div>

 

  
</section> */}

</div>


}

export default GST