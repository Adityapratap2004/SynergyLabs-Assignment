import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../store/slice/userSlice';
import toast from 'react-hot-toast';

const EditUser = ({ id }) => {


    const { isEditing } = useSelector(state => state.user);
    const [user, setUser] = useState({ name: "", email: "", phone: "", username: "", suite: "", street: "", cname: "",zipcode:"", catchphrase: "", bs: "", website: "" });
    const handleUserChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (user.name.trim().length < 3) newErrors.name = 'Name must be at least 3 characters long.';
        if (user.username.trim().length < 3) newErrors.username = 'User name must be at least 3 characters long.';
        if (!user.email.trim().match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) newErrors.email = 'Please enter a valid email.';
        if (!user.phone.trim().match(/^[0-9]{10}$/)) newErrors.phone = 'Please enter a valid 10-digit phone number.';
        if (!user.street.trim()) newErrors.street = 'Street is required.';
        if (!user.city.trim()) newErrors.city = 'City is required.';
        if (user.cname && user.cname.trim().length < 3) newErrors.cname = 'Company name must be at least 3 characters long.';
        if (user.website && !user.website.trim().match(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/.*)?$/)) newErrors.website = 'Please enter a valid URL.';

        return newErrors;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        }
        else {
            setErrors({});
            const x=user;
            x.id=id;
            dispatch(editUser(x));
        }

    }
    
    const getUserDetails = async () => {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await res.json();
            setUser(prevUser => ({
                ...prevUser,
                name: data.name,
                email: data.email,
                website:data.website,
                phone: data.phone,
                suite:data.address.suite,
                username: data.username,
                street: data.address.street,
                city: data.address.city,
                zipcode: data.address.zipcode,
                cname: data.company.name,
                catchphrase: data.company.catchPhrase,
                bs: data.company.bs,
                
            }));
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getUserDetails();

    }, []);

    return (
        <div>
            <h1 className='text-center text-3xl font-semibold'>Edit User Information </h1>
            <form className='w-[80vw]' onSubmit={handleSubmit}>
                <h2 className='text-xl'>Contact Information</h2>
                <div className=' grid grid-cols-1 sm:grid-cols-2 my-5 gap-x-6 gap-y-4 '>
                    <div className='flex flex-col'>
                        <label>Name</label>
                        <input required placeholder='Name' value={user.name} name="name" type="text" onChange={handleUserChange} className='text-gray-500 h-10 px-2 my-2 w-full bg-gray-100 outline-none border-none rounded-sm focus:text-black' />
                        {errors.name && <span className='text-red-500'>{errors.name}</span>}
                    </div>

                    <div className='flex flex-col'>
                        <label>User Name</label>
                        <input required placeholder='User Name' value={user.username} name="username" type="text" onChange={handleUserChange} className='text-gray-500 h-10 px-2 my-2 w-full bg-gray-100 outline-none border-none rounded-sm focus:text-black' />
                        {errors.username && <span className='text-red-500'>{errors.username}</span>}
                    </div>
                    <div className='flex flex-col'>
                        <label>Email</label>
                        <input required placeholder='Email' value={user.email} name="email" type="email" onChange={handleUserChange} className='text-gray-500 h-10 px-2 w-full bg-gray-100 my-2 outline-none border-none rounded-sm focus:text-black' />
                        {errors.email && <span className='text-red-500'>{errors.email}</span>}
                    </div>
                    <div className='flex flex-col'>
                        <label>Phone</label>
                        <input required placeholder='Phone' value={user.phone} name="phone" type="number" onChange={handleUserChange} className='text-gray-500 h-10 px-2 w-full bg-gray-100 my-2 outline-none border-none rounded-sm focus:text-black' />
                        {errors.phone && <span className='text-red-500'>{errors.phone}</span>}
                    </div>
                    <div className='flex flex-col'>
                        <label>Website</label>
                        <input placeholder='Website' value={user.website} name="website" type="text" onChange={handleUserChange} className='text-gray-500 h-10 px-2 w-full bg-gray-100 my-2 outline-none border-none rounded-sm focus:text-black' />
                        {errors.website && <span className='text-red-500'>{errors.website}</span>}
                    </div>
                </div>


                <h2 className='text-xl'>Address</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 my-5 gap-x-6 gap-y-4  '>
                    <div className='flex flex-col'>
                        <label>Suite</label>
                        <input placeholder='Suite' value={user.suite} name="suite" type="text" onChange={handleUserChange} className='text-gray-500 h-10 px-2 my-2 w-full bg-gray-100 outline-none border-none rounded-sm focus:text-black' />
                    </div>

                    <div className='flex flex-col'>
                        <label>Street</label>
                        <input required placeholder='Street' value={user.street} name="street" type="text" onChange={handleUserChange} className='text-gray-500 h-10 px-2 my-2 w-full bg-gray-100 outline-none border-none rounded-sm focus:text-black' />
                        {errors.street && <span className='text-red-500'>{errors.street}</span>}
                    </div>
                    <div className='flex flex-col'>
                        <label>City</label>
                        <input required placeholder='City' value={user.city} name="city" type="text" onChange={handleUserChange} className='text-gray-500 h-10 px-2 w-full bg-gray-100 my-2 outline-none border-none rounded-sm focus:text-black' />
                        {errors.city && <span className='text-red-500'>{errors.city}</span>}
                    </div>
                    <div className='flex flex-col'>
                        <label>ZipCode</label>
                        <input placeholder='ZipCode' value={user.zipcode} name="zipcode" type="text" onChange={handleUserChange} className='text-gray-500 h-10 px-2 w-full bg-gray-100 my-2 outline-none border-none rounded-sm focus:text-black' />
                    </div>
                </div>


                <h2 className='text-xl'>Company </h2>
                <div className=' grid grid-cols-1  my-5 gap-y-4 '>
                    <div className='flex flex-col'>
                        <label>Name</label>
                        <input placeholder='Comapny Name' value={user.cname} name="cname" type="text" onChange={handleUserChange} className='text-gray-500 h-10 px-2 my-2 w-full bg-gray-100 outline-none border-none rounded-sm focus:text-black' />
                        {errors.cname && <span className='text-red-500'>{errors.cname}</span>}
                    </div>

                    <div className='flex flex-col'>
                        <label>Catch Phrase</label>
                        <input placeholder='Catch Phrase' value={user.catchphrase} name="catchphrase" type="text" onChange={handleUserChange} className='text-gray-500 h-10 px-2 my-2 w-full bg-gray-100 outline-none border-none rounded-sm focus:text-black' />

                    </div>
                    <div className='flex flex-col'>
                        <label>Bs</label>
                        <input placeholder='bs' value={user.bs} name="bs" type="text" onChange={handleUserChange} className='text-gray-500 h-10 px-2 w-full bg-gray-100 my-2 outline-none border-none rounded-sm focus:text-black' />
                    </div>

                </div>
                <div className='flex'>
                    <button type="submit" disabled={isEditing} className='bg-black w-full py-3 px-8 hover:bg-[#454545] text-lg font-semibold rounded-md text-white'>Edit User</button>
                </div>
            </form>
        </div>
    )
}

export default EditUser
