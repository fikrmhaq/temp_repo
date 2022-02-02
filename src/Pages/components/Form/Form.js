import Cleave from "cleave.js/react";
import React, { memo, useState } from "react";
import { useSearch } from "../../../functions/hooks";

const Input = memo(
  ({ label, placeholder, onChange = (ev) => console.log(ev) }) => {
    return (
      <div className="form-group mb-2">
        <label htmlFor="kode_rekening_kegiatan">{label}</label>
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    );
  }
);

const Textarea = memo(
  ({ label, placeholder, onChange = (ev) => console.log(ev) }) => {
    return (
      <div className="form-group mb-2">
        <label htmlFor="kode_rekening_kegiatan">{label}</label>
        <textarea
          type="text"
          className="form-control"
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    );
  }
);

const Date = memo(
  ({ label, placeholder, onChange = (ev) => console.log(ev) }) => {
    return (
      <div className="form-group mb-2">
        <label htmlFor="kode_rekening_kegiatan">{label}</label>
        <input
          type="date"
          className="form-control"
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    );
  }
);

const ListSelection = ({ data, label = null, onChange = (ev) => console.log(ev) }) => {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('')

  const select = (item) => {
    const { label, value } = item;

    setSelected(value);
    onChange(value);
  };

  const Search = (e) => {
    setSearch(e.target.value.toLowerCase())
  }

  return (
    <div class="form-group">
      <div className="detail-container mb-2">
        <label htmlFor="kode_rekening_kegiatan">{label}</label>
        <div className="detail px-2 py-3 rounded-3">
          <div className="form-group">
            <input
              type="text"
              name="search"
              id="search"
              className="form-control"
              placeholder="Search"
              onChange={Search}
            />
          </div>
          <ul className="nav flex-column mt-3 px-1">
            {data.filter(a => a.label.toLowerCase().includes(search)).map((item) => {
              return (
                <li
                  className={
                    "nav-item py-2 px-3 rounded-3 mb-2 " +
                    (selected == item.value && "active")
                  }
                  onClick={() => {
                    select(item);
                  }}
                >
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const Selection = ({ list = [], onChange }) => {
  const [data, Search] = useSearch(list)
  const [selected, setSelected] = useState(null)

  const Select = (id) => {
    setSelected(id)
    onChange(id)
  }


  return (
    <div className="detail px-2 py-3 mt-3 rounded-3">
      <div className="form-group">
        <input type="text" name="search" id="search" className="form-control" placeholder="Search"
         onChange={(ev) => Search(ev.target.value)}
          />
      </div>
      <ul className="nav flex-column mt-3 px-1">
        
        {
          data.map(item => {
            return (
              <li 
              className={"nav-item py-2 px-3 rounded-3 mb-2 " + (selected == item.id && 'active')}
               onClick={() => Select(item.id)}
               >
                {item.nama}
              </li>
            );
          })
        }
      </ul>
    </div>
  )
}

export const InputList = ({ onChange }) => {

}

export const Form = {
  Input,
  Textarea,
  Date,
  ListSelection,
  Selection
};
