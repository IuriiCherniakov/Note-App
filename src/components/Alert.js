import {AlertContext} from "../context/alert/alertContext";
import {useContext} from "react";

export const Alert = () => {

    const {alert, hide} = useContext(AlertContext)

    if(!alert.visible) {
        return null
    }
    return (
        <div className={`alert alert-${alert.type || 'warning'} alert-dismissible`} >
            <strong>Attention!</strong>
            {alert.text}
            <button onClick={hide} type="button" className="btn-close btn-sm" data-bs-dismiss="alert" aria-label="Close">

            </button>


        </div>
    )
}