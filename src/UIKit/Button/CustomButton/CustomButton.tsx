import React, { ReactNode, useRef, useState } from "react";
import Loader from "../../Loader/Loader";

interface ButtonData extends React.ComponentProps<"button"> {
  title: any;
  clickHandler: any;
  buttonType?: string;
  svg?: any;
  svgPosition?: string;
}

function CustomButton(props: ButtonData) {
  const {
    title,
    buttonType,
    clickHandler,
    svg,
    svgPosition = "left",
    ...buttonProps
  } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [loader, setLoader] = useState<ReactNode>(
    <div>
      <Loader />
    </div>
  );

  const loadOnClick = async () => {
    setIsLoading(true);
    const buttonWidth =
      (buttonRef.current?.getBoundingClientRect().width ?? 40) - 40;
    console.log(buttonRef.current);
    const loaderElement = (
      <div style={{ width: buttonWidth + "px" }}>
        <Loader />
      </div>
    );
    setLoader(loaderElement);
    await clickHandler();
    setIsLoading(false);
  };

  const buttonContent = isLoading ? loader : title;

  return (
    <button
      className={
        buttonType
          ? `button-custom button-custom_${buttonType}`
          : `button-custom`
      }
      disabled={isLoading}
      onClick={loadOnClick}
      ref={buttonRef}
      {...buttonProps}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {svgPosition === "left" && svg && (
          <div className="button-custom__svg" style={{ marginRight: "5px" }}>
            {svg}
          </div>
        )}
        {title}
        {svgPosition === "right" && svg && (
          <div className="button-custom__svg" style={{ marginLeft: "12px" }}>
            {svg}
          </div>
        )}
      </div>
    </button>
  );
}

export default CustomButton;
