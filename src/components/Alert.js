import {AlertContext} from "../context/alert/alertContext";
import {useContext} from "react";
import {CSSTransition} from 'react-transition-group';

export const Alert = () => {

    const {alert, hide} = useContext(AlertContext)

    return (
        <CSSTransition
            in={alert.visible}
            timeout={{
                enter: 350,
                exit: 350
            }}
            classNames={'alert'}
            mountOnEnter
            unmountOnExit
        >
            <div className={`alert alert-${alert.type || 'warning'} alert-dismissible`}>
                <strong>Attention!</strong>
                {alert.text}
                <button onClick={hide} type="button" className="btn-close btn-sm" data-bs-dismiss="alert"
                        aria-label="Close">
                </button>
            </div>
        </CSSTransition>
    )
}