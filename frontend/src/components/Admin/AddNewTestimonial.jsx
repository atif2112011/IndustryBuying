import React, { useEffect, useState } from "react";
import { Modal, Box, Button, Typography, TextField } from "@mui/material";
import { useAlert } from "../../contexts/AlertContext";
import { AddNewTestimonial } from "../../apis/content";
import { UpdateTestimonial } from "../../apis/content";

const AddNewTestimonialComponent = ({
  open,
  onClose,
  setIsSuccess,
  mode,
  existingData,
}) => {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // ✅ new state
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const { setMessage: setAlertMessage, setShowSnackBar } = useAlert();

  useEffect(() => {
    if (mode === "edit" && existingData) {
      setName(existingData.name || "");
      setDesignation(existingData.designation || "");
      setCompany(existingData.company || ""); // ✅ prefill
      setMessage(existingData.message || "");
      setPreview(existingData.img || null);
      setImageFile(null); // user can optionally re-upload
    } else {
      setName("");
      setDesignation("");
      setMessage("");
      setCompany("")
      setImageFile(null);
      setPreview(null);
    }
  }, [mode, existingData, open]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!name || !designation || !message) {
      setAlertMessage("Please fill in all required fields.");
      setShowSnackBar(true);
      return;
    }

    setLoading(true);

    const formData = {
      name,
      designation,
      company,
      message,
      img: imageFile,
      id: existingData?._id,
    };

    try {
        const response =
          mode === "add"
            ? await AddNewTestimonial(formData)
            : await UpdateTestimonial(formData)

        console.log("testimonial",response)    

      if (response.success) {
        setAlertMessage(
          mode === "add"
            ? "Testimonial added successfully!"
            : "Testimonial updated successfully!"
        );
        setShowSnackBar(true);
        setIsSuccess(true);
        onClose();
      } else {
        setAlertMessage(response.message);
        setShowSnackBar(true);
      }
    } catch (error) {
      console.error(error.message);
      setAlertMessage("Something went wrong.");
      setShowSnackBar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName("");
    setDesignation("");
    setMessage("");
    setImageFile(null);
    setPreview(null);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography variant="h6" className="!mb-4 text-center">
          {mode === "add" ? "Add Testimonial" : "Edit Testimonial"}
        </Typography>

        <div className="flex flex-col gap-4">
          <TextField
            required
            size="small"
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
          <TextField
            required
            size="small"
            label="Designation"
            fullWidth
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            disabled={loading}
          />

          <TextField
            required
            size="small"
            label="Company"
            fullWidth
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            disabled={loading}
          />
          <TextField
            required
            size="small"
            label="Message"
            fullWidth
            multiline
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <label
              htmlFor="upload-image"
              className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded hover:bg-gray-200 text-sm text-center"
            >
              {imageFile
                ? imageFile.name
                : mode === "edit"
                ? "Choose New File (optional)"
                : "Choose File"}
            </label>
            <input
              id="upload-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={loading}
            />
          </div>

          {preview && (
            <div className="mt-2">
              <img
                src={preview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded border"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading
                ? mode === "add"
                  ? "Adding..."
                  : "Updating..."
                : mode === "add"
                ? "Add"
                : "Update"}
            </Button>
            <Button variant="outlined" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default AddNewTestimonialComponent;
