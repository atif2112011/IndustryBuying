import { useNavigate } from 'react-router-dom'
import img1 from '../assets/images/aboutus/aboutus.png'


function AboutUs(){
  const navigate=useNavigate();


return <div className='flex flex-col px-22 '>
 <div class="px-8 py-16 md:px-20 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
  {/* <!-- Left Text Content --> */}
  <div class="md:w-1/2 text-left">
    <p class="!text-sm tracking-widest !text-gray-500 !uppercase">About Us</p>
    <h2 class="mt-2 !text-2xl md:!text-4xl font-bold !text-gray-900 leading-tight">
      Helping businesses<br/>
      deliver 
        exceptional
        
      buyer experiences.
    </h2>
    <p class="mt-6 !text-gray-600 !text-md">
      MediConnect is transforming how medical institutions and healthcare professionals connect with suppliers.
      Our AI-powered platform enables seamless procurement, real-time inventory tracking, and certified product sourcing—
      all under one secure, scalable roof.
    </p>
    <p class="mt-4 !text-gray-600 !text-md">
      Join thousands of hospitals, clinics, and B2B medical partners already experiencing enhanced efficiency and reduced costs 
      through our innovative digital marketplace.
    </p>
    <button class="mt-8 bg-blue-700 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded shadow-md transition duration-300 " onClick={()=>navigate('/user/login')}>
      Sign Up for Free
    </button>
  </div>

  {/* <!-- Right Image --> */}
  <div class="md:w-1/2 relative">
    <div class="relative z-10">
      <img src={img1} alt="Medical Collaboration" class="rounded-xlobject-cover w-full h-auto"></img>
    </div>
    {/* <!-- Decorative SVG or pattern shapes (optional) --> */}
    {/* <div class="absolute bottom-0 left-0 w-32 h-32 bg-green-900 opacity-30 rounded-full blur-2xl z-0"></div> */}
  </div>
  </div>
  <section class="px-6 my-4 md:px-24 mb-22 text-gray-800">
  {/* <!-- Top: Heading & Paragraphs --> */}
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

  {/* <!-- Divider --> */}
  <hr class="my-12 border-gray-300"></hr>

  {/* <!-- Bottom: Stats --> */}
  <div class="grid grid-cols-1 sm:grid-cols-3 text-center gap-10">
    <div>
      <h3 class="!text-4xl font-bold">500+</h3>
      <p class="mt-2 !text-gray-600">Partnered hospitals and clinics across 6 countries</p>
    </div>
    <div>
      <h3 class="!text-4xl font-bold">2 million+</h3>
      <p class="mt-2 !text-gray-600">Medical supply orders processed annually</p>
    </div>
    <div className=''> 
      <h3 class="!text-4xl font-bold">99.9%</h3>
      <p class="mt-2 !text-gray-600">Procurement accuracy rate using our AI-driven system</p>
    </div>
  </div>
</section>

</div>


}

export default AboutUs