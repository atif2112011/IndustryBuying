import React, { useState } from 'react';

export default function ChangePasswordModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({oldpassword:"",newpassword:"",confirmpassword:""});
   const [errors, setErrors] = useState({});

        


        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
        };

 
         const validate = () => {
        const errs = {};

        if (!formData.oldpassword) {
        errs.oldpassword = 'Old Password cannot be empty';
        }
        if (!formData.newpassword) {
        errs.newpassword = 'New Password cannot be empty';
        }
        if (!formData.confirmpassword) {
        errs.confirmpassword = 'Confirm Password cannot be empty';
        }

        if (formData.newpassword !== formData.confirmpassword) {
        errs.confirmpassword = 'Passwords do not match';
        }

        if(formData.newpassword.length<6){
          errs.newpassword = 'Password must be at least 6 characters long';
        }

        

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  if (!isOpen) return null;



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-8/10 md:w-1/3  p-8 shadow-lg">
        <h3 className="font-semibold mb-4">Change Password</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className='flex flex-col gap-2'>
            <label className="block text-sm font-medium">Old Password</label>
            <input
              type="password"
              name="oldpassword"
              value={formData.oldpassword || ''}
              onChange={handleChange}
              className={`w-full border  px-3 py-2 rounded text-sm ${errors.oldpassword ? 'border-red-500' : 'border-gray-300'}`}
              placeholder='Enter current password'
              required
            ></input>
            {errors.oldpassword && <p className="!text-xs !text-red-500 mt-1">{errors.oldpassword}</p>}
          </div>

          <div className='flex flex-col gap-2'>
            <label className="block text-sm font-medium">New Password</label>
            <input
              type="password"
              name="newpassword"
              value={formData.newpassword || ''}
              onChange={handleChange}
              className={`w-full border  px-3 py-2 rounded text-sm ${errors.newpassword ? 'border-red-500' : 'border-gray-300'}`}
              placeholder='Enter new password'
              required
            ></input>
            {errors.newpassword && <p className="!text-xs !text-red-500 mt-1">{errors.newpassword}</p>}
          </div>

          <div className='flex flex-col gap-2'>
            <label className="block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmpassword"
              value={formData.confirmpassword || ''}
              onChange={handleChange}
              className={`w-full border  px-3 py-2 rounded text-sm ${errors.confirmpassword ? 'border-red-500' : 'border-gray-300'}`}
              placeholder='Enter Phone Number'
              required
            ></input>
            {errors.confirmpassword && <p className="!text-xs !text-red-500 mt-1">{errors.confirmpassword}</p>}
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
