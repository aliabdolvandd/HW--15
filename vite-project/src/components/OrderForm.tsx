import React, { useState } from "react";

interface OrderFormProps {
  onSubmit: (userInfo: {
    name: string;
    phone: string;
    address: string;
  }) => void;
  onCancel: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, onCancel }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({ name: "", phone: "", address: "" });

  const validateForm = () => {
    const newErrors = { name: "", phone: "", address: "" };
    if (!userInfo.name) newErrors.name = "نام وارد نشده است";
    if (!userInfo.phone.match(/^\d{11}$/))
      newErrors.phone = "شماره تلفن معتبر نیست";
    if (!userInfo.address) newErrors.address = "آدرس وارد نشده است";

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(userInfo);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow w-96">
        <h2 className="text-lg font-bold text-right">اطلاعات سفارش</h2>
        <div className="mt-4">
          <input
            type="text"
            placeholder="نام"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            className="border w-full p-2 rounded mb-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm text-right">{errors.name}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="شماره تلفن"
            value={userInfo.phone}
            onChange={(e) =>
              setUserInfo({ ...userInfo, phone: e.target.value })
            }
            className="border w-full p-2 rounded mb-2"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm text-right">{errors.phone}</p>
          )}
        </div>
        <div>
          <textarea
            placeholder="آدرس"
            value={userInfo.address}
            onChange={(e) =>
              setUserInfo({ ...userInfo, address: e.target.value })
            }
            className="border w-full p-2 rounded mb-2"
          />
          {errors.address && (
            <p className="text-red-500 text-sm text-right">{errors.address}</p>
          )}
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            انصراف
          </button>
          <button
            onClick={handleSubmit}
            className="bg-orange-500 text-white px-4 py-2 rounded"
          >
            ثبت سفارش
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
