import { useEffect, useState } from "react";
import cert1 from "../assets/images/certificates/cert1.jpeg";
import cert2 from "../assets/images/certificates/cert2.jpeg";
import cert3 from "../assets/images/certificates/cert3.jpg";
import { getCertificates } from "../apis/content";
import { useLoader } from "../contexts/LoaderContext";
import { useAlert } from "../contexts/AlertContext";

function Certification() {
  const [certificates, setCertificates] = useState([]);
  const { setLoading } = useLoader();
  const { setMessage, setShowSnackBar } = useAlert();
  useEffect(() => {
    const fetchData=async()=>{
       const response = await getCertificates();
    if (response.success) {
      setCertificates(response.certificates);
    }
    }
   fetchData();
  }, []);
  return (
    <div class="px-12 md:px-22 py-12">
      <h2 class="!text-xl md:!text-3xl !font-bold !text-center !text-blue-900 mb-12">
        Our Certifications
      </h2>

      {certificates &&
        certificates.map((cert1, i) => {
          
          return i % 2 == 0 ? (
            <div class="flex flex-col md:flex-row items-center mb-16">
              <div class="md:w-1/2 mb-6 md:mb-0">
                <h3 class="!text-md md:!text-xl !font-semibold !text-blue-800">
                  {cert1?.title  || ""}
                </h3>
                <p class="mt-4 !text-sm md:!text-md !text-gray-700">
                  {cert1?.description  || ""}
                </p>
              </div>
              <div class="md:w-1/2 flex justify-center">
                <img
                  src={cert1?.img?.secure_url  || null}
                  alt="certification"
                  class="w-64 h-48 object-contain rounded shadow-lg"
                ></img>
              </div>
            </div>
          ) : (
            <div class="flex flex-col md:flex-row-reverse items-center mb-16">
              <div class="md:w-1/2 mb-6 md:mb-0">
                <h3 class="!text-md md!text-xl !font-semibold !text-blue-800">
                 {cert1?.title  || ""}
                </h3>
                <p class="mt-4 !text-sm md:!text-md !text-gray-700">
                 {cert1?.description  || ""}
                </p>
              </div>
              <div class="md:w-1/2 flex justify-center">
                <img
                  src={cert1?.img?.secure_url  || null}
                  alt="certification"
                  class="w-64 h-48 object-contain rounded shadow-lg"
                ></img>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Certification;
