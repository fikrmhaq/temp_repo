import React from 'react'
import { PopoverBody, UncontrolledPopover } from 'reactstrap'

function ActionPopover(props) {
    return (
        <UncontrolledPopover target={props.target} trigger="focus" placement={props.placement} className={`popover-global ${props.className}`}>
            <PopoverBody className='p-0 px-2 py-1'>
                <div className='d-flex flex-column'>
                    <button className="btn" onClick={props.delete}><i class="fas fa-trash-alt"></i> Hapus</button>
                    <hr className='m-0' />
                    <button className="btn" onClick={props.edit}><i class="fas fa-pen"></i> Edit</button>
                </div>
            </PopoverBody>
        </UncontrolledPopover>
    )
}

export default ActionPopover
