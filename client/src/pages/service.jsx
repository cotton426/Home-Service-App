import React from 'react'
import ServiceList from '../components/ServiceList'

function Service() {
  return (
    <div className="bg-BG h-screen flex justify-center items-center flex-col space-y-12 ">
      <h1 className="text-3xl text-blue-950 font-sans font-bold">บริการยอดฮิตของเรา</h1>
      <div className="content flex flex-row justify-center space-x-11 mt-6 ">
        < ServiceList/>
      </div>
      <button className="btn-primary mt-6">ดูบริการท้ังหมด</button>
    </div>
  )
}

export default Service