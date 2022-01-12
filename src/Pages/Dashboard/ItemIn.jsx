import React from 'react';

class ItemIn extends React.Component {
    render() { 
        return (
            <div className="d-flex justify-content-between align-content-center mt-4 itemin pe-3">
                <div className="d-flex content-1">
                    <div className="rounded-3 foto" style={{ width: '50px', height: '50px', backgroundColor: '#BCD6FF' }}></div>
                    <div className="ms-2 my-auto d-block">
                        <h6 className="m-0">iMac</h6>
                        <span className="tanggal">12 Jan 2007</span>
                    </div>
                </div>
                <span className="my-auto price">Rp. {Math.floor(Math.random() * 10000000).toString().split('').reverse().map((item, index, elem) => {
                    if (!((index + 1) % 3) && index + 1 < elem.length) return item + '.';
                    return item;
                }).join('').split('').reverse()},00</span>
            </div>
        );
    }
}
 
export default ItemIn;