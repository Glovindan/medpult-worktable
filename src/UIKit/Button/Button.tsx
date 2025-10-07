import React, { ReactNode, useRef, useState } from "react";
import Loader from "../Loader/Loader";

interface ButtonData extends React.ComponentProps<"button"> {
  title: any;
  clickHandler: any;
  buttonType?: string;
  icon?: any;
}

function Button(props: ButtonData) {
  const { title, buttonType, clickHandler, icon, ...buttonProps } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [loader, setLoader] = useState<ReactNode>(
    <div>
      <Loader />
    </div>
  );

  const loadOnClick = async () => {
    setIsLoading(true);
    const buttonWidth = (buttonRef.current?.getBoundingClientRect().width ?? 40) - 40;
    const loaderElement = (
      <div style={{ width: buttonWidth + "px" }}>
        <Loader />
      </div>
    );
    setLoader(loaderElement);
    await clickHandler();
    setIsLoading(false);
  };

  const buttonContent = isLoading ? (
    loader
  ) : (
    <span style={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
      {icon}
      {title}
    </span>
  );

  return (
    <button
      className={buttonType ? `button button_${buttonType}` : `button`}
      disabled={isLoading || props.disabled}
      onClick={loadOnClick}
      ref={buttonRef}
      {...buttonProps}
    >
      {buttonContent}
    </button>
  );
}

export default Button;
