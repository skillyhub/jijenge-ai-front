import React, { useState } from 'react'

function IndicationBar() {
    const [percentage, setPercentage] = useState(
        Math.max(0, Math.min(100, 10))
    );
    
  return (
    <div className="w-3/5 mx-auto">
      <div className="w-full bg-gray-300 rounded h-10 mt-4">
        <div
          className={`h-10 rounded-md ${
            percentage >= 70
              ? 'bg-green-500'
              : percentage >= 30
              ? 'bg-yellow-500'
              : 'bg-red-500'
          }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {/* Percentage Label */}
      <p className={percentage===0? "text-center text-white font-bold mt-2 animate-pulse":"text-center text-white font-bold mt-2"}>{percentage > 0 ? percentage+"%":'SCORE'}</p>
    </div>
  )
}

export default IndicationBar