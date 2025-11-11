import React from "react";

type MiddleEllipsisStringProps = {
    /** Значение */
    value: string;
}

/** Строка с многоточием по-середине */
export function MiddleEllipsisString({value}: MiddleEllipsisStringProps) {
    const endLength = 6;
    const startSubstring = value.substring(0, value.length - (endLength + 1))
    const endSubstring = value.substring(value.length - endLength, value.length)
    return (
        <div className="middle-ellipsis-string">
            <span className="middle-ellipsis-string__start">{startSubstring}</span>
            <span className="middle-ellipsis-string__end">{endSubstring}</span>
        </div>
    )
}