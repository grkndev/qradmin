import Image from "next/image";
import React from "react";

export default function StoreLogo() {
  const curretSettings = {
    image: "https://i.ibb.co/0G3xWN8/c3fb153b1701.png",
    name: "RABELCAFE",
  };
  return (
    <div className="flex flex-col space-x-3 space-y-6 w-fit">
      {curretSettings.image.length > 0 ? (
        <Image
          width={200}
          height={200}
          className="w-48 h-48 object-contain"
          alt="Logo"
          src={curretSettings.image}
        />
      ) : (
        <div className="animate-pulse w-48 h-48 object-contain rounded-full bg-zinc-500"></div>
      )}

      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-content border-dashed rounded-lg cursor-pointer bg-darkcontent/15   hover:bg-content "
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-content"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-content">
              <span className="font-semibold">Fotoğraf seçin</span>
            </p>
            <p className="text-xs text-content">PNG, JPG (MAX. 2MB)</p>
          </div>
          <input
            id="dropzone-file"
            accept="image/png, image/jpeg"
            type="file"
            className="hidden"
          />
        </label>
      </div>

      <button className="disabled:opacity-50 disabled:cursor-not-allowed bg-content/25 p-2 w-full rounded items-center flex justify-center">
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
  );
}
