import React, { memo } from "react"
import { Modal as RModal, ModalBody } from "reactstrap"

export const Modal = ((
    { 
        open, 
        title, 
        toggle = () => console.log("Toggle Modal"), 
        children
    }
 ) => {

    return (
        <RModal toggle={toggle} isOpen={open} centered>
            <ModalBody>
                <div className="d-flex justify-content-between mb-3">
                    <h5 className="modal-title my-auto">{title}</h5>
                    <button className="btn" onClick={toggle}>&times;</button>
                </div>
                {children}
            </ModalBody>
        </RModal>
    )
})

export const Form = memo((
    {
        open = false,
        title = "No Title",
        toggle = () => console.log("Toggle Modal"),
        children,
        onSubmit = () => console.log("on Submit")
    }
) => {

    const submit = () => {
        onSubmit()
    }

    return(
        <Modal 
        {
            ...
            {
                open,
                title,
                toggle
            }
        }
        >

                {children}
                <button className="btn btn-primary col-12 mt-3"
                    onClick={submit}
                >Simpan</button>
        </Modal>
    )
})

export const Dialog = {
    Form
}

 