import React from "react";

function Txt({ txtValue }) {
  return (
    <div className="col-span-2">
      <h5 className=" text-brandColor"> {txtValue} </h5>
    </div>
  );
}

export default Txt;
