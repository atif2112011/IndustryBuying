import { useState } from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import "remixicon/fonts/remixicon.css";

const ContentTab = () => {
  const [brandIcons] = useState([
    { name: "Apple", img: "https://via.placeholder.com/50" },
    { name: "Samsung", img: "https://via.placeholder.com/50" },
  ]);

  const [testimonials] = useState([
    {
      name: "John Doe",
      designation: "CEO",
      company: "Acme Inc",
      logo: "https://via.placeholder.com/40",
      message: "Great experience!",
    },
    {
      name: "Jane Smith",
      designation: "Manager",
      company: "Tech Co",
      logo: "https://via.placeholder.com/40",
      message: "Loved the service.",
    },
  ]);

  const [aboutText] = useState(
    "We are a forward-thinking company focused on innovation and quality. Our team is dedicated to delivering the best products and services to our customers."
  );

  const [certifications] = useState([
    {
      img: "https://via.placeholder.com/80",
      title: "ISO 9001",
      text: "Certified for quality management standards.",
    },
    {
      img: "https://via.placeholder.com/80",
      title: "ISO 27001",
      text: "Certified for information security management.",
    },
  ]);

  return (
    <div className="p-4 space-y-10">
      {/* Brand Icons Section */}
      <section>
        <h2 className="text-xs md:text-lg font-semibold mb-4 flex items-center gap-2">
          <i className="ri-price-tag-3-line text-blue-600" />
          Brand Icons
        </h2>
        <Table size="small" sx={{ backgroundColor: "white"}}>
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
            {brandIcons.map((brand, index) => (
              <TableRow key={index}>
                <TableCell sx={{ padding: "6px 12px" }} className="text-xs md:text-md font-medium text-gray-800">
                  {brand.name}
                </TableCell>
                <TableCell sx={{ padding: "6px 12px" }}>
                  <img
                    src={brand?.img?.secure_url || ""}
                    alt={brand.name}
                    className="w-10 h-10 object-contain"
                  />
                </TableCell>
                <TableCell sx={{ padding: "6px 12px" }}>
                                      <div className="flex items-center gap-2">
                                        {/* <IconButton
                                          size="small"
                                          onClick={() => handleEdit(product)}
                                        >
                                          <i className="ri-pencil-line text-blue-600 text-base"></i>
                                        </IconButton> */}
                                        <IconButton
                                          size="small"
                                          // onClick={() => handleDelete(product._id)}
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

      {/* Testimonials Section */}
      <section>
        <h2 className="text-xs md:text-lg font-semibold mb-4 flex items-center gap-2">
          <i className="ri-chat-3-line text-blue-600" />
          Testimonials
        </h2>
        <Table size="small" sx={{ backgroundColor: "white"}}>
          <TableHead>
            <TableRow>
              {["Name", "Designation", "Company", "Logo", "Message","Action"].map(
                (header, index) => (
                <TableCell sx={{ padding: "12px 12px" }}><div className="text-xs md:text-sm font-semibold text-gray-800">
                 {header}
                </div></TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {testimonials.map((t, index) => (
              <TableRow key={index}>
                <TableCell sx={{ padding: "6px 12px" }} className="text-xs md:text-md">{t.name}</TableCell>
                <TableCell sx={{ padding: "6px 12px" }} className="text-xs md:text-md">
                  {t.designation}
                </TableCell>
                <TableCell sx={{ padding: "6px 12px" }} className="text-xs md:text-md">
                  {t.company}
                </TableCell>
                <TableCell sx={{ padding: "6px 12px" }}>
                  <img
                    src={t?.logo?.secure_url || ""}
                    alt="logo"
                    className="w-10 h-10 object-contain"
                  />
                </TableCell>
                <TableCell sx={{ padding: "6px 12px" }} className="text-xs md:text-md truncate">
                  {t.message}
                </TableCell>
                <TableCell sx={{ padding: "6px 12px" }}>
                                      <div className="flex items-center gap-2">
                                        {/* <IconButton
                                          size="small"
                                          onClick={() => handleEdit(product)}
                                        >
                                          <i className="ri-pencil-line text-blue-600 text-base"></i>
                                        </IconButton> */}
                                        <IconButton
                                          size="small"
                                          // onClick={() => handleDelete(product._id)}
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
      <section >
        <h2 className="text-xs md:text-lg font-semibold mb-4 flex items-center gap-2">
          <i className="ri-information-line text-blue-600" />
          About Us
        </h2>
        <div className="bg-white p-4 rounded-md shadow-sm text-xs md:text-md leading-relaxed text-gray-800">
          {aboutText}
        </div>
      </section>

      {/* Certifications Section */}
      <section>
        <h2 className="text-xs md:text-lg font-semibold mb-4 flex items-center gap-2">
          <i className="ri-award-line text-blue-600" />
          Certifications
        </h2>
        <Table size="small" sx={{ backgroundColor: "white"}}>
          <TableHead>
            <TableRow>
              {["Certificate Image", "Title", "Description","Action"].map(
                (header, index) => (
                <TableCell sx={{ padding: "12px 12px" }}><div className="text-xs md:text-sm font-semibold text-gray-800">
                 {header}
                </div></TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {certifications.map((cert, index) => (
              <TableRow key={index}>
                <TableCell sx={{ padding: "6px 12px" }}>
                  <img
                    src={cert?.img?.secure_url || ""}
                    alt={cert.title}
                    className="w-16 h-16 object-contain"
                  />
                </TableCell>
                <TableCell sx={{ padding: "6px 12px" }} className="text-xs md:text-md">
                  {cert.title}
                </TableCell>
                <TableCell sx={{ padding: "6px 12px" }} className="text-xs md:text-md">
                  {cert.text}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default ContentTab;
