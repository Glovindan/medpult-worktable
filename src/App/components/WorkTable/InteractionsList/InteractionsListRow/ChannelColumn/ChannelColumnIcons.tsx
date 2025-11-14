import React from "react";

const imgComment = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 21C13.78 21 15.5201 20.4722 17.0001 19.4832C18.4802 18.4943 19.6337 17.0887 20.3149 15.4442C20.9961 13.7996 21.1743 11.99 20.8271 10.2442C20.4798 8.49836 19.6226 6.89472 18.364 5.63604C17.1053 4.37737 15.5016 3.5202 13.7558 3.17294C12.01 2.82567 10.2004 3.0039 8.55585 3.68509C6.91131 4.36628 5.50571 5.51983 4.51677 6.99987C3.52784 8.47991 3 10.22 3 12C3 13.488 3.36 14.891 4 16.127L3 21L7.873 20C9.109 20.64 10.513 21 12 21Z"
      stroke="#438CF2"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const imgIncomingEmail = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6L10.8 11.1C11.5111 11.6333 12.4889 11.6333 13.2 11.1L20 6M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
      stroke="#4CB35E"
      stroke-width="1.5"
    />
  </svg>
);

const imgOutgoingEmail = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6L10.8 11.1C11.5111 11.6333 12.4889 11.6333 13.2 11.1L20 6M21 13V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H9M13 19H21M21 19L18 16M21 19L18 22"
      stroke="#4CB35E"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const imgIncomingCall = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 19.675C13.93 20.505 16.242 21 19 21V17L15 16L12 19.675ZM12 19.675C8.159 18.023 5.824 15.045 4.5 12M4.5 12C3.4 9.472 3 6.898 3 5H7L8 9L4.5 12ZM14 10L20 4M14 10H18M14 10V6"
      stroke="#7A5AF8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const imgOutgoingCall = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 19.675C13.93 20.505 16.242 21 19 21V17L15 16L12 19.675ZM12 19.675C8.159 18.023 5.824 15.045 4.5 12M4.5 12C3.4 9.472 3 6.898 3 5H7L8 9L4.5 12ZM20 4L14 10M20 4L16 4M20 4V8"
      stroke="#7A5AF8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const imgIncomingSms = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17 8H7M13 12H7M3 5V20L6 17H19C20.1046 17 21 16.1046 21 15V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5Z"
      stroke="#E39133"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const imgOutgoingSms = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 11V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V20L6 17H9M21 17H13M21 17L18 14M21 17L18 20M17 8H7M13 12H7"
      stroke="#E39133"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default {
  imgComment,
  imgIncomingEmail,
  imgOutgoingEmail,
  imgIncomingCall,
  imgOutgoingCall,
  imgIncomingSms,
  imgOutgoingSms,
};
