import { ReactNode } from "react";
import Popup from "reactjs-popup";
import { faQuestionCircle} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function FormInfo({ content }: FormInfoProps) {
    return (
        <Popup
            trigger={
                <FontAwesomeIcon
                icon={faQuestionCircle}
                className="icon-help"
                style={{ fontSize: '1.5rem', width: '12px', height: '12px', cursor: 'pointer' }}
                />
            }
    open={false}
    on="hover"
    closeOnDocumentClick
    position="top center"
    contentStyle={{ padding: '20px' }}>
    <div className="small bg-dark text-light p-2 rounded position-relative w-75 d-flex justify-content-center align-items-center flex-column">
      <p>{content}</p>
    </div>
    <div style={{ position: "absolute", left: "50%", width: "0", height: "0", borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderTop: "10px solid #343a40" }}></div>  
        </Popup>
    );
}

export interface FormInfoProps {
    content: ReactNode
}