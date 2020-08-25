import React from 'react'

const SearchAlert = ({ alert }) => {
    return (

        alert !== null && (
            <div className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"></i> {alert.msg}
            </div>
        )


    )
}

export default SearchAlert
