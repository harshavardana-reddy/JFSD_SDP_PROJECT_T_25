import { Button } from "@nextui-org/react";
import WebViewer from "@pdftron/webviewer";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";



export default function ViewPDF() {
  const location = useLocation();
  const viewer = useRef(null)
  const [isViewerReady, setIsViewerReady] = useState(false);
 

  
  const { pdfData } = location.state || {}; 
//   console.log(pdfData)






  if (!pdfData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">No PDF data available to display.</p>
        <div className="flex justify-center p-4 border-t">
        <Button onClick={() => window.history.back()} color="primary" variant="shadow">
          Go Back
        </Button>
      </div>
      </div>
    );
  }

 

 

  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex-grow flex justify-center items-center">
        <iframe
          id="pdf"
          title="PDF Viewer"
          src={`data:application/pdf;base64,${pdfData}`}
          className="w-full h-screen border-2 border-gray-300 rounded-lg shadow-lg"
        />
        {/* <div className="flex-grow flex justify-center items-center">
        <div ref={viewer} style={{ height: "100vh", width: "100%" }}></div>
      </div> */}
        {/* <embed type="application/pdf" title="pdf" src={`data:application/pdf;base64,${pdfData}`} className="w-full h-screen border-2 border-gray-300 rounded-lg shadow-lg" /> */}
      </div>

      {/* Button at the Bottom */}
      <div className="flex justify-center p-4 border-t">
        <Button onClick={() => window.history.back()} color="primary" variant="shadow">
          Go Back
        </Button>
      </div>
    </div>
  );
}
