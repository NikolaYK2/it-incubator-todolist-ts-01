import React from "react";

export type IconSvgType = {
  iconName: "btnAll" | "btnActive" | "btnCompleted" | "add" | "empty" | "delete" | "editable" | null;
};
export const IconSvg = ({ iconName }: IconSvgType) => {
  switch (iconName) {
    case "editable": {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
          <path d="M21.09 15.367L23 16.495 12 23 1 16.493l1.91-1.128.983.582-.927.547L12 21.838l9.033-5.342-.927-.547zm-3.93-5.159l3.874 2.288-9.033 5.342-9.035-5.344L7.04 10.09l.654-1.527c.005-.01.013-.02.017-.03L1 12.491 12 19l11-6.505-5.11-3.017zm-9.382 3.239l.327-.763L9.533 9.35l8.31-8.309a.98.98 0 011.385 0l1.429 1.429a.965.965 0 01.03 1.385l-8.325 8.324-3.183 1.364-.914.391a.371.371 0 01-.487-.487zm9.316-10.243l1.413 1.415 1.152-1.152a.42.42 0 00.006-.587l-.804-.838a.42.42 0 00-.6-.006zm-6.177 6.177l1.414 1.414 5.47-5.47-1.415-1.413zm-1.601 3.015l2.241-.96-1.28-1.28z"></path>
          <path fill="none" d="M0 0h24v24H0z"></path>
        </svg>
      );
    }
    case "delete": {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className="icon" viewBox="0 0 1024 1024">
          <path
            fill="#D1C4E9"
            d="M810.667 149.333H213.333c-23.466 0-42.666 19.2-42.666 42.667v128c0 23.467 19.2 42.667 42.666 42.667h597.334c23.466 0 42.666-19.2 42.666-42.667V192c0-23.467-19.2-42.667-42.666-42.667zm0 256H213.333c-23.466 0-42.666 19.2-42.666 42.667v128c0 23.467 19.2 42.667 42.666 42.667h597.334c23.466 0 42.666-19.2 42.666-42.667V448c0-23.467-19.2-42.667-42.666-42.667zm0 256H213.333c-23.466 0-42.666 19.2-42.666 42.667v128c0 23.467 19.2 42.667 42.666 42.667h597.334c23.466 0 42.666-19.2 42.666-42.667V704c0-23.467-19.2-42.667-42.666-42.667z"
          ></path>
          <path
            fill="#F44336"
            d="M597.3330000000001 810.667a213.333 213.333 0 10426.667 0 213.333 213.333 0 10-426.667 0z"
          ></path>
          <path fill="#FFF" d="M923.947 878.528l-45.227 45.27-181.013-180.993 45.248-45.269z"></path>
          <path fill="#FFF" d="M742.805 923.947l-45.269-45.227 180.992-181.013 45.27 45.248z"></path>
        </svg>
      );
    }
    case "empty": {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" version="1" viewBox="0 0 762 629">
          <path
            d="M3749 6224c-6-16-28-81-49-144-46-137-97-281-102-285-2-2-113-5-247-7-158-2-246-7-248-13s83-76 189-155 197-147 201-151c9-7-12-88-87-333-25-83-44-152-42-154 5-4 135 83 286 192 58 41 110 76 115 76 6 0 100-61 210-135 109-74 202-135 206-135 3 0-27 102-67 226-41 124-74 235-74 247 0 17 47 57 199 171 110 82 198 153 195 158-3 4-115 8-248 8h-244l-52 138c-29 75-66 175-82 222-37 103-44 112-59 74zM2272 5810l-53-160h-181c-133 0-179-3-176-12 2-6 62-54 134-106 71-52 130-99 131-106 2-6-21-82-50-169s-51-160-49-162c5-5 123 73 223 146 37 27 69 49 73 49s74-45 157-101 152-99 155-96c3 2-20 78-51 167-30 90-55 168-55 174s29 31 63 56c140 100 197 144 197 152 0 4-76 8-170 8-151 0-170 2-178 18-5 9-31 81-57 160-26 78-50 142-54 142s-30-72-59-160zM5126 5805l-49-155h-180c-138 0-178-3-175-12 3-7 63-55 134-106 71-50 130-98 131-105 2-6-21-83-50-170s-51-160-49-162 71 42 153 97l148 100 152-102c83-56 152-100 155-98 2 3-18 70-45 151-74 220-82 186 69 296 72 51 130 98 130 102 0 5-78 9-174 9h-173l-54 152c-30 83-58 153-64 155-5 1-32-67-59-152zM1593 4392l-53-3V3130c0-692 3-1272 6-1289l7-31h377l1 63c0 34 3 271 5 526s5 466 7 467c2 2 26-74 55-169 28-94 81-271 117-392s70-224 75-229 13 6 18 25c34 112 62 215 128 469 67 255 113 420 117 420 2 0 7-960 7-1157v-23h390v2580h-200c-199 0-200 0-205-22-24-97-85-363-130-563-104-463-123-541-130-534-2 2-24 94-49 204-93 410-208 910-211 913-3 4-274 7-332 4zM4753 4392l-53-3v-379l183-2 182-3 5-1095 5-1095h400l3 1098 2 1097h390v380h-167c-93 0-332 2-533 3s-389 1-417-1zM42 3103l3-1288 522-3 523-2v400H450v760l68 1c37 1 165 0 285 0l217-2v381h-57c-32 1-160 0-285 0l-228-1v661h638l3 33c2 17 3 103 1 190l-3 157H40l2-1287zM3350 3100V1810h400v1110h193c219 0 203-5 305 94l62 60v1189l-66 63-66 64h-828V3100zm560 550v-360h-74c-58 0-75 3-80 16-8 21-8 689 1 697 3 4 39 7 80 7h73v-360zM6215 4368c12-40 262-811 371-1140l104-317V1810h390l1 548c1 301 3 563 5 582 5 43 235 735 448 1349 14 41 26 80 26 88 0 10-44 13-218 13h-218l-26-82c-14-46-64-213-112-373-104-347-95-319-101-313-5 5-68 216-165 551l-63 217h-448l6-22zM3762 1364c-5-11-35-98-67-194s-66-198-77-227l-19-52h-207c-114 0-226-1-250-1s-42-4-40-9c2-4 86-70 188-146 102-75 191-143 197-149 10-9-3-64-61-256-40-135-71-247-70-249 5-5 66 36 229 154 77 56 151 109 165 118 25 16 28 14 232-123 113-77 211-140 216-140 6 0-25 106-69 236-43 129-79 241-79 249 0 11 230 188 368 284 18 12 29 27 26 32-4 7-96 9-247 8l-242-3-13 26c-6 14-44 120-83 234-39 115-75 213-79 218-5 4-12 0-18-10zM2315 1218c-2-7-22-71-45-143-22-71-44-135-48-142-6-9-143-18-339-23-13 0-23-5-23-10 0-6 59-54 130-107 72-52 130-102 130-110 0-9-18-72-41-142-63-193-60-184-43-177 19 7 178 112 232 153 24 18 49 33 57 33 7 0 39-19 71-43 117-85 226-158 231-154 2 3-20 81-51 174l-55 168 29 25c16 14 78 59 139 100s111 78 111 83c0 4-30 7-67 7-145 1-286 9-293 17-4 4-29 72-55 150-45 138-60 169-70 141zM5146 1102c-22-64-47-136-57-159l-18-43h-176c-133 0-175-3-175-12 1-7 61-56 135-108s135-102 135-110-23-82-51-163-49-152-47-158c2-5 69 35 149 90l147 100 145-99c129-88 167-110 167-96 0 2-22 66-49 143-75 215-84 181 79 297 77 55 140 103 140 108 0 4-82 9-182 10l-183 3-50 147c-28 81-55 152-60 157-8 8-23-26-49-107z"
            transform="matrix(.1 0 0 -.1 0 629)"
          ></path>
        </svg>
      );
    }
    case "add": {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 48 48">
          <path fill="none" d="M0 0h48v48H0z"></path>
          <path d="M28 20H4v4h24v-4zm0-8H4v4h24v-4zm8 16v-8h-4v8h-8v4h8v8h4v-8h8v-4h-8zM4 32h16v-4H4v4z"></path>
        </svg>
      );
    }
    case "btnCompleted": {
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
              <path d="M14.563 17.167l7.468-7.468 2.61 2.61-10.107 10.107-6.359-6.358 2.64-2.64 3.748 3.749zm41.456.806H28.026v-3.969h27.993v3.969z"></path>
              <path d="M14.563 17.167l7.468-7.468 2.61 2.61-10.107 10.107-6.359-6.358 2.64-2.64 3.748 3.749zm41.456.806H28.026v-3.969h27.993v3.969zM14.563 49.167l7.468-7.468 2.61 2.61-10.107 10.107-6.359-6.358 2.64-2.64 3.748 3.749zm41.456.806H28.026v-3.969h27.993v3.969z"></path>
              <path d="M14.563 49.167l7.468-7.468 2.61 2.61-10.107 10.107-6.359-6.358 2.64-2.64 3.748 3.749zm41.456.806H28.026v-3.969h27.993v3.969zM14.563 33.167l7.468-7.468 2.61 2.61-10.107 10.107-6.359-6.358 2.64-2.64 3.748 3.749zm41.456.806H28.026v-3.969h27.993v3.969z"></path>
              <path d="M14.563 33.167l7.468-7.468 2.61 2.61-10.107 10.107-6.359-6.358 2.64-2.64 3.748 3.749zm41.456.806H28.026v-3.969h27.993v3.969z"></path>
            </g>
          </g>
        </svg>
      );
    }
    case "btnAll": {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 16 16">
          <path
            fill="#000"
            d="M5 0H1v4h4V0zM5 6H1v4h4V6zM1 12h4v4H1v-4zM15 0H7v4h8V0zM7 6h8v4H7V6zM15 12H7v4h8v-4z"
          ></path>
        </svg>
      );
    }
    case "btnActive": {
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
          <path d="M21 121c7.7 0 14-6.3 14-14s-6.3-14-14-14-14 6.3-14 14 6.3 14 14 14zm0-20c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6zM21 78c7.7 0 14-6.3 14-14s-6.3-14-14-14S7 56.3 7 64s6.3 14 14 14zm0-20c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6zM21 35c7.7 0 14-6.3 14-14S28.7 7 21 7 7 13.3 7 21s6.3 14 14 14zm0-20c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6z"></path>
        </svg>
      );
    }
    default: {
      return null;
    }
  }
};
