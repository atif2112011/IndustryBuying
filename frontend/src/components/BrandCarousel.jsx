import { useEffect, useRef, useState } from "react";

// Dummy brand logos (replace URLs as needed)
const brands = [
  {
    name: "UNO MINDA",
    logo: "https://1000logos.net/wp-content/uploads/2021/10/UNO-Minda-Logo.png",
  },
  {
    name: "DURACELL",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Duracell_logo.svg/2560px-Duracell_logo.svg.png",
  },
  {
    name: "ARISTO",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Aristo_logo.png",
  },
  {
    name: "YATO",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Yato_logo.svg",
  },
  {
    name: "SAFARI",
    logo: "https://seeklogo.com/images/S/safari-pro-logo-E0A94A9C2B-seeklogo.com.png",
  },
  {
    name: "3M",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/3M_wordmark.svg/1280px-3M_wordmark.svg.png",
  },
  {
    name: "Bosch",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Bosch-logo.svg/1280px-Bosch-logo.svg.png",
  },
];

function BrandCarousel() {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (brands.length - visibleCount + 1));
    }, 3000); // 3 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const scrollContainer = containerRef.current;
    scrollContainer.scrollTo({
      left: currentIndex * 160, // 160 = width + gap
      behavior: "smooth",
    });
  }, [currentIndex]);

  return (
    <div className="w-full px-4 py-6">
      <div className="overflow-hidden">
        <h3 className="poppins-semibold w-full">
            TRUSTED BRANDS
        </h3>
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto hide-scroll transition-all duration-500 mt-6"
        >
          {brands.map((brand, idx) => (
            <div key={idx} className="min-w-[150px] flex justify-center items-center">
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-4 gap-1">
        {Array.from({ length: brands.length - visibleCount + 1 }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default BrandCarousel;
