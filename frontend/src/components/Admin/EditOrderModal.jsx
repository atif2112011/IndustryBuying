import { Box, Button, FormControl, MenuItem, Modal, Select,IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";

const EditOrderModal = ({ isOpen, onClose, orderData, onSave }) => {
  const [status, setStatus] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [invoiceURL,setInvoiceURL] = useState(null);
   // Image Gallery
    const [open, setOpen] = useState(false);
    const handleOpen = (index) => {
      setOpen(true);
    };
  
    const handleClose = () => setOpen(false);

  useEffect(() => {
    if (orderData) {
      setStatus(orderData.status);
      setInvoice(orderData.invoiceUrl);
      if(orderData?.invoiceUrl){
        setInvoiceURL(orderData.invoiceUrl);
      }
    }
  }, [orderData]);

  const statusColors = {
    processing: "bg-blue-100 text-blue-800",
    packed: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    refunded: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  // console.log("orderData", orderData);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-auto p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90%] overflow-auto p-6 shadow-lg ">
        <h2 className="!text-md md:!text-lg font-semibold mb-2">
          Order ID: {orderData?._id}
        </h2>
        <p className="!text-xs md:!text-sm mb-1">
          <span className="font-semibold !text-xs md:!text-sm">
            Date Ordered:{" "}
          </span>
          {new Date(orderData?.createdAt).toLocaleString()}
        </p>
        <p className="!text-xs md:!text-sm mb-1">
          <span className="font-semibold !text-xs md:!text-sm">
            Customer Name:{" "}
          </span>
          {orderData?.userName}
        </p>
        <p className="!text-xs md:!text-sm mb-2">
          <span className="font-semibold !text-xs md:!text-sm ">
            Shipping Address:{" "}
          </span>
          {orderData?.shippingInfo && formatAddress(orderData?.shippingInfo)}
        </p>
        <p className="!text-xs md:!text-sm mb-2">
          <span className="font-semibold !text-xs md:!text-sm ">
            Billing Address:{" "}
          </span>
          {orderData?.billingInfo && formatAddress(orderData?.billingInfo)}
        </p>
        <p className="!text-xs md:!text-sm mb-2">
          <span className="font-semibold !text-xs md:!text-sm ">
            Payment Method:{" "}
          </span>
          {orderData?.paymentInfo?.method || "NUll"}
        </p>
        <p className="!text-xs md:!text-sm mb-2">
          <span className="font-semibold !text-xs md:!text-sm ">
            Payment Status:{" "}
          </span>
          {orderData?.paymentInfo?.status || "NUll"}
        </p>
        <h3 className="font-semibold !text-md md:!text-lg mt-4 mb-2">
          Product Items:
        </h3>
        <div className="border rounded-md overflow-hidden mb-4">
          <div className="grid grid-cols-4 bg-gray-200 px-2 py-1 font-medium ">
            <span className="!text-xs md:!text-sm text-blue-950">Product</span>
            <span className="!text-xs md:!text-sm text-blue-950">Qty</span>
            <span className="!text-xs md:!text-sm text-blue-950">Price</span>
            <span className="!text-xs md:!text-sm text-blue-950">Subtotal</span>
          </div>
          {orderData && orderData.items && orderData.items.length>0 && orderData.items.map((item, index) => (
            <div key={index} className="grid grid-cols-4 px-2 py-1 border-t space-x-1">
              <span className="!text-xs md:!text-sm text-gray-800">
                {item.productName}
              </span>
              <span className="!text-xs md:!text-sm text-gray-800">
                {item.quantity}
              </span>
              <span className="!text-xs md:!text-sm text-gray-800">
                {(item.price).toFixed(2)}
              </span>
              <span className="!text-xs md:!text-sm text-gray-800">
                {(item.subtotal).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="block !text-md md:!text-lg !font-medium mb-1 text-blue-950">
            Status :
          </label>
          <FormControl fullWidth>
            <Select
              value={status || ""}
              onChange={(e) => setStatus(e.target.value)}
              size="small"
            >
              {Object.keys(statusColors).map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="flex flex-row w-full items-center">
          <div className="mb-4">
            <label className="block !text-md md:!text-lg !font-medium mb-1 text-blue-950">
              {orderData?.invoiceUrl ? "Update Invoice :" : "Upload Invoice :"}
            </label>
            <input
              type="file"
              accept="image/*, application/pdf"
              onChange={(e) => setInvoice(e.target.files[0])}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          {orderData && orderData.invoiceUrl && (
            <div className="flex flex-row gap-2 flex-wrap mb-4">
              <Button
                variant="outlined"
                size="small"
                color="primary"
                // onClick={() => window.open(orderData.invoiceUrl, "_blank")}
                onClick={() => setOpen(true)}
              >
                View Uploaded Invoice
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={() => window.open(orderData.invoiceUrl, "_blank")}
                // onClick={() => setOpen(true)}
              >
                Download
              </Button>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button onClick={onClose} variant="outlined" size="small">
            Cancel
          </Button>
          <Button
            onClick={() => onSave({ ...orderData, status, invoice })}
            variant="contained"
            color="primary"
            size="small"
          >
            Update Order
          </Button>
        </div>
      </div>
       <Modal open={open} onClose={handleClose}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  outline: "none",
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                  overflow: "auto"
                }}
              >
                
      
                <img
                  src={invoiceURL}
                  alt="Large preview"
                  style={{
                    maxWidth: "90vw",
                    maxHeight: "90vh",
                    borderRadius: "10px",
                    boxShadow: "0 0 20px rgba(0,0,0,0.5)"
                  }}
                />
      
                
      
                <IconButton
                  onClick={handleClose}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    color: "black"
                    
                  }}
                >
                  <i className="ri-close-line" style={{ fontSize: "24px" }} />
                </IconButton>
              </Box>
            </Modal>
    </div>
  );
};

function formatAddress(address = {}) {
  const parts = [
    address.flat,
    address.area,
    address.landmark,
    address.city,
    address.state,
    address.pincode
  ];

  // Filter out falsy values and join with commas
  return parts.filter(Boolean).join(", ");
}

export default EditOrderModal;
