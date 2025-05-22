import React from 'react'

const Modal = ({isOpen, onClose, title, children}) => {
  return <div>
    <div className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/50 bg-opacity-50'>
        {/* {Modal Content} */}
        <div className=''>
            {/* {Modal Header} */}
            <div className=''>
                <h3 className=''>
                    {title}
                </h3>
                <button 
                    type='button'
                    className=''
                    onClick={onClose}

                >
                X
                </button>
            </div>
            {/* {Modal Body} */}
            <div className=''>
                {children}
            </div>
        </div>
    </div>
  </div>
}

export default Modal
