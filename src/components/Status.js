import React from "react";
const Status = ({color,text}) => {
    
    return (
        <span className={`text-xs text-white font-medium me-2 px-2 py-1 rounded ${!color ? "bg-orange-500" :""}  bg-${color}-600`}>
            {text}
          </span>
    )
}
export default Status;