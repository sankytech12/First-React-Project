import classes from './Modal.module.css'
import { Fragment } from 'react'
import ReactDOM from 'react-dom'
const BackDrop=props=>{
    return <div className={classes.backdrop} onClick={props.onClose}/>
}

const ModalOverlays=props=>{
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const portalEle=document.getElementById('overlays');

const Modal=props=>{
    return (
        <Fragment>
            {ReactDOM.createPortal(<BackDrop onClose={props.onClose}/>,portalEle)}
            {ReactDOM.createPortal(<ModalOverlays>{props.children}</ModalOverlays>,portalEle)}
        </Fragment>
    )
}

export default Modal;