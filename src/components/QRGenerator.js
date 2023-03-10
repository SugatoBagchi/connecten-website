import React from "react";
import qr from "../assets/qr.png";

const QRGenerator = () => {
  return (
    <div id="qr" className="bg-gray-900 text-white text-center py-4">
      <p className="text-5xl font-bold">Get The App!</p>
      <div className="bg-gray-900 flex text-white items-center py-8 justify-around">
        <div>
          <p className="text-4xl font-bold pb-8 text-left">
            Lorem ipsum dolor sit amet.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus
            dolores modi deserunt vero eaque! Id!
          </p>
        </div>
        <div class="shadow-[5px_5px_0px_0px_rgba(59,130,246)]  max-w-xs bg-white border-4 border-blue-500 rounded-lg">
          <img class="rounded-lg p-2 " src={qr} alt="" />
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
