import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Spinner } from '@nextui-org/react'; // Import Loading from NextUI

export default function ViewPDFPage() {
  const location = useLocation();
  const { pdfData } = location.state || {};

  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Simulate a delay (e.g., if data fetching or processing is required)
    setTimeout(() => {
      setLoading(false); // Stop loading after data is ready
    }, 1000); // Adjust the delay as needed
  }, [pdfData]); // Runs when pdfData changes

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Spinner size="xl" color="primary" />
      </div>
    );
  }

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
