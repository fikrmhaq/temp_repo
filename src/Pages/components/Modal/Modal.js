import React from 'react'
import { Collapse, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const Dialog = ({ open, children }) => {

    return(
        <Modal {... { isOpen: open }}>
            <ModalBody>
                {children}
            </ModalBody>
        </Modal>
    )

}

export {
    Dialog
}