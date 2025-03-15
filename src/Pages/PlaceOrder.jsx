import Title from "@/Components/Title";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { DeliverySchema, ShippingSchema } from "@/Schemas";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
};

const shippingInitialValues = {
  country: "PK", // Use country code for Pakistan
  province: "",
  city: "",
  zip: "",
  address: "",
  phone: "",
};

const PlaceOrder = () => {
  const [step, setStep] = useState(1);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [deliveryInfo, setDeliveryInfo] = useState({});
  const [shippingInfo, setShippingInfo] = useState({});

  // Load countries and provinces when component mounts
  useEffect(() => {
    const pakistan = Country.getCountryByCode("PK");
    setCountries([
      {
        value: pakistan.isoCode,
        label: pakistan.name,
      },
    ]);

    const pakistanProvinces = State.getStatesOfCountry("PK");
    setProvinces(
      pakistanProvinces.map((province) => ({
        value: province.isoCode,
        label: province.name,
      }))
    );

    setCities([]);
  }, []);

  // Shipping Form Configuration
  const shippingFormik = useFormik({
    initialValues: shippingInitialValues,
    validationSchema: ShippingSchema,
    onSubmit: (values) => {
      setShippingInfo(values);
      console.log(shippingFormik.errors);
      console.log("Shipping Information:", values);
      alert("Order placed successfully!"); // Add this for testing
    },
  });

  // Load cities when province changes
  useEffect(() => {
    setCities([]);

    if (shippingFormik.values.province) {
      const provinceCities = City.getCitiesOfState(
        "PK",
        shippingFormik.values.province
      );
      setCities(
        provinceCities.map((city) => ({
          value: city.name,
          label: city.name,
        }))
      );
    }
  }, [shippingFormik.values.province]);

  // Delivery Form Configuration
  const deliveryFormik = useFormik({
    initialValues,
    validationSchema: DeliverySchema,
    onSubmit: (values) => {
      setDeliveryInfo(values);
      console.log("Delivery Information:", values);
      setStep(2); // Move to Step 2
    },
  });

  // Log combined data whenever deliveryInfo or shippingInfo changes
  useEffect(() => {
    console.log("Combined Delivery and Shipping Info:", {
      ...deliveryInfo,
      ...shippingInfo,
    });
  }, [deliveryInfo, shippingInfo]);

  return (
    <div className="pt-20 max-w-7xl mx-auto px-4">
      <div className="w-full h-[2px] bg-gray-300 mt-2 mb-8"></div>

      {/* Two Sections: Left and Right */}
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Left Section */}
        <div className="w-full sm:w-1/2 p-6">
          {/* Step 1: Contact Form */}
          <div
            className={`mb-8 ${
              step === 2 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <div className="text-2xl sm:text-3xl my-3 pt-10">
              <div className="flex items-center gap-3 justify-center">
                <div className="text-2xl bg-black rounded-full text-white w-8 h-8 flex items-center justify-center mb-7">
                  1
                </div>
                <Title text1={"CONTACT"} text2={"INFORMATION"} />
              </div>
            </div>
            <form onSubmit={deliveryFormik.handleSubmit}>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="First Name"
                  {...deliveryFormik.getFieldProps("firstname")}
                  className="border p-2 w-full mt-2 rounded-sm"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  {...deliveryFormik.getFieldProps("lastname")}
                  className="border p-2 w-full mt-2 rounded-sm"
                />
              </div>
              {deliveryFormik.errors.firstname &&
                deliveryFormik.touched.firstname && (
                  <p className="text-red-500 text-sm">
                    {deliveryFormik.errors.firstname}
                  </p>
                )}
              {deliveryFormik.errors.lastname &&
                deliveryFormik.touched.lastname && (
                  <p className="text-red-500 text-sm">
                    {deliveryFormik.errors.lastname}
                  </p>
                )}
              <input
                type="email"
                placeholder="Your Email"
                {...deliveryFormik.getFieldProps("email")}
                className="border p-2 w-full mt-2 rounded-sm"
              />
              {deliveryFormik.errors.email && deliveryFormik.touched.email && (
                <p className="text-red-500 text-sm">
                  {deliveryFormik.errors.email}
                </p>
              )}
              <button
                type="submit"
                disabled={!deliveryFormik.isValid || !deliveryFormik.dirty}
                className="bg-black text-white py-2 w-full mt-4 rounded-lg"
              >
                Proceed to Shipping
              </button>
            </form>
          </div>

          {/* Step 2: Shipping Information Form */}
          <div
            className={`${step === 1 ? "opacity-50 pointer-events-none" : ""}`}
          >
            <div className="text-2xl sm:text-3xl my-3 pt-10">
              <div className="flex items-center gap-3 justify-center">
                <div className="text-2xl bg-black rounded-full text-white w-8 h-8 flex items-center justify-center mb-7">
                  2
                </div>
                <Title text1={"SHIPPING"} text2={"INFORMATION"} />
              </div>
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-gray-700 mb-4 underline"
            >
              Edit Delivery Info
            </button>
            <form onSubmit={shippingFormik.handleSubmit}>
              <div className="flex gap-3">
                {/* Country Dropdown */}
                <Select
                  options={countries}
                  value={countries.find(
                    (country) => country.value === shippingFormik.values.country
                  )}
                  onChange={(selected) =>
                    shippingFormik.setFieldValue("country", selected.value)
                  }
                  placeholder="Select Country"
                  className="w-full rounded-sm"
                  isDisabled={true}
                />
                {shippingFormik.errors.country &&
                  shippingFormik.touched.country && (
                    <p className="text-red-500 text-sm">
                      {shippingFormik.errors.country}
                    </p>
                  )}

                {/* Province Dropdown */}
                <Select
                  options={provinces}
                  value={provinces.find(
                    (p) => p.value === shippingFormik.values.province
                  )}
                  onChange={(selected) =>
                    shippingFormik.setFieldValue("province", selected.value)
                  }
                  placeholder="Select Province"
                  className="w-full rounded-sm"
                />
                {shippingFormik.errors.province &&
                  shippingFormik.touched.province && (
                    <p className="text-red-500 text-sm">
                      {shippingFormik.errors.province}
                    </p>
                  )}
              </div>
              <div className="flex gap-3 mt-2">
                {/* City Dropdown */}
                <Select
                  options={cities}
                  value={cities.find(
                    (c) => c.value === shippingFormik.values.city
                  )}
                  onChange={(selected) =>
                    shippingFormik.setFieldValue("city", selected.value)
                  }
                  placeholder="Select City"
                  isDisabled={!shippingFormik.values.province}
                  className="w-full rounded-sm"
                />
                {shippingFormik.errors.city && shippingFormik.touched.city && (
                  <p className="text-red-500 text-sm">
                    {shippingFormik.errors.city}
                  </p>
                )}

                {/* Postal Code Input */}
                <input
                  type="text"
                  placeholder="Postal Code"
                  {...shippingFormik.getFieldProps("zip")}
                  className="border p-2 w-full rounded-sm"
                />
                {shippingFormik.errors.zip && shippingFormik.touched.zip && (
                  <p className="text-red-500 text-sm">
                    {shippingFormik.errors.zip}
                  </p>
                )}
              </div>

              {/* Address Input */}
              <input
                type="text"
                placeholder="Full Address"
                {...shippingFormik.getFieldProps("address")}
                className="border p-2 w-full mt-2 rounded-sm"
              />
              {shippingFormik.errors.address &&
                shippingFormik.touched.address && (
                  <p className="text-red-500 text-sm">
                    {shippingFormik.errors.address}
                  </p>
                )}

              {/* Phone Input 
              <PhoneInput
                international
                defaultCountry="PK"
                value={shippingFormik.values.phone}
                onChange={(value) => {
                  shippingFormik.setFieldValue("phone", value);
                  shippingFormik.setFieldTouched("phone", true, false);
                }}
                className="border p-2 w-full mt-2 rounded-sm"
              />
              {shippingFormik.errors.phone && shippingFormik.touched.phone && (
                <p className="text-red-500 text-sm">
                  {shippingFormik.errors.phone}
                </p>
              )}*/}

              {/* Submit Button */}
              <button
                type="submit"
            //    disabled={!shippingFormik.isValid || !shippingFormik.dirty}
                className="bg-black text-white py-2 w-full mt-4 rounded-sm"
                onClick={()=>alert("Order placed successfully!")}
              >
                Place Order
              </button>
            </form>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full sm:w-1/2 bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <p>This is the right section content. You can add anything here.</p>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;