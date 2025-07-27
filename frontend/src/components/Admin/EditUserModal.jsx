import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const EditUserModal = ({ isOpen, onClose, userData, onSave }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isBlock, setIsBlock] = useState(false);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setEmail(userData.email || "");
      setPhone(userData.phone || "");
      setRole(userData.role || "");
      setIsVerified(userData.isVerified || false);
      setIsBlock(userData.isBlock || false);
      setAddresses(userData.address || []);
    }
  }, [userData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-auto p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90%] overflow-auto p-6 shadow-lg">
        <h2 className="!text-md md:!text-lg font-semibold mb-4">
          Edit User: {userData?._id}
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextField
            label="Name"
            fullWidth
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Email"
            fullWidth
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Phone"
            fullWidth
            size="small"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <FormControl fullWidth size="small">
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="seller">Seller</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Google Login"
            fullWidth
            size="small"
            disabled
            value={userData?.isGoogleLogin ? "Yes" : "No"}
          />


          <TextField
            label="Created At"
            fullWidth
            size="small"
            disabled
            value={new Date(userData?.createdAt).toLocaleString()}
          />
        </div>

        <div className="flex gap-6 mt-4">
          <FormControlLabel
          className="!text-xs md:!text-sm text-gray-600"
            control={
              <Checkbox
                checked={isVerified}
                onChange={(e) => setIsVerified(e.target.checked)}
              />
            }
            label="Verified"
          />
          <FormControlLabel
          className="!text-xs md:!text-sm text-gray-600"
            control={
              <Checkbox
                checked={isBlock}
                onChange={(e) => setIsBlock(e.target.checked)}
              />
            }
            label="Blocked"
          />
        </div>

        <div className="mt-6">
          <h3 className="text-sm md:!text-md font-semibold mb-2">Addresses:</h3>
          {addresses.length === 0 && (
            <p className="!text-xs md:!text-sm text-gray-600">No address found.</p>
          )}

          {addresses.map((addr, idx) => (
            <div
              key={addr._id || idx}
              className="mb-4 p-4 rounded-md border border-gray-300 bg-gray-50"
            >
              <h4 className="font-medium !text-sm mb-1 text-gray-800">
                {addr.isShipping ? "Shipping Address" : "Billing Address"} #{idx + 1}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-800">
                <p className="!text-xs md:!text-sm" ><strong>Name:</strong> {addr.name}</p>
                <p className="!text-xs md:!text-sm" ><strong>Email:</strong> {addr.email}</p>
                <p className="!text-xs md:!text-sm" ><strong>Phone:</strong> {addr.phone}</p>
                <p className="!text-xs md:!text-sm" ><strong>Alt Phone:</strong> {addr.alternatePhone}</p>
                <p className="!text-xs md:!text-sm" ><strong>Flat:</strong> {addr.flat}</p>
                <p className="!text-xs md:!text-sm" ><strong>Area:</strong> {addr.area}</p>
                <p className="!text-xs md:!text-sm" ><strong>Landmark:</strong> {addr.landmark}</p>
                <p className="!text-xs md:!text-sm" ><strong>City:</strong> {addr.city}</p>
                <p className="!text-xs md:!text-sm" ><strong>State:</strong> {addr.state}</p>
                <p className="!text-xs md:!text-sm" ><strong>Pincode:</strong> {addr.pincode}</p>
                <p className="!text-xs md:!text-sm" ><strong>GSTIN:</strong> {addr.GSTIN}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button onClick={onClose} variant="outlined" size="small">
            Cancel
          </Button>
          <Button
            onClick={() =>
              onSave({
                ...userData,
                name,
                email,
                phone,
                role,
                isVerified,
                isBlock,
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

export default EditUserModal;
