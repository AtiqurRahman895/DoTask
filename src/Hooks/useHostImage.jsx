import axios from "axios";
import { toast } from "react-toastify";

const cloud_name=import.meta.env.VITE_cloudinary_cloud_name
const api_url=`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`
const useHostImage = () => {
    const hostImage=(file,setImage)=>{

        const formData = new FormData();
        formData.append("file", file); 
        formData.append("upload_preset", "goodCar"); 
        axios.post(api_url,formData,{
            headers: {"content-type": "multipart/form-data"}
        })
        .then((result)=>{
            // console.log(result.data.url)
            setImage(result.data.secure_url)
            // setGoodImage(result.data.url)
        })
        .catch((err)=>{
            setImage(false)
            // setGoodImage(false)
            console.error(err.message)
            toast.error("Only JPG, PNG, GIF image files are allowed, and the maximum file size is 10MB. Please select an appropriate image file to proceed!")
        })
    }

    return hostImage
};

export default useHostImage;