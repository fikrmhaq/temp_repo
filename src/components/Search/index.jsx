import React from 'react';

function Search(props) {
    return (
        <div className={`d-flex ${props.className}`}>
            {props.select != null && (
                <div className="form-group w-25">
                    <select name={props.select.name} id={props.select.id} value={props.select.value || null} onChange={props.select.onChange} className="form-select form-search">
                        {props.select.children.map((item, index) => (
                            <option value={item.key} key={index}>{item.value}</option>
                        ))}
                    </select>
                </div>
            )}
            <div className={`form-group ms-2 ${props.select != null ? 'w-75' : 'w-100'}`}>
                <input type="search" name={props.input.name} id={props.input.id} onChange={props.input.onChange} className="form-control form-search" placeholder={props.input.placeholder} value={props.input.value || null} />
            </div>
        </div>
    )
}

export default Search;
