import React, { useEffect, useState } from 'react';

export default function EditAddressModal({ isOpen, onClose, initialData, onSave }) {
    if (!isOpen) return null;
  const [form, setForm] = useState({
    _id:'',
    name: '',
    email: '',
    phone: '',
    alternatePhone: '',
    gstin: '',
    flat: '',
    area: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
    type: 'home',
    isPrimary: false,
    isShipping: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm({
    _id:'',
    name: '',
    email: '',
    phone: '',
    alternatePhone: '',
    gstin: '',
    flat: '',
    area: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
    type: 'home',
    isPrimary: false,
    isShipping: false,
  })
    if (initialData) {
        console.log('recieved data',initialData)
      setForm(prev => ({
        ...prev,
        _id:initialData._id,
        name: initialData.name,
        email: initialData.email, // Sample
        phone: initialData.phone,
        alternatePhone: initialData.alternatePhone,
        gstin: initialData.gstin,
        flat: initialData.flat,
        area: initialData.area,
        landmark: initialData.landmark,
        pincode: initialData.pincode,
        city: initialData.city,
        state: initialData.state,
        type: initialData.type,
        isPrimary: initialData.isPrimary,
        isShipping: initialData.isShipping,
      }));
    }
  }, [initialData]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    
    if (!form.name|| form.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters long';
    if (!form.phone ) newErrors.phone = 'Mobile is required';
    if (form.phone && !/^[6-9]\d{9}$/.test(form.phone)) {
        newErrors.phone = 'Phone number must be a 10-digit Indian phone number';
        }

    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Please enter a valid email';
    if (!form.flat) newErrors.flat = 'Address is required';
    if (!form.pincode) newErrors.pincode = 'Pincode is required';
    if (!form.city) newErrors.city = 'City is required';
    if (!form.state) newErrors.state = 'State is required';
    
    setErrors(newErrors);
    console.log(newErrors   )
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log('Form Submitted', form);
      onSave(form);
      onClose();
    }
  };
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="p-4 md:px-7 w-9/10 h-8/10 md:max-h-8/10 md:w-1/2 overflow-y-auto bg-white rounded shadow">
      <p className='!text-md md:!text-lg !font-semibold !text-blue-950 my-3'>Edit Address</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 flex items-center gap-2">
             
        <div className='flex flex-col gap-1'>
            <label className='!text-xs md:!text-sm text-gray-800 !font-medium'>Add GSTIN and click verify to claim input tax credit.</label>
            <div className='flex flex-row gap-4'>
          <input
            type="text"
            name="gstin"
            
            value={form.gstin}
            onChange={handleChange}
            className="flex-1 border border-gray-500 outline-none px-3 py-2 rounded !text-xs md:text-sm"
          />
          <button className="bg-green-100 text-green-800 px-4 py-2 rounded !text-[10px] md:text-sm font-semibold">
            Verify
          </button>
            </div>
        </div>
          
        </div>

        <div>
             <label className='!text-xs md:!text-sm text-gray-800 !font-medium'>Name</label>
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-500 outline-none px-3 py-2 rounded !text-xs md:text-sm"
          />
          {errors.name && <p className="!text-red-500 !text-[10px] md:!text-xs">{errors.name}</p>}
        </div>

        <div>
             <label className='!text-xs md:!text-sm text-gray-800 !font-medium'>Email</label>
          <input
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-500 outline-none px-3 py-2 rounded !text-xs md:text-sm"
          />
          {errors.email && <p className="!text-red-500 !text-[10px] md:!text-xs">{errors.email}</p>}
        </div>

        <div>
            <label className='!text-xs md:!text-sm text-gray-800 !font-medium'>Alternate Number</label>
          <input
            name="alternatePhone"
            
            value={form.alternatePhone}
            onChange={handleChange}
            className="w-full border border-gray-500 outline-none px-3 py-2 rounded !text-xs md:text-sm"
          />
        </div>

        <div>
            <label className='!text-xs md:!text-sm text-gray-800 !font-medium'>Mobile</label>
          <div className='flex flex-row gap-2 flex-wrap'>
          <input
          type="tel"
            name="phone"
            required
            value={form.phone}
            onChange={handleChange}
            className="flex-1 border border-gray-500 outline-none px-3 py-2 rounded !text-xs md:text-sm"
          />
          <button className="bg-gray-200 px-4 py-2 rounded !text-[10px] md:text-sm">Send OTP</button>
        </div>
        {errors.phone && <p className="!text-red-500 !text-[10px] md:!text-xs col-span-2">{errors.phone}</p>}
        </div>

        <div>
            <label className='!text-xs md:!text-sm text-gray-800 !font-medium'>Flat, House no., Building, Company, Apartment</label>
            
          <input
            name="flat"
            required
            value={form.flat}
            onChange={handleChange}
            className="w-full border border-gray-500 outline-none px-3 py-2 rounded !text-xs md:text-sm"
          />
          {errors.flat && <p className="!text-red-500 !text-[10px] md:!text-xs">{errors.flat}</p>}
        </div>

        <div>
            <label className='!text-xs md:!text-sm text-gray-800 !font-medium'>Area, Street, Sector, Village</label>
          <input
            name="area"
            required
            value={form.area}
            onChange={handleChange}
            className="w-full border border-gray-500 outline-none px-3 py-2 rounded !text-xs md:text-sm"
          />
        </div>

        <div>
            <label className='!text-xs md:!text-sm text-gray-800 !font-medium'>Landmark</label>
          <input
            name="landmark"
            
            value={form.landmark}
            onChange={handleChange}
            className="w-full border border-gray-500 outline-none px-3 py-2 rounded !text-xs md:text-sm"
          />
          <p className="!text-xs !text-gray-400">Landmark will ensure faster delivery</p>
        </div>

        <div>
            <label className='!text-xs md:!text-sm text-gray-800 !font-medium'>Pincode</label>
          <input
            name="pincode"
            required
            value={form.pincode}
            onChange={handleChange}
            className="w-full border border-gray-500 outline-none px-3 py-2 rounded !text-xs md:text-sm"
          />
          {errors.pincode && <p className="!text-red-500 !text-[10px] md:!text-xs">{errors.pincode}</p>}
        </div>

        <div>
            <label className='!text-xs md:!text-sm text-gray-800 !font-medium'>City</label>
          <input
            name="city"
            required
            value={form.city}
            onChange={handleChange}
            className="w-full border border-gray-500 outline-none px-3 py-2 rounded !text-xs md:text-sm"
          />
          {errors.city && <p className="!text-red-500 !text-[10px] md:!text-xs">{errors.city}</p>}
        </div>

        <div>
            <label className='!text-xs md:!text-sm text-gray-800 !font-medium'>State</label>
          <input
            name="state"
            required
            value={form.state}
            onChange={handleChange}
            className="w-full border border-gray-500 outline-none px-3 py-2 rounded !text-xs md:text-sm"
          />
          {errors.state && <p className="!text-red-500 !text-[10px] md:!text-xs">{errors.state}</p>}
        </div>
      </div>

      {/* Checkboxes & Address Type */}
      <div className="flex items-center gap-6 mt-4">
        <label className="flex items-center gap-2 !text-xs md:text-sm">
          <input type="checkbox" name="isPrimary" className='h-4 w-4' checked={form.isPrimary} onChange={handleChange} disabled/>
          <span className="!text-xs md:!text-sm font-semibold">Make as Primary Address</span>
        </label>
        <label className="flex items-center gap-2 !text-xs md:text-sm">
          <input type="checkbox" name="isShipping" className='h-4 w-4' checked={form.isShipping} onChange={handleChange} />
          <span className="!text-xs md:!text-sm font-semibold">Make this Shipping address</span>
        </label>
      </div>

      {/* Address Type Buttons */}
      <div className="flex gap-4 mt-4">
        {['Home', 'Office', 'Other'].map(type => (
          <button
            key={type}
            type="button"
            className={`border border-gray-400 px-4 py-1 rounded !text-xs md:text-sm ${
              form.type.toLowerCase() === type.toLowerCase() ? 'bg-orange-500 text-white' : 'bg-white text-black'
            }`}
            onClick={() => setForm(prev => ({ ...prev, type: type.toLowerCase() }))}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="flex justify-end gap-3 mt-8 md:mt-4">
        <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 !text-xs border border-gray-300 bg-gray-100 shadow-md rounded hover:bg-gray-100"
            >
              Cancel
            </button>
        <button
    
          onClick={handleSubmit}
          className="bg-blue-600 !text-xs text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save Address
        </button>
      </div>
      
      
    </div>
    
    </div>
  );
}
