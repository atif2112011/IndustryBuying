// TestimonialCarousel.jsx
import threem from '../assets/images/brands/3m.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: 'Joyson',
    designation: 'Managing partner',
    companyLogo: '/logos/alpha-electricals.png',
    company: 'ALPHA ELECTRICALS',
    text: `I am Joyson, Managing partner of ALPHA ELECTRICALS. We have been sourcing manufacturing products from IndustryBuying for several years now. Our experience with them has been exceptional. The quality of their products and the reliability of their delivery have consistently met our expectations. We primarily purchase online, and their seamless process has made procurement efficient and hassle-free. We look forward to continuing and expanding our business relationship with IndustryBuying. Keep up.`,
  },
  {
    name: 'Tej naik',
    designation: 'Manager',
    companyLogo: '/logos/powerland.png',
    company: 'POWERLAND',
    text: `We are TRACTORS (OTHER THAN TRACTORS OF HEADING 8709) PEDESTRIAN CONTROLLED TRACTORS, PARTS AND ACCESSORIES OF THE MOTOR VEHICLES OF HEADINGS 8701 TO 8705 BUMPERS AND PARTS THEREOF FOR TRACTORS. I'm impressed with its durability and performance. It has exceeded my expectations and has become an essential tool in my daily work.`,
  },
  {
    name: 'Gaurav',
    designation: 'Manager',
    companyLogo: '/logos/w-logo.png',
    company: '',
    text: `Working with IndustryBuying last 2 year has been a game-changer for our business. Their dedication to customer satisfaction and their expertise in service have helped us streamline our operations and achieve remarkable growth. Last order was missing product deliver but customer care help me about missing my 1 pump tracking id #830751, return process on the way.`,
  },
  {
    name: 'Suresh',
    designation: 'Manager',
    companyLogo: '/logos/w-logo.png',
    company: '',
    text: `Working with IndustryBuying last 2 year has been a game-changer for our business. Their dedication to customer satisfaction and their expertise in service have helped us streamline our operations and achieve remarkable growth. Last order was missing product deliver but customer care help me about missing my 1 pump tracking id #830751, return process on the way.`,
  },
];

const TestimonialCarousel = () => {
  return (
    <>
    <div className='w-full justify-center items-center flex flex-col pt-2'>
        <h2 className='poppins bold text-center !text-blue-950'>TESTIMONIALS</h2>
        <p className='text-center'>What our clients say about us</p>
        </div>
    <div className="w-full py-4 px-4  flex flex-row">
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className=''
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-6 rounded-md shadow-lg h-full">
              <div className="flex items-center space-x-4 mb-4">
                <img src={threem} alt={testimonial.company} className="w-12 h-12 object-contain" />
                <div>
                  <h3 className="!text-lg !poppins-semibold">{testimonial.name}</h3>
                  <p className="!text-sm !text-gray-500">{testimonial.designation}</p>
                </div>
              </div>
              <p className="!text-sm !text-gray-800 leading-relaxed">{testimonial.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </>
  );
};

export default TestimonialCarousel;
