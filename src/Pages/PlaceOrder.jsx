import Title from "@/Components/Title";
import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import { DeliverySchema, ShippingSchema } from "@/Schemas";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Shopcontext } from "@/Context/Shopcontext";

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
  const { cart, products } = useContext(Shopcontext);

  // Convert cart object to an array of items
  const cartItemsArray = Object.entries(cart || {}).flatMap(([itemId, sizes]) =>
    Object.entries(sizes).map(([size, quantity]) => {
      // Find the product in the products array
      const product = products.find(p => p._id === itemId);
      
      return {
        id: itemId,
        size,
        quantity,
        price: product?.price || 0,
        product: product || null // Store the entire product for easy access
      };
    })
  );
  useEffect(() => {
    console.log("Cart Data:", cart);
    console.log("Products Data:", products);
    console.log("Cart Items Array:", cartItemsArray);
  }, [cart, products, cartItemsArray]);


  // Calculate total price using reduce()
  const totalAmount = cartItemsArray.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

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
      console.log("Shipping Information:", values);
      alert("Order placed successfully!");
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
            className={`mb-8 ${step === 2 ? "opacity-50 pointer-events-none" : ""
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
            className={step === 1 ? "opacity-50 pointer-events-none" : ""}
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

              {/* Phone Input */}
              <div className="mt-2">
                <label htmlFor="phone" className="text-sm text-gray-600">
                  Phone Number
                </label>
                <PhoneInput
                  international
                  defaultCountry="PK"
                  countries={["PK"]}
                  value={shippingFormik.values.phone}
                  onChange={(value) => {
                    shippingFormik.setFieldValue("phone", value);
                    shippingFormik.setFieldTouched("phone", true, false);
                  }}
                  className="border p-2 w-full mt-1 rounded-sm"
                  id="phone"
                />
                {shippingFormik.errors.phone && shippingFormik.touched.phone && (
                  <p className="text-red-500 text-sm">
                    {shippingFormik.errors.phone}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!shippingFormik.isValid || !shippingFormik.dirty}
                className="bg-black text-white py-2 w-full mt-4 rounded-sm"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>

        {/* Right Section (Order Summary) */}
        <div className="w-full sm:w-1/2 bg-white p-6 rounded-lg shadow-md border max-h-fit overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-lg font-semibold">Order Summary ({cartItemsArray.length})</h2>
            <p className="text-lg font-bold">Rs.{totalAmount.toFixed(2)}</p>
          </div>

          {/* Cart Items */}
          {cartItemsArray.length > 0 ? (
            cartItemsArray.map((item, index) => {
              // Create a products lookup map outside of map to avoid redundant computation
              const productsMap = Object.fromEntries(products.map(p => [p._id, p]));
              const product = productsMap[item.id] || {};

              console.log("Product name for item ID", item.id, ":", product.name);

              return (
                <div key={index} className="mb-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={product.image[0] || "/placeholder.jpg"} // Avoid broken image
                      alt={product.name || "Unknown Product"}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <p className="text-md font-semibold">{product.name || "Unknown Product"}</p>
                      <p className="text-gray-600">Rs.{product.price}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-600">Your cart is empty.</p>
          )}


          {/* Order Summary Breakdown */}
          <div className="mt-6 border-t pt-4">
            <h3 className="text-md font-bold">ORDER SUMMARY</h3>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>Subtotal (Inclusive of Tax)</span>
              <span>Rs.{totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>Shipping</span>
              <span>Rs.0.00</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>FBR POS</span>
              <span>Rs.1.00</span>
            </div>
            <div className="flex justify-between text-lg font-bold mt-4">
              <span>Total (PKR)</span>
              <span>Rs.{(totalAmount + 1).toFixed(2)}</span>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-6 text-xs text-gray-600 border-t pt-4">
            You may receive multiple packages for one order. Discounted items are
            non-exchangeable & non-returnable. Nationwide orders will be delivered
            within 5-7 business days.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;