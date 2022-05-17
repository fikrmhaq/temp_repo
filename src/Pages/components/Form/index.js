import React, { memo } from 'react'


const Text = memo(({ label, onChange = (ev) => console.log(ev) }) => {
    return (
        <>
            <label htmlFor="nama_ruangan">{label}</label>
            <input type="text"
                className="form-control"
                placeholder='Input disini..'
                onChange={onChange}
            />
        </>
    )
})

const Textarea = memo(({ label, rows="3", onChange = (ev) => console.log(ev) }) => {

    return (
        <>
            <label htmlFor="keterangan">{label}</label>
            <textarea 
            rows={rows} 
            className="form-control" 
            placeholder='Input disini..' 
            onChange={onChange}
            />
        </>
    )

})



export const Form = {
    Text,
    Textarea
}