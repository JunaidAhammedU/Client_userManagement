import React, { useState } from 'react'
import './Profile.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { updateUser } from '../../../Redux/User/UserSlice'

function Profile() {

    const [image,setImage] = useState(null);
    const { Username, Dp, Id } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const setDp = async (image) => {

        const formData = new FormData()

        formData.append("image",image)
        formData.append("id",Id)

        const config = {
            header: {
                "content-type": "multipart/form-data",
                id: Id
            },
            withCredentials: true
        }

        try {
            const { data } = await axios.post(process.env.react_app_server_url+"/profile", formData, config)
            dispatch(updateUser({ Dp: data.Dp, Username, Id }))
            if(data.status){
                setImage(null)
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <div className='profile-container'>
            <div className='profile-pic'>
                <img src={ image ? URL.createObjectURL(image) : Dp ? `../../../Images/${Dp}` : "../../../Images/avatar.png"} alt='profile pic'/>
            </div>
            <div className='profile-info'>
                <span>{Username ? Username : null}</span>
            </div>
            <div className='upload-image'>
                    <input accept=".jpg, .jpeg, .png, .gif, .pdf" type='file' name='dp' id='dp' onChange={(e)=>{setImage(e.target.files[0]); setDp(e.target.files[0])}} />
                    <label htmlFor="dp" className='custom-file-button' title='Upload Pic'><i className='fa fa-upload'></i></label>              
            </div>
        </div>
    )
}

export default Profile
