import { useEffect, useState,useCallback } from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Modal,
  Box,
  Button,
  Typography,
} from "@mui/material";
import AddNewBrandComponent from "../../components/Admin/AddNewBrand";
import "remixicon/fonts/remixicon.css";
import { getBrandIcons, getCertificates, getTestimonials } from "../../apis/content";
import { useLoader } from "../../contexts/LoaderContext";
import { useAlert } from "../../contexts/AlertContext";
import { DeleteBrand } from "../../apis/content";
import { DeleteTestimonial,DeleteCertificate } from "../../apis/content";
import AddNewTestimonial from "../../components/Admin/AddNewTestimonial";
import AddNewCertificateComponent from "../../components/Admin/AddNewCertificaCompo";






const ContentTab = () => {

  const { setLoading } = useLoader();
  const { setMessage, setShowSnackBar } = useAlert();
  const [brandIcons, setBrandIcons] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editBrand, setEditBrand] = useState(null); // for edit data
  const [testimonials, setTestimonials] = useState([]);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [editTestimonial, setEditTestimonial] = useState(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [editCertificate, setEditCertificate] = useState(null);
 

  const [aboutText] = useState(
    "We are a forward-thinking company focused on innovation and quality. Our team is dedicated to delivering the best products and services to our customers."
  );

  const [certificates, setCertificates] = useState([]);

 

  useEffect(() => {
    const fetchData = async () => {
      const response = await getBrandIcons();
        if (response.success) {
        setBrandIcons(response.brands);
      } else {
        setMessage(response.message);
        setShowSnackBar(true);
      }

      const response2 = await getTestimonials();
      if (response2.success) {
        setTestimonials(response2.testimonials);
      } else {
        setMessage(response2.message);
        setShowSnackBar(true);
      }
      const response3 = await getCertificates();
      if (response3.success) {
        setCertificates(response3.certificates);
      } else {
        setMessage(response3.message);
        setShowSnackBar(true);
      }
    };
    setLoading(true);
    fetchData();
    setLoading(false);
    setIsSuccess(false);
  }, [isSuccess]);

  const deleteBrandHandler = useCallback(
    async (id) => {
      if(id===null)
        return;

      setLoading(true);

      try {
        const res = await DeleteBrand(id);
        if (res?.success) {
          setMessage(res.message); // assuming setMessage is stable
          setShowSnackBar(true); // assuming setShowSnackBar is stable
          setIsSuccess(true); // only this is the tracked dependency
        } else {
          throw new Error(res?.message);
        }
      } catch (error) {
        setMessage(error.message);
        setShowSnackBar(true);
      } finally {
        setLoading(false);
      }
    },
    []
  ); // 👈 Only tracking this

  const deleteTestimonialHandler = useCallback(
    async (id) => {
      if (id === null) return;

      setLoading(true);

      try {
        const res = await DeleteTestimonial(id)
        if (res?.success) {
          setMessage(res.message); // assuming setMessage is stable
          setShowSnackBar(true); // assuming setShowSnackBar is stable
          setIsSuccess(true); // only this is the tracked dependency
        } else {
          throw new Error(res?.message);
        }
      } catch (error) {
        setMessage(error.message);
        setShowSnackBar(true);
      } finally {
        setLoading(false);
      }
    },
    []
  ); 

  const deleteCertificateHandler = useCallback(
    async (id) => {
      if (id === null) return;

      setLoading(true);

      try {
        const res = await DeleteCertificate(id);
        if (res?.success) {
          setMessage(res.message); // assuming setMessage is stable
          setShowSnackBar(true); // assuming setShowSnackBar is stable
          setIsSuccess(true); // if this is used to trigger re-fetch or effect
        } else {
          throw new Error(res?.message);
        }
      } catch (error) {
        setMessage(error.message);
        setShowSnackBar(true);
      } finally {
        setLoading(false);
      }
    },
    [] // optionally add [setIsSuccess] if you're relying on it for external effects
  );

  return (
    <div className="p-4 space-y-10">
      {/* Brand Icons Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs md:text-lg font-semibold flex items-center gap-2">
            <i className="ri-price-tag-3-line text-blue-600" />
            Brand Icons
          </h2>
          <button
            className="text-xs md:text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            onClick={() => {
              setEditBrand(null);
              setShowModal(true);
            }}
          >
            Add Brand
          </button>
        </div>
        <Table size="small" sx={{ backgroundColor: "white" }}>
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ padding: "12px 12px" }}>
                <div className="text-xs md:text-sm font-semibold text-gray-800">
                  Brand Name
                </div>
              </TableCell>
              <TableCell>
                <div className="text-xs md:text-sm font-semibold text-gray-800">
                  Brand Logo
                </div>
              </TableCell>
              <TableCell>
                <div className="text-xs md:text-sm font-semibold text-gray-800">
                  Action
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brandIcons &&
              brandIcons.map((brand, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{ padding: "6px 12px" }}
                    className="text-xs md:text-md font-medium text-gray-800"
                  >
                    {brand.name}
                  </TableCell>
                  <TableCell sx={{ padding: "6px 12px" }}>
                    <img
                      src={brand?.img?.secure_url || null}
                      alt={brand.name}
                      className="w-15 h-15 object-contain"
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "6px 12px" }}>
                    <div className="flex items-center gap-2">
                      <IconButton
                        size="small"
                        onClick={() => {
                          setEditBrand(brand); // pass full brand object with _id
                          setShowModal(true);
                        }}
                      >
                        <i className="ri-pencil-line text-blue-600 text-base"></i>
                      </IconButton>
                      <IconButton size="small">
                        <i
                          onClick={() => {
                            setbrandId(brand?._id);
                            deleteBrandHandler(brand?._id);
                          }}
                          className="ri-delete-bin-line text-red-600 text-base"
                        ></i>
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </section>

      {/* Testimonials Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs md:text-lg font-semibold flex items-center gap-2">
            <i className="ri-chat-3-line text-blue-600" />
            Testimonials
          </h2>
          <button
            className="text-xs md:text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            onClick={() => {
              setEditTestimonial(null);
              setShowTestimonialModal(true);
            }}
          >
            Add Testimonial
          </button>
        </div>
        <Table size="small" sx={{ backgroundColor: "white" }}>
          <TableHead>
            <TableRow>
              {[
                "Name",
                "Designation",
                "Company",
                "Logo",
                "Message",
                "Action",
              ].map((header, index) => (
                <TableCell key={index} sx={{ padding: "12px 12px" }}>
                  <div className="text-xs md:text-sm font-semibold text-gray-800">
                    {header}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {testimonials &&
              testimonials.map((t, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{ padding: "6px 12px" }}
                    className="text-xs md:text-md"
                  >
                    {t.name}
                  </TableCell>
                  <TableCell
                    sx={{ padding: "6px 12px" }}
                    className="text-xs md:text-md"
                  >
                    {t.designation}
                  </TableCell>
                  <TableCell
                    sx={{ padding: "6px 12px" }}
                    className="text-xs md:text-md"
                  >
                    {t.company}
                  </TableCell>
                  <TableCell sx={{ padding: "6px 12px" }}>
                    <img
                      src={t?.logo?.secure_url || null}
                      alt="logo"
                      className="w-10 h-10 object-contain"
                    />
                  </TableCell>
                  <TableCell
                    sx={{ padding: "6px 12px" }}
                    className="text-xs md:text-md truncate max-w-[200px]"
                  >
                    {t.message}
                  </TableCell>
                  <TableCell sx={{ padding: "6px 12px" }}>
                    <div className="flex items-center gap-2">
                      <IconButton
                        size="small"
                        onClick={() => {
                          setEditTestimonial(t);
                          setShowTestimonialModal(true);
                        }}
                      >
                        <i className="ri-pencil-line text-blue-600 text-base"></i>
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => deleteTestimonialHandler(t._id)}
                      >
                        <i className="ri-delete-bin-line text-red-600 text-base"></i>
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </section>

      {/* About Us Section */}
      {/* <section >
        <h2 className="text-xs md:text-lg font-semibold mb-4 flex items-center gap-2">
          <i className="ri-information-line text-blue-600" />
          About Us
        </h2>
        <div className="bg-white p-4 rounded-md shadow-sm text-xs md:text-md leading-relaxed text-gray-800">
          {aboutText}
        </div>
      </section> */}

      {/* Certifications Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs md:text-lg font-semibold flex items-center gap-2">
            <i className="ri-award-line text-blue-600" />
            Certifications
          </h2>
          <button
            className="text-xs md:text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            onClick={() => {
              setEditCertificate(null); // or set to the certificate object for edit
              setShowCertificateModal(true);
            }}
          >
            Add Certificate
          </button>
        </div>
        <Table size="small" sx={{ backgroundColor: "white" }}>
          <TableHead>
            <TableRow>
              {["Certificate Image", "Title", "Description", "Action"].map(
                (header, index) => (
                  <TableCell sx={{ padding: "12px 12px" }} key={index}>
                    <div className="text-xs md:text-sm font-semibold text-gray-800">
                      {header}
                    </div>
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {certificates &&
              certificates.map((cert, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ padding: "6px 12px" }}>
                    <img
                      src={cert?.img?.secure_url || null}
                      alt={cert.title}
                      className="w-16 h-16 object-contain"
                    />
                  </TableCell>
                  <TableCell
                    sx={{ padding: "6px 12px" }}
                    className="text-xs md:text-md"
                  >
                    {cert.title}
                  </TableCell>
                  <TableCell
                    sx={{ padding: "6px 12px" }}
                    className="text-xs md:text-md truncate max-w-[400px]"
                  >
                    {cert.description}
                  </TableCell>
                  <TableCell sx={{ padding: "6px 12px" }}>
                    <div className="flex items-center gap-2">
                      <IconButton
                        size="small"
                        onClick={() => {
                          setEditCertificate(cert); // or set to the certificate object for edit
                          setShowCertificateModal(true);
                        }}
                      >
                        <i className="ri-pencil-line text-blue-600 text-base"></i>
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => deleteCertificateHandler(cert._id)}
                      >
                        <i className="ri-delete-bin-line text-red-600 text-base"></i>
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </section>
      {/* modal */}

      <AddNewBrandComponent
        open={showModal}
        onClose={() => setShowModal(false)}
        setIsSuccess={setIsSuccess}
        mode={editBrand ? "edit" : "add"}
        existingData={editBrand}
      ></AddNewBrandComponent>

      <AddNewTestimonial
        open={showTestimonialModal}
        onClose={() => setShowTestimonialModal(false)}
        setIsSuccess={setIsSuccess}
        mode={editTestimonial ? "edit" : "add"}
        existingData={editTestimonial}
      />

      <AddNewCertificateComponent
        open={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
        setIsSuccess={setIsSuccess}
        mode={editCertificate ? "edit" : "add"}
        existingData={editCertificate}
      />
    </div>
  );
};

export default ContentTab;
