import React, { Fragment } from 'react'
import Backdrop from './Backdrop'

const Modal = (props) => {
    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div className='Modal' style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
                <div className="modal-title">
                    <h3>Info about modes</h3>
                </div>

                <p>In Gamble mode you bet that you will live less than Doomsday predicted. Whereas in Challenge mode, you bet you'll live longer than Doomsday predicted. You have to bear in mind that, for each task that you fail, the score value will be subtracted from your remaining life time. Doomsday will assign you tasks according to the mode you have chosen. You can always switch modes, although Doomsday is the one who always wins.</p>
            </div>
        </Fragment>
    )
}
export default Modal;