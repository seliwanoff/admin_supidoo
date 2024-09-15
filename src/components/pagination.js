import React from 'react';
import classnames from 'classnames';
import {usePagination, DOTS} from '../components/usePagination';
const Pagination = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className
    } = props;

    const paginationRange = usePagination({currentPage, totalCount, siblingCount, pageSize});

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul style={
                {
                    padding: '0px',
                    margin: '0px'
                }
            }
            className={
                classnames('pagination-container', {[className]: className})
        }>
            <li className={
                    classnames('pagination-item', {
                        disabled: currentPage === 1
                    })
                }
                onClick={onPrevious}>
                <div className=""
                    style={
                        {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: '#24242E'
                        }
                }>
                    <span className='material-icons'>keyboard_backspace</span>
                    Previous

                </div>
            </li>
            {
            paginationRange.map(pageNumber => {
                if (pageNumber === DOTS) {
                    return <li className="pagination-item dots"
                        key={
                            Math.random()
                    }>&#8230;</li>;
                }

                return (
                    <li key={pageNumber}  className={
                            classnames('pagination-item', {
                                selected: pageNumber === currentPage
                            })
                        }
                        onClick={
                            () => onPageChange(pageNumber)
                    }>
                        {pageNumber} </li>
                );
            })
        }
            <li className={
                    classnames('pagination-item', {
                        disabled: currentPage === lastPage
                    })
                }
                onClick={onNext}>
                <div className=""
                    style={
                        {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: '#24242E'
                        }
                }>Next
                    <span className='material-icons'>east</span>
                </div>
            </li>
        </ul>
    );
};

export default Pagination;
