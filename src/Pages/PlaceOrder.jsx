import Title from '@/Components/Title'
import React from 'react'
import {useFormik} from 'formik';
import { OrderSchema } from '@/Schemas';





const initialValues={

  firstname:'',
  lastname:'',
  email:'',
}



const PlaceOrder = () => {

const {values,errors,handleBlur,handleChange,handleSubmit}=useFormik({
initialValues:initialValues,
validationSchema:OrderSchema,
onSubmit:(values)=>{

  console.log(values);
  
}



})




  return (
    <div className='pt-20 max-w-7xl mx-auto px-4' >
     
     <div className="w-full h-[2px] bg-gray-300 mt-2 mb-8"></div>

{/* Two Sections: Left and Right */}
<div className="flex flex-col sm:flex-row gap-8"> {/* Flex container */}
  {/* Left Section */}
  {/* Title Section Below */}

  <div className="w-full sm:w-1/2 p-6">
  <div className="text-xl sm:text-2xl my-3 pt-10"><Title text1={"DELIVERY"} text2={"INFORMATION"} /></div>
    <form onSubmit={handleSubmit}> 
<div className='flex gap-3'>
<input type="text" 
placeholder='First Name' 
name='firstname'
value={values.firstname}

onChange={handleChange}
className='border border-gray-300 rounded py-1.5 px-1.5 w-full' />


<input type="text" 
 placeholder='Last Name'
 name='lastname'
 value={values.lastname}

onChange={handleChange}
 className='border border-gray-300 rounded py-1.5 px-1.5 w-full' />
</div>
{<p className='text-sm text-red-500 '>{errors.firstname}</p>}

<input type="email"
 placeholder='Your Email' 
 name='email'
 value={values.email}

onChange={handleChange}
 className='border border-gray-300 rounded py-1.5 px-1.5 w-full mt-2' />
{<p className='text-sm text-red-500 '>{errors.email}</p>}

<button type="submit" className='bg-black py-3 px-3 text-white'>submit form</button>

</form>
  </div>

  {/* Right Section */}
  <div className="w-full sm:w-1/2 bg-gray-100 p-6 rounded-lg">
    <h2 className="text-xl font-bold mb-4">Right Section</h2>
    <p>This is the right section content. You can add anything here.</p>
  </div>
</div>



    </div>
  )
}

export default PlaceOrder
