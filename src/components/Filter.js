import React from 'react';

function Filter({filter, setFilter}){
    
    return(
        <span>
            Search by Name: {' '}
            <input
                value={filter || ''}
                onChange={ e => setFilter(e.target.value)}
            />
        </span>
    )
    
}

export default Filter;
