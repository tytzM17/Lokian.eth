import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function GenericModal({ show, handleClose, title, content }) {
  return (
    <>
      <Modal className='generic-modal' show={show} onHide={() => handleClose(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleClose(true)}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={() => handleClose(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GenericModal