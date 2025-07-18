import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "remixicon/fonts/remixicon.css";
import { useAlert } from "../../contexts/AlertContext";

const AddNewProduct = ({ isOpen, onClose, onSave, menu }) => {
  const [status, setStatus] = useState(true);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [price, setPrice] = useState("0");
  const [discount, setDiscount] = useState("0");
  const [stock, setStock] = useState("0");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [rating, setRating] = useState("0");
  const [tags, setTags] = useState("");
  const [technicalAspects, setTechnicalAspects] = useState([]);
  const { setMessage, setShowSnackBar } = useAlert();

  useEffect(() => {
    
      setCategory("");
      setSubcategory("");
      setPrice("0");
      setDiscount("0");
      setStock("0");
      setImages([]);
      setImagePreviews([]);
      setName("");
      setDescription("");
      setShortDescription("");
      setBrand("");
      setRating("0");
      setTags("");
      setTechnicalAspects([]);
    
  }, []);

  if (!isOpen) return null;

  // console.log(`Menu recieved`,menu)

  const validateInput = () => {
    if (
      !category ||
      !subcategory ||
      !price ||
      !stock ||
      !name ||
      !description ||
      !shortDescription ||
      !brand ||
      !rating ||
      !tags ||
      technicalAspects.length === 0
    ) {
      
      setMessage("Please fill all the required fields");
      setShowSnackBar(true);
      return false;
    }
    console.log('tags',tags)
    return true;
  };

  

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleAddTechDetail = () => {
    setTechnicalAspects([...technicalAspects, { label: "", value: "" }]);
  };

  const handleTechDetailChange = (index, field, value) => {
    const updated = [...technicalAspects];
    updated[index][field] = value;
    setTechnicalAspects(updated);
  };

  const handleDeleteTechDetail = (index) => {
    const updated = [...technicalAspects];
    updated.splice(index, 1);
    setTechnicalAspects(updated);
  };

  const discountedPrice = price - (price * discount) / 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-auto p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[95%] overflow-auto p-6 shadow-lg">
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="text-md md:text-lg font-semibold mb-4">
            Edit Product
          </h2>
          <i
            className="ri-close-line cursor-pointer text-blue-950 text-2xl"
            onClick={onClose}
          ></i>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ">
          <TextField
            label="Product Name *"
            size="small"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Brand *"
            size="small"
            fullWidth
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <TextField
            label="Rating *"
            size="small"
            type="number"
            fullWidth
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
          <TextField
            label="Tags (comma separated) *"
            size="small"
            fullWidth
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <FormControl fullWidth>
            <label className="text-sm font-medium text-gray-700 mb-1">
              Status *
            </label>
            <Select
              size="small"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem key={true} value={true}>
                Active
              </MenuItem>
              <MenuItem key={false} value={false}>
                Inactive
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <label className="text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <Select
              size="small"
              value={category || ""}
              onChange={(e) => setCategory(e.target.value)}
            >
              {menu.map((s) => (
                <MenuItem key={s._id} value={s}>
                  {s.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <TextField
            label="Category"
            size="small"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          /> */}
          {/* <TextField
            label="Subcategory"
            size="small"
            fullWidth
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
          /> */}

          {category && category.subcategories.length > 0 && (
            <FormControl fullWidth>
              <label className="text-sm font-medium text-gray-700 mb-1">
                Subcategory *
              </label>
              <Select
                size="small"
                value={subcategory || ""}
                onChange={(e) => setSubcategory(e.target.value)}
              >
                {category.subcategories.map((s) => (
                  <MenuItem key={s._id} value={s}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <TextField
            label="Price *"
            size="small"
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <TextField
            label="Discount (%)"
            size="small"
            type="number"
            fullWidth
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
          />
          <TextField
            label="Stock *"
            size="small"
            type="number"
            fullWidth
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />
        </div>

        <p className="!text-sm my-6 font-semibold">
          Discounted Price:{" "}
          <span className="text-green-500 !text-sm">
            ₹{discountedPrice.toFixed(2)}
          </span>
        </p>

        <TextField
          label="Short Description *"
          size="small"
          fullWidth
          multiline
          rows={2}
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Full Description *"
          size="small"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />

        <div className="my-8">
          <label className="block text-md md:text-lg font-medium text-blue-950 mb-1">
            Upload Images (up to 3)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {imagePreviews && imagePreviews.length > 0 && (
          <div className="flex gap-4 mb-8">
            {imagePreviews.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`preview-${index}`}
                className="w-20 h-20 object-cover rounded border"
              />
            ))}
          </div>
        )}

        <div className="my-12">
          <div className="flex items-center justify-between mb-2">
            <h3 className="!text-md md:!text-lg !font-medium">
              Technical Details *
            </h3>
            <Button
              variant="outlined"
              size="small"
              onClick={handleAddTechDetail}
            >
              Add
            </Button>
          </div>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Label</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {technicalAspects &&
                  technicalAspects.length > 0 &&
                  technicalAspects.map((detail, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <TextField
                          size="small"
                          value={detail.label}
                          onChange={(e) =>
                            handleTechDetailChange(
                              index,
                              "label",
                              e.target.value
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={detail.value}
                          onChange={(e) =>
                            handleTechDetailChange(
                              index,
                              "value",
                              e.target.value
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleDeleteTechDetail(index)}
                        >
                          <i className="ri-delete-bin-line text-red-600 text-md md:text-lg"></i>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className="flex justify-end gap-3">
          <Button onClick={onClose} variant="outlined" size="small">
            Cancel
          </Button>
          <Button
            onClick={() =>
              validateInput() &&
              onSave({
                status,
                category,
                subcategory,
                price,
                discount,
                stock,
                images,
                name,
                description,
                shortDescription,
                brand,
                rating,
                tags: tags.split(",").map((t) => t.trim()),
                technicalAspects,
              })
            }
            variant="contained"
            color="primary"
            size="small"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
