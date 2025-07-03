import React, { useState } from 'react';

export default function EditUserModal({ isOpen, onClose, userData, onSave }) {
  const [formData, setFormData] = useState(userData);
   const [errors, setErrors] = useState({});

        // Keep the form in sync with prop changes
        React.useEffect(() => {
            setFormData(userData);
        }, [userData]);


        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
        };

 
         const validate = () => {
        const errs = {};

        if (!formData.name || formData.name.trim().length < 2) {
        errs.name = 'Name must be at least 2 characters long';
        }

        if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
        errs.email = 'Please enter a valid email';
        }

        if (formData.phone && !/^[6-9]\d{9}$/.test(formData.phone)) {
        errs.phone = 'Phone number must be a 10-digit Indian mobile number';
        }

        if (formData.gstin && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstin)) {
        errs.gstin = 'GSTIN format is invalid';
        }

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-8/10 md:w-1/3  p-8 shadow-lg">
        <h3 className="font-semibold mb-4">Edit Personal Information</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className='flex flex-col gap-2'>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              className={`w-full border  px-3 py-2 rounded text-sm ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder='Enter Name'
              required
            ></input>
            {errors.name && <p className="!text-xs !text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div className='flex flex-col gap-2'>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              className={`w-full border  px-3 py-2 rounded text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder='Enter Email'
              required
            ></input>
            {errors.email && <p className="!text-xs !text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div className='flex flex-col gap-2'>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              className={`w-full border  px-3 py-2 rounded text-sm ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              placeholder='Enter Phone Number'
              required
            ></input>
            {errors.phone && <p className="!text-xs !text-red-500 mt-1">{errors.phone}</p>}
          </div>

          <div className='flex flex-col gap-2'>
            <label className="block text-sm font-medium">GSTIN</label>
            <input
              type="text"
              name="gstin"
              value={formData.gstin || ''}
              onChange={handleChange}
              className={`w-full border  px-3 py-2 rounded text-sm ${errors.gstin ? 'border-red-500' : 'border-gray-300'}`}
              placeholder='Enter GSTIN'
              
            ></input>
            {errors.gstin && <p className="!text-xs !text-red-500 mt-1">{errors.gstin}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 !text-xs border border-gray-300 bg-gray-100 shadow-md rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 !text-xs bg-blue-600 text-white rounded shadow-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
