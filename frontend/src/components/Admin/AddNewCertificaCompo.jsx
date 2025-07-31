import React, { useEffect, useState } from "react";
import { Modal, Box, Button, Typography, TextField } from "@mui/material";
import { useAlert } from "../../contexts/AlertContext";
import { AddNewCertificate,UpdateCertificate } from "../../apis/content";

const AddNewCertificateComponent = ({
  open,
  onClose,
  setIsSuccess,
  mode,
  existingData,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  
  console.log(existingData)
  const { setMessage: setAlertMessage, setShowSnackBar } = useAlert();

  useEffect(() => {
    if (mode === "edit" && existingData) {
      setTitle(existingData.title || "");
      setDescription(existingData.description || "")
      setPreview(existingData.img.secure_url || null);
      setImageFile(null);
    } else {
      setTitle("");
      setDescription("")
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
    if (!title) {
      setAlertMessage("Please fill in all required fields.");
      setShowSnackBar(true);
      return;
    }

    if (!description) {
      setAlertMessage("Please fill in all required fields.");
      setShowSnackBar(true);
      return;
    }

    setLoading(true);

    const formData = {
      title,
      description,
      img: imageFile,
      id: existingData?._id,
    };

    try {
      const response =
        mode === "add"
          ? await AddNewCertificate(formData)
          : await UpdateCertificate(formData);

      if (response.success) {
        setAlertMessage(
          mode === "add"
            ? "Certificate added successfully!"
            : "Certificate updated successfully!"
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
    setTitle("");
    setImageFile(null);
    setDescription("")
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
          {mode === "add" ? "Add Certificate" : "Edit Certificate"}
        </Typography>

        <div className="flex flex-col gap-4">
          <TextField
            required
            size="small"
            label="Certificate Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />

          <TextField
            required
            size="small"
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Upload Certificate Image
            </label>
            <label
              htmlFor="upload-certificate"
              className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded hover:bg-gray-200 text-sm text-center"
            >
              {imageFile
                ? imageFile.name
                : mode === "edit"
                ? "Choose New File (optional)"
                : "Choose File"}
            </label>
            <input
              id="upload-certificate"
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

export default AddNewCertificateComponent;
