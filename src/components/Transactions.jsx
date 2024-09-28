import React, { useEffect, useState } from 'react'
import axios from "axios"

function Transactions({data}) {
    const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(15); // Adjusted rows per page for demo
  const [transactions, setTransactions] = useState([]);

  const totalPages = Math.ceil(transactions?.length / rowsPerPage);

  const currentData = transactions?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

    const handleClick = (page) => {
        setCurrentPage(page);
      };
    

      useEffect(() => {
        const getTransactions = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/transactions`);
            setTransactions(response.data || []); // Fallback to an empty array

          } catch (error) {
            console.log('error', error);
          }
        };
        getTransactions();
      }, []);
  return (
    <div className='w-3/4 mx-auto mt-10'>
        <table className="min-w-full bg-white border border-gray-300">
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Phone Number</th>
                    <th className="py-3 px-6 text-left">Amount</th>
                    <th className="py-3 px-6 text-left">Type</th>
                    <th className="py-3 px-6 text-left">ServiceType</th>
                    <th className="py-3 px-6 text-left">Balance</th>
                    <th className="py-3 px-6 text-left">Date</th>
                </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
            {currentData.map((item, index) => (
                <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
                >
                <td className="py-3 px-6 text-left whitespace-nowrap">{item.phoneNumber}</td>
                <td className="py-3 px-6 text-left">{item.amount}</td>
                <td className="py-3 px-6 text-left">{item.type}</td>
                <td className="py-3 px-6 text-left">{item.serviceType}</td>
                <td className="py-3 px-6 text-left">{item.balance}</td>
                <td className="py-3 px-6 text-left">{item.date.slice(0,item.date.indexOf("T"))}</td>
                </tr>
            ))}
            </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
            <button
            className={`py-2 px-4 mx-1 rounded ${
                currentPage === 1
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            onClick={() => handleClick(currentPage - 1)}
            disabled={currentPage === 1}
            >
            Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
            <button
                key={index + 1}
                className={`py-2 px-4 mx-1 rounded ${
                currentPage === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => handleClick(index + 1)}
            >
                {index + 1}
            </button>
            ))}

            <button
            className={`py-2 px-4 mx-1 rounded ${
                currentPage === totalPages
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            onClick={() => handleClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            >
            Next
            </button>
        </div>
    </div>
  )
}

export default Transactions