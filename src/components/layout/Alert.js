import React from 'react';

const Alert = (props) => {
    let className = 'alert ';
    let message = '';
    if (props.alert) {
        className += `alert-${props.alert.type}`;
        message += props.alert.msg;
    }







    return (
        <div>
            <div className={className}>
                <i className="fas fa-info-circle"></i> <p className='alert-msg'>{message}</p>
            </div>
        </div>
    )
}

export default Alert;
