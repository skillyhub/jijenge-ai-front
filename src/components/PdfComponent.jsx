import React from 'react';
import { jsPDF } from 'jspdf';
import { MdCancel } from "react-icons/md";
import { getBase64ImageFromURL } from '../utils';


const PDFDownloadComponent = ({back,className}) => {



  const generatePDF =async () => {
    const doc = new jsPDF();
    const imgData=await getBase64ImageFromURL('/img/jijenge-logo.png')

    // logo
    doc.addImage(imgData,'PNG',10,5,30,10)
    doc.setFontSize(20)
    doc.setFont('','',800)
    doc.text("Financial Report", 10, 30);
    doc.setFontSize(12)
    doc.text("This is a sample PDF created with jsPDF", 10, 40);
    



    
    doc.save("report.pdf");
  };

  return (
    <div className={className}>
        <MdCancel 
            size={28}
            color='white'
            onClick={back}
            className='absolute -top-5 -right-5 z-20 cursor-pointer'
        />
        <div className='flex flex-col justify-center items-center w-3/4 mx-auto py-10'>
            <h1 className='text-white font-semibold'>Download PDF Example</h1>
            <button 
                
                className='text-white py-2 mt-5 w-3/4 font-medium rounded-md bg-blue-600' 
                onClick={()=>{
                    generatePDF()
                    setTimeout(()=>{
                        back()
                    },2000)
                }}
            >
                Download PDF
            </button>
        </div>
      

    </div>
  );
};

export default PDFDownloadComponent;
