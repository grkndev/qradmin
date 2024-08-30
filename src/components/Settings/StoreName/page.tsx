import React from "react";

export default function StoreName() {
  return (
    <div className="p-2 space-y-1">
      <h1 className="font-medium text-xl">Mağaza adı</h1>
      <div className="flex space-x-3">
        <input
          type="text"
          className="p-2 bg-content/25 rounded outline-none"
          value={"RABELCAFE"}
        />

        <button
          disabled
          className="disabled:opacity-50 disabled:cursor-not-allowed bg-content/25 p-2 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
