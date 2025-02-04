const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50" 
          onClick={onClose}
        />
        
        {/* Modal Content */}
        <div className="relative bg-white dark:bg-slate-100 rounded-lg p-6 shadow-xl min-w-[300px] max-w-md w-full m-4">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
          
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;