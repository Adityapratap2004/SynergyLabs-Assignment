import { X } from 'lucide-react';
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, isOpen, onClose }) => {

   const handleOverlayClick=(e)=>{
    if(e.target===e.currentTarget){
        onClose();
        e.stopPropogation();
    }
   }

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={handleOverlayClick}>
      <div className="relative bg-white p-6 rounded shadow-md max-h-[90vh] overflow-y-auto">
        <X onClick={onClose} className='absolute right-4 cursor-pointer' />
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') 
  );
};

export default Modal;
