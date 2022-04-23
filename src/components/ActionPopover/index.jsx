import { Button, Popover, Typography } from '@material-ui/core';
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

const ActPopover = ({ _edit, _delete }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <button aria-describedby={id} variant="contained" onClick={handleClick} className="btn">
                <i class="fas fa-cog"></i>
              </button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div className='p-0 px-2 py-1 popover-global'>
                    <div className='d-flex flex-column'>
                        <button className="btn" onClick={() => { 
                            _delete()
                            handleClose()
                             }}><i class="fas fa-trash-alt"></i> Hapus</button>
                        <hr className='m-0' />
                        <button className="btn" onClick={_edit}><i class="fas fa-pen"></i> Edit</button>
                    </div>
                </div>
            </Popover>
        </div>
    );
}

export default ActPopover
