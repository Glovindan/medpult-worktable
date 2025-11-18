import React from "react";

type MiddleEllipsisStringProps = {
    /** Значение */
    value: string;
    /** Количество символов в начале */
    startLength?: number
    /** Количество символов в конце */
    endLength?: number
}

/** Количество отобаражаемых в начале символов */
const START_LENGTH = 2;
/** Количество отобаражаемых в конце символов */
const END_LENGTH = 6;
/** Строка с многоточием по-середине */
export function MiddleEllipsisString({value, startLength = START_LENGTH, endLength = END_LENGTH}: MiddleEllipsisStringProps) {

  const getStartSubstring = () => {
    if(value.length < startLength + endLength) return ""

    const middleSubstring = value.substring(startLength, value.length - endLength);
    if(middleSubstring.length < 3) return value.substring(0, value.length - endLength - 3)

    return value.substring(0, startLength);
  }

  const getEndSubstring = () => {
    if(value.length < startLength + endLength) return "" 

    return value.substring(value.length - endLength, value.length);
  }

  const getMiddleSubstring = () => {
    if(value.length < startLength + endLength) return value 

    const middleSubstring = value.substring(startLength, value.length - endLength);
    if(middleSubstring.length < 3) return value.substring(value.length - endLength - 3, value.length - endLength)

    return middleSubstring;
  }

  const startSubstring = getStartSubstring()
  const middleSubstring = getMiddleSubstring()
  const endSubstring = getEndSubstring()

  const handleCopy = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault(); // предотвращаем стандартное поведение
    e.clipboardData.setData("text/plain", value); // вставляем исходное значение
  };
    
    return (
        <div className="middle-ellipsis-string" onCopy={handleCopy}>
            <span className="middle-ellipsis-string__start">{startSubstring}</span>
            <span className="middle-ellipsis-string__middle">{middleSubstring}</span>
            <span className="middle-ellipsis-string__end">{endSubstring}</span>
        </div>
    )
}

