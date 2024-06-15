"use client";
import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode.react";
import Head from "next/head";

const Page = () => {
  const [formData, setFormData] = useState({
    challanNo: "",
    vendorCode: "",
    itemCode: "",
    moNo: "",
    poNo: "",
    family: "",
    calNc: "",
    spMp: "",
    characteristics: "",
    rating: "",
    special: "",
    challanQuantity: "",
  });

  const qrRef = useRef(null);

  // Ensure each field's data is appropriately padded
  const generateQRData = () => {
    let qrDataString = "";
    Object.entries(fieldLengths).forEach(([key, length]) => {
      const value = formData[key] || "";
      qrDataString += value.padEnd(length, " "); // Pad with spaces as per specified lengths
    });
    return qrDataString;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePrint = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const qrImageSrc = canvas.toDataURL("image/png");
    const printWindow = window.open(
      "",
      "PRINT",
      "height=650,width=900,top=100,left=150"
    );

    printWindow.document.write(
      "<html><head><title>Print QR Code</title></head><body>"
    );
    printWindow.document.write(
      `<img src="${qrImageSrc}" style="width:100%; max-width:300px;"/>`
    );
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  // Field lengths as specified
  const fieldLengths = {
    challanNo: 12,
    vendorCode: 10,
    itemCode: 10,
    moNo: 8,
    poNo: 8,
    family: 4,
    calNc: 4,
    spMp: 2,
    characteristics: 2,
    rating: 4,
    special: 10,
    challanQuantity: 6,
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center text-black py-12">
      <Head>
        <title>Challan QR Code Generator</title>
      </Head>
      <img src="/1.png" alt="Company Logo" className="w-48 mb-4" />
      <h1 className="text-4xl font-bold mb-6">Challan QR Code Generator</h1>
      <div className="bg-white shadow-md rounded-lg p-8 mb-6">
        <form className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.keys(formData).map((key) => (
            <div key={key} className="form-group">
              <label
                htmlFor={key}
                className="block text-sm font-medium text-gray-700"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                maxLength={fieldLengths[key]}
              />
            </div>
          ))}
        </form>
        <div className="flex justify-center mt-6" ref={qrRef}>
          <QRCode value={generateQRData()} size={256} level="H" />
        </div>
      </div>
      <button
        onClick={handlePrint}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Print QR Code
      </button>
    </div>
  );
};

export default Page;
