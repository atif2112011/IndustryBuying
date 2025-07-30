import React, { useEffect, useState } from "react";
import { Modal, Box, Button, Typography, TextField } from "@mui/material";
import { useAlert } from "../../contexts/AlertContext";
import { AddNewBrand, UpdateBrand } from "../../apis/content";

const AddNewBrandComponent = ({
  open,
  onClose,
  setIsSuccess,
  mode ,
  existingData
 
}) => {

  const [brandName, setBrandName] = useState("");
  const [brandFile, setBrandFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setMessage, setShowSnackBar } = useAlert();

  useEffect(() => {
    if (mode === "edit" && existingData) {
      setBrandName(existingData.name || "");
      setBrandFile(null); // Let them re-upload if needed
    } else {
      setBrandName("");
      setBrandFile(null);
    }
  }, [mode, existingData, open]);

  const handleSubmit = async () => {
    if (!brandName.trim() || (mode === "add" && !brandFile)) {
      setMessage("Please fill in all required fields.");
      setShowSnackBar(true);
      return;
    }

    setLoading(true);

    try {
      const formData = {
        name: brandName,
        img: brandFile,
        id: existingData?._id,
      };

      const response =
        mode === "add"
          ? await AddNewBrand(formData)
          : await UpdateBrand(formData);

      if (response.success) {
        setMessage(
          mode === "add"
            ? "Brand added successfully!"
            : "Brand updated successfully!"
        );
        setShowSnackBar(true);
        setIsSuccess(true);
        onClose();
      } else {
        setMessage(response.message);
        setShowSnackBar(true);
      }
    } catch (error) {
      console.error(error.message);
      setMessage("Something went wrong.");
      setShowSnackBar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setBrandName("");
    setBrandFile(null);
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
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography variant="h6" className="mb-4 text-center">
          {mode === "add" ? "Add Brand" : "Edit Brand"}
        </Typography>
        <div className="flex flex-col gap-4">
          <TextField
            required
            size="small"
            label="Brand Name"
            fullWidth
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            disabled={loading}
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Brand Logo
            </label>
            <label
              htmlFor="upload-logo"
              className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded hover:bg-gray-200 text-sm text-center"
            >
              {brandFile
                ? brandFile.name
                : mode === "edit"
                ? "Choose New File (optional)"
                : "Choose File"}
            </label>
            <input
              id="upload-logo"
              type="file"
              accept="image/*"
              onChange={(e) => setBrandFile(e.target.files[0])}
              className="hidden"
              disabled={loading}
            />
          </div>

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

export default AddNewBrandComponent;
