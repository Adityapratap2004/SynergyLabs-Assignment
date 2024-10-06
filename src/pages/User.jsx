import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const User = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const getUserDetails = async () => {
        setLoading(true);
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const user = await res.json();
            setUser(user);
            
        } catch (error) {
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        
        getUserDetails();
    }, []);

    if (loading) {
       return <div className='flex items-center h-[90vh] justify-center w-full'>
            <div className='shadow-all-sides max-w-3xl sm:w-full rounded-md'>
                <div className='p-5'>
                    <Skeleton height={40} width="60%" />
                    <Skeleton count={1} height={20} width="40%" />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 px-5 pb-5 gap-x-12 gap-y-8'>
                    <div>
                        <h2 className='text-lg'>Contact Information</h2>
                        <div className='ml-5'>
                            <Skeleton height={20} count={3} />
                        </div>
                    </div>
                    <div>
                        <h2 className='text-lg'>Address</h2>
                        <div className='ml-5'>
                            <Skeleton height={20} count={4} />
                        </div>
                    </div>
                    <div>
                        <h2 className='text-lg'>Company</h2>
                        <div className='ml-5'>
                            <Skeleton height={20} count={3} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    return (
        <>
            {user && (
                <div className='flex items-center h-[90vh] justify-center w-full '>
                    <div className='shadow-all-sides max-w-3xl sm:w-full  rounded-md '>
                        <div className='p-5 '>
                            <h2 className='text-3xl font-semibold'>{user.name}'s Details</h2>
                            <p className='text-gray-500' >#username {user.username}</p>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 px-5 pb-5 gap-x-12 gap-y-8'>
                            <div>
                                <h2 className='text-lg'>Contact Information</h2>
                                <div className='ml-5'>
                                    <p>Email: {user.email}</p>
                                    <p>Phone:{user.phone}</p>
                                    <p>WebSite: <a className=' text-blue-500 underline ' href={`https://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a></p>
                                </div>
                            </div>
                            <div>
                                <h2 className='text-lg'>Address</h2>
                                <div className='ml-5'>
                                    <p>Suite:{user.address.suite}</p>
                                    <p>Street: {user.address.street}</p>
                                    <p>City:{user.address.city}</p>
                                    <p>ZipCode: {user.address.zipcode}</p>
                                </div>

                            </div>
                            <div>
                                <h2 className='text-lg'>Company</h2>
                                <div className='ml-5'>
                                    <p>Name:{user.company.name}</p>
                                    <p>Catch Phrase: {user.company.catchPhrase}</p>
                                    <p>Bs:{user.company.bs}</p>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default User;
