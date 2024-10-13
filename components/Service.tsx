import React from "react";

const Service = () => {
  return (
    <div className="w-[324px] md:w-[500px] flex items-center justify-between border border-neutrals-200 px-2 py-4 rounded-lg">
      <div className="flex flex-col">
        <p className="text-lg font-semibold">Category</p>
        <p className="text-sm">Category Name</p>
      </div>
      <div className="px-4 py-1 rounded-full bg-primary-100">
        <p>$ 498</p>
      </div>
    </div>
  );
};

export default Service;
