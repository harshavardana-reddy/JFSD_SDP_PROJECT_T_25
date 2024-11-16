import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@nextui-org/react';

export default function ViewPDFPage() {
    const location = useLocation();
    const [pdfData, setPdfData] = useState(null);

    useEffect(() => {
        if (location.state && location.state.pdfData) {
            setPdfData(location.state.pdfData);
        }
    }, [location]);

    return (
        <div className="p-4 bg-gray-200 shadow-lg rounded-md">
            <h2>View Assignment PDF</h2>
            {pdfData ? (
                <div>
                    <iframe
                        src={pdfData}
                        width="100%"
                        height="600px"
                        title="Assignment PDF"
                    ></iframe>
                </div>
            ) : (
                <p>No PDF data available!</p>
            )}
            <div align="center">
                <Button color="primary" onClick={() => window.history.back()}>
                    Go Back
                </Button>
            </div>
        </div>
    );
}
