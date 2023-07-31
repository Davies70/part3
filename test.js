//modal
export const Modal = ({ children, isOpen, modalRef }) => {
  return isOpen ? <div ref={modalRef}>{createPortal(children, document.getElementById('modal-root'))}</div> : null;
 };

//ConfirmationModalContent

export const ConfimationModalContent = ({ closeModal }) => {
  return (
    <div>
      <div className='overlay'></div>
      <div className='modal'>
      <h4>Transfer Bitcoin</h4>
      <p>Are you sure you want to transfer 1 BTC? You will be left with 0.53 BTC. This action cannot be undone.</p>
      <button id="close" onClick={closeModal}>
        Cancel
      </button>
      <button id="confirm" onClick={closeModal}>
        Confirm
      </button>
      </div>
    </div>
  );
};

//BitCoinTransferConfirmation

export const BitcoinTransferConfirmation = () => {
  const { isOpen, openModal, closeModal, modalRef } = useModal();

  return (
    <>
      <button className={classes.transferBitcoinButton} onClick={openModal}>
        Transfer Bitcoin
      </button>

      <Modal isOpen={isOpen} modalRef={modalRef}>
        <ConfimationModalContent closeModal={closeModal} />
      </Modal>
    </>
  );
};


//useModal
import {useRef, useState, useEffect} from 'react';

export const useModal = () => {
  const modalRef = useRef(null);
  const [isOpen, setOpenModal] = useState(false)

 const handleEscape = (event) => {
    if (event.key === 'Escape') {
      setOpenModal(false);
    }
  }

  /*const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setOpenModal(false);
    }
  }*/

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    /*if (modalRef.current) {
      modalRef.current.addEventListener('click', handleClickOutside);
    }*/
    return () => {
      window.removeEventListener('keydown', handleEscape);
      /*if (modalRef.current) {
      modalRef.current.removeEventListener('click', handleClickOutside);
    }*/
  }});

  return {
    isOpen,
    openModal: () => {setOpenModal(true)},
    closeModal: () => {setOpenModal(false)},
    modalRef,
  };
};


