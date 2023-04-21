import React from 'react'
import { useState } from 'react'
import { BiImageAdd } from "react-icons/bi";

function UploadImage() {

    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("")
    // const [removeImage, setremoveImage] =useState(null)

  return (
        <div>
            <div className="flex flex-row justify-center space-x-40 mt-10 text-gray-700">
                <label htmlFor="image" className="w-[100px] text-gray-700">
                    รูปภาพ
                    <label className="text-red">*</label>
                </label>
                <label
                    htmlFor="file-input"
                    className="flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded h-[200px] w-[450px] cursor-pointer p-0"
                >
                <input
                    type="file"
                    id="file-input"
                    accept="image/*"
                    className="input-field"
                    hidden
                    onChange={({target:{files}})=>{
                        files[0] && setFileName(files[0])
                        if(files){
                            setImage(URL.createObjectURL(files[0]))
                        }
                    }}
                />
                {image ? 
                    <div>
                        <img src={image} alt={fileName} className="flex w-auto h-48"/>
                    </div>
                    :
                    <div className="flex flex-col items-center">
                        <img src='\icons\uploadImg.png' alt='upload' className="w-16 h-16 mb-5"/> 
                        <div>   
                            <span className="pr-2 btn-ghost">
                                อัพโหลดรูปภาพ
                            </span> 
                            <span className="text-gray-700">
                                หรือ ลากและวางที่นี่
                            </span> 
                        </div>
                        <p className="text-gray-700">PNG, JPG ขนาดไม่เกิน 5MB</p> 
                    </div> }
                </label>
            </div>
            <span className=" text-gray-700 font-normal text-xs pl-[260px] mt-5 ">
                ขนาดภาพที่แนะนำ: 1440 x 225 PX
            </span>
        </div>

  )
}

export default UploadImage