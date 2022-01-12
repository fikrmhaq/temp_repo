import React, { useEffect, useState } from 'react';

function Pagination(props) {
    const [pagination, setPagination] = useState({
        pageNumber: 1,
        activePage: 1,
        activeData: []
    });

    useEffect(() => {
        whenPaginate();
    }, [props.data])

    useEffect(() => {
        props.get(pagination.activeData);
    }, [props.data, pagination])

    const whenPaginate = () => {
        pagination.pageNumber = parseInt(props.data.length / 10) + (props.data.length % 10 > 0 ? 1 : 0);
        pagination.activePage = 1;
        pagination.activeData = props.data.filter((item, index) => index > -1 && index < 10);
        setPagination({...pagination});
    }

    const nextPaginate = () => {
        if (pagination.activePage == pagination.pageNumber) return;
        pagination.activePage++;
        pagination.activeData = props.data.filter((item, index) => index > (pagination.activePage * 10) - 11 && index < (pagination.activePage * 10));
        console.log({...pagination});
        setPagination({...pagination});
    }

    const backPaginate = () => {
        if (pagination.activePage == 1) return;
        pagination.activePage--;
        pagination.activeData = props.data.filter((item, index) => index > (pagination.activePage * 10) - 11 && index < (pagination.activePage * 10));
        setPagination({...pagination});
    }

    const controller = (id) => {
        if (pagination.activePage == id) return;
        pagination.activePage = id;
        pagination.activeData = props.data.filter((item, index) => index > (pagination.activePage * 10) - 11 && index < (pagination.activePage * 10));
        setPagination({...pagination});
    }

    return (
        pagination.pageNumber > 1 && (
            <nav>
                <ul className='pagination justify-content-center mt-3'>
                    <li className={`page-item ${pagination.activePage == 1 && 'disabled'}`}><a href="#" className="page-link" onClick={backPaginate}><i class="fas fa-angle-left"></i></a></li>
                    {[...Array(pagination.pageNumber)].map((item, index) => (
                        <li className={`page-item ${index + 1 == pagination.activePage && 'active'}`} key={index}><a href="#" className="page-link" onClick={() => controller(index + 1)}>{index + 1}</a></li>
                    ))}
                    <li className={`page-item ${pagination.activePage == pagination.pageNumber && 'disabled'}`}><a href="#" className="page-link" onClick={nextPaginate}><i class="fas fa-angle-right"></i></a></li>
                </ul>
            </nav>
        )
    )
}

export default Pagination
