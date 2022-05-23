import React, { memo } from 'react'


const Text = memo(({ label, onChange = (ev) => console.log(ev), defaultValue = null }) => {
    return (
        <>
            <label htmlFor="nama_ruangan">{label}</label>
            {
                [undefined, null, ""].includes(defaultValue) ?
                    (
                        <input type="text"
                            className="form-control"
                            placeholder='Input disini..'
                            onChange={onChange}
                        />
                    )
                    :
                    (
                        <input type="text"
                            defaultValue={defaultValue}
                            className="form-control"
                            placeholder='Input disini..'
                            onChange={onChange}
                        />
                    )
            }
        </>
    )
})

const Date = memo(({ label, onChange = (ev) => console.log(ev), defaultValue = null }) => {
    return (
        <>
            <label htmlFor="nama_ruangan">{label}</label>
            {
                [undefined, null, ""].includes(defaultValue) ?
                    (
                        <input type="date"
                            className="form-control"
                            placeholder='Input disini..'
                            onChange={onChange}
                        />
                    )
                    :
                    (
                        <input type="date"
                            className="form-control"
                            placeholder='Input disini..'
                            defaultValue={defaultValue}
                            onChange={onChange}
                        />
                    )
            }
        </>
    )
})


const Textarea = memo(({ label, rows = "3", onChange = (ev) => console.log(ev) }) => {

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

const Select = memo(({ label, options, value, onChange = () => console.log('onChange') }) => {


    return (
        <div class="detail-container">
            <label htmlFor="keterangan">{label}</label>
            <div className="detail px-2 py-3 rounded-3 mb-3">

                <ul className="nav flex-column mt-3 px-1">
                    {
                        options.map(item => {
                            return (
                                <li className={"nav-item py-2 px-3 rounded-3 mb-2 " + (value == item.value && 'active')}
                                    onClick={() => onChange(item.value)}
                                >
                                    {item.label}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    )
})

const ClassicSelect = memo(({ label, options, onChange = (ev) => console.log(ev.target.value), defaultValue = null }) => {
    return (
        <>
            <label htmlFor="keterangan">{label}</label>
            <select class="form-control" onChange={ev => onChange(ev)}>
                {
                    options.map(item => {
                        return <option value={item.value}>{item.label}</option>
                    })
                }
            </select>
        </>
    )
})



export const Form = {
    Text,
    Textarea,
    Date,
    Select,
    ClassicSelect
}