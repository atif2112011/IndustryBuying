import { Button, FormControl, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";

const EditOrderModal = ({ isOpen, onClose, orderData, onSave }) => {
  const [status, setStatus] = useState(null);
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    if (orderData) {
      setStatus(orderData.status);
      setInvoice(orderData.invoiceUrl);
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
          {"---"}
        </p>
        <p className="!text-xs md:!text-sm mb-2">
          <span className="font-semibold !text-xs md:!text-sm ">
            Billing Address:{" "}
          </span>
          {"---"}
        </p>
        <p className="!text-xs md:!text-sm mb-2">
          <span className="font-semibold !text-xs md:!text-sm ">
            Payment Method:{" "}
          </span>
          {orderData?.paymentInfo?.method || "NUll"}
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
            <div key={index} className="grid grid-cols-4 px-2 py-1 border-t">
              <span className="!text-xs md:!text-sm text-gray-800">
                {item.productName}
              </span>
              <span className="!text-xs md:!text-sm text-gray-800">
                {item.quantity}
              </span>
              <span className="!text-xs md:!text-sm text-gray-800">
                {item.price}
              </span>
              <span className="!text-xs md:!text-sm text-gray-800">
                {item.subtotal}
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
            <div className="mb-4">
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={() => window.open(orderData.invoiceUrl, "_blank")}
              >
                View Uploaded Invoice
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
    </div>
  );
};

export default EditOrderModal;
