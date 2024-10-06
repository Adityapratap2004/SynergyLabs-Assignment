import React, { useEffect, useState } from 'react'
import Users from '../Components/Users';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, clearSuccess, fetchUser } from '../store/slice/userSlice';
import Modal from '../Components/Modal';
import CreateUser from '../Components/CreateUser';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Home = () => {

  const { isLoading, users, error, success } = useSelector(state => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const openModal = () => { setIsModalOpen(true); }
  const closeModal = () => setIsModalOpen(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (success) {
      closeModal();
      toast.success(success);
      dispatch(clearSuccess());
    }
  }, [error, success, dispatch]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    isLoading ? <div className='flex flex-col gap-4 p-4'>
      <Skeleton height={40} width="60%" className="mb-4" />
      <Skeleton height={40} width="30%" className="mb-2" />
      <div className='sm:grid grid-cols-5 w-full p-4 pt-4 shadow-all-sides rounded-md mb-4'>
        <Skeleton height={30} count={1} />
        <Skeleton height={30} count={1} />
        <Skeleton height={30} count={1} />
        <Skeleton height={30} count={1} />
        <Skeleton height={30} count={1} />
      </div>

      {[...Array(5)].map((_, index) => (
        < >
          <Skeleton height={30} className="col-span-1" />
          <Skeleton height={30} className="col-span-1" />
          <Skeleton height={30} className="col-span-1" />
          <Skeleton height={30} className="col-span-1" />
          <Skeleton height={30} className="col-span-1" />
        </>
      ))}
    </div> :
      <div className='w-full '>
        <div className='flex flex-col  gap-y-5 justify-between mt-5 mb-10 px-2'>
          <h1 className='text-3xl sm:text-4xl font-semibold'>JSONPlaceholder API</h1>
          <div className='w-full flex flex-col sm:flex-row justify-between gap-5'>
            <input type="text" placeholder='search' value={searchQuery} onChange={(e)=>{setSearchQuery(e.target.value)}} className='p-3 sm:w-[70%] bg-gray-100 text-lg rounded-md outline-none border-none'/>
            <button className='bg-black py-3 px-8 hover:bg-[#454545] text-lg  rounded-md text-white' onClick={openModal}>Add User</button>
          </div>

        </div>

        <div className='sm:grid grid-cols-5 *:text-lg *:font-semibold  w-full p-4 pt-4  shadow-all-sides rounded-md mb-4 hidden '>
          <p>Name</p>
          <p>UserName</p>
          <p>Phone No</p>
          <p className='text-center'>Website</p>
          <p className='text-end'>Actions</p>
        </div>


        {filteredUsers.length > 0 && filteredUsers.map((user, index) => {
          return <Users key={user.id} user={user} index={index} />
        })
        }


        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <CreateUser />
        </Modal>
      </div>
  )
}

export default Home
