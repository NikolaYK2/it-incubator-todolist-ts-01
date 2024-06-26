import React from "react";

type Props = {
  name: "taskAll" | "taskActive" | "taskComplete";
};
export const IconSvg = ({ name }: Props) => {
  switch (name) {
    case "taskComplete": {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          clipRule="evenodd"
          viewBox="0 0 64 64"
        >
          <path fill="none" d="M-576 0H704V800H-576z"></path>
          <g>
            <g>
              <path
                d="M14.563 17.167l7.468-7.468 2.61 2.61-10.107 10.107-6.359-6.358 2.64-2.64 3.748 3.749zm41.456.806H28.026v-3.969h27.993v3.969z"></path>
              <path
                d="M14.563 17.167l7.468-7.468 2.61 2.61-10.107 10.107-6.359-6.358 2.64-2.64 3.748 3.749zm41.456.806H28.026v-3.969h27.993v3.969zM14.563 49.167l7.468-7.468 2.61 2.61-10.107 10.107-6.359-6.358 2.64-2.64 3.748 3.749zm41.456.806H28.026v-3.969h27.993v3.969z"></path>
              <path
                d="M14.563 49.167l7.468-7.468 2.61 2.61-10.107 10.107-6.359-6.358 2.64-2.64 3.748 3.749zm41.456.806H28.026v-3.969h27.993v3.969zM14.563 33.167l7.468-7.468 2.61 2.61-10.107 10.107-6.359-6.358 2.64-2.64 3.748 3.749zm41.456.806H28.026v-3.969h27.993v3.969z"></path>
              <path
                d="M14.563 33.167l7.468-7.468 2.61 2.61-10.107 10.107-6.359-6.358 2.64-2.64 3.748 3.749zm41.456.806H28.026v-3.969h27.993v3.969z"></path>
            </g>
          </g>
        </svg>);
    }
    case "taskAll": {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 16 16">
          <path
            fill="#000"
            d="M5 0H1v4h4V0zM5 6H1v4h4V6zM1 12h4v4H1v-4zM15 0H7v4h8V0zM7 6h8v4H7V6zM15 12H7v4h8v-4z"
          ></path>
        </svg>
      );
    }
    case "taskActive": {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 128 128"
          version="1.1"
          viewBox="0 0 128 128"
          xmlSpace="preserve"
        >
          <path d="M53 17H117V25H53z"></path>
          <path d="M53 60H117V68H53z"></path>
          <path d="M53 103H117V111H53z"></path>
          <path
            d="M21 121c7.7 0 14-6.3 14-14s-6.3-14-14-14-14 6.3-14 14 6.3 14 14 14zm0-20c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6zM21 78c7.7 0 14-6.3 14-14s-6.3-14-14-14S7 56.3 7 64s6.3 14 14 14zm0-20c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6zM21 35c7.7 0 14-6.3 14-14S28.7 7 21 7 7 13.3 7 21s6.3 14 14 14zm0-20c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6z"></path>
        </svg>);
    }
    default: {
      return <svg></svg>;
    }
  }
};
