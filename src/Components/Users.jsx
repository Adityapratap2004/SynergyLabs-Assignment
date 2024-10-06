import { Edit, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteUser } from '../store/slice/userSlice'
import Modal from './Modal'
import EditUser from './EditUser'


const Users = ({ user, index }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const removeUser = async (e, id) => {
    e.stopPropagation();
    dispatch(deleteUser(id));
  }

  const handleNavigate = () => {
    navigate(`/user/${user.id}`);
  };


  const openModal = () => { setIsModalOpen(true); }
  const closeModal = () => setIsModalOpen(false);

  const handleEdit = (e) => {
    e.stopPropagation();
    openModal();
  }


  return (
    <>
      <div onClick={handleNavigate} className=' cursor-pointer'>
        <div className={`hidden sm:grid grid-cols-5   w-full p-4 pt-4 mb-4 shadow-all-sides rounded-md ${index % 2 === 0 ? 'bg-gray-100' : ''} hover:scale-[103%] `}>
          <p>{user.name}</p>
          <p>{user.username}</p>
          <p>{user.phone}</p>
          <p className='text-center'>{user.website}</p>
          <div className='flex justify-end gap-3'>
            <Edit className='hover:text-green-500' onClick={handleEdit} />
            <Trash2 className='hover:text-red-500' onClick={(e) => removeUser(e, user.id)} />
          </div>
        </div>
        <div className={` sm:hidden p-4 pt-4 mb-4 shadow-all-sides rounded-md ${index % 2 === 0 ? 'bg-gray-100' : ''} hover:scale-[103%] `}>
          <p>Name: {user.name}</p>
          <p>UserName: {user.username}</p>
          <p>Phone: {user.phone}</p>
          <p >Website: {user.website}</p>
          <div className='flex justify-end gap-3'>
            <Edit className='hover:text-green-500' onClick={handleEdit} />
            <Trash2 className='hover:text-red-500' onClick={(e) => removeUser(e, user.id)} />
          </div>

        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <EditUser id={user.id} />
      </Modal>
    </>
  )
}

export default Users
