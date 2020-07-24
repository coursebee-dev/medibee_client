import React, { useState, useEffect } from 'react'
import axios from 'axios';
let API_KEY = "162342449889694";
let API_SECRET = "I_EQRCJcBVMes0Ueb0LVvTjb1Xk";
let UPLOADPRESET = "enxcncgu"
export function ProPicUploader({ handleUpload }) {
    const [image, setImage] = useState(null);
    const [dumpurl, setDumpurl] = useState(null);
    const handleChange = (e) => {
        setImage(e.target.files[0])

    }
    const upload = async (e) => {
        e.preventDefault()
        const body = new FormData()
        body.append('upload_preset', UPLOADPRESET)
        body.append("file", image)
        const { data } = await axios.post("https://api.cloudinary.com/v1_1/coursebee/upload", body)
        let url = []
        url.push(data.url)
        setDumpurl(url)
        handleUpload(dumpurl, "propic")
    }

    return (
        <>
            <input type="file" onChange={handleChange} accept="image/x-png,image/gif,image/jpeg,image/jpg" />
            <button onClick={upload}>Set profile photo</button>
        </>
    )
}

export function StudentIDCard({ handleUpload }) {
    const [image, setImage] = useState(null);
    const [uploadfield, setuploadfield] = useState(1);
    const [dumpurl, setDumpurl] = useState(null);
    const handleChange = (e) => {
        setImage(e.target.files[0])
    }
    const upload = async (e) => {
        e.preventDefault()
        const body = new FormData()
        body.append('upload_preset', UPLOADPRESET)
        body.append("file", image)
        const { data } = await axios.post("https://api.cloudinary.com/v1_1/coursebee/upload", body)
        let url = []
        url.push(data.url)
        setDumpurl(url)
        handleUpload(dumpurl, "propic")
    }
    return (
        <>
            <input type="file" onChange={handleChange} accept="image/x-png,image/gif,image/jpeg,image/jpg" />
            <button onClick={upload}>Set Student Id card photo</button>
        </>
    )
}

export function StudentNid({ handleUpload }) {
    const [image, setImage] = useState(null);
    const [dumpurl, setDumpurl] = useState(null);
    const handleChange = (e) => {
        setImage(e.target.files[0])

    }
    const upload = async (e) => {
        e.preventDefault()
        const body = new FormData()
        body.append('upload_preset', UPLOADPRESET)
        body.append("file", image)
        const { data } = await axios.post("https://api.cloudinary.com/v1_1/coursebee/upload", body)
        let url = []
        url.push(data.url)
        setDumpurl(url)
        handleUpload(dumpurl, "propic")
    }
    return (
        <>
            <input type="file" onChange={handleChange} accept="image/x-png,image/gif,image/jpeg,image/jpg" />
            <button onClick={upload}>Set profile photo</button>
        </>
    )
}

export function MentorMBBS({ handleUpload }) {
    const [image, setImage] = useState(null);
    const [dumpurl, setDumpurl] = useState(null);
    const handleChange = (e) => {
        setImage(e.target.files[0])

    }
    const upload = async (e) => {
        e.preventDefault()
        const body = new FormData()
        body.append('upload_preset', UPLOADPRESET)
        body.append("file", image)
        const { data } = await axios.post("https://api.cloudinary.com/v1_1/coursebee/upload", body)
        let url = []
        url.push(data.url)
        setDumpurl(url)
        handleUpload(dumpurl, "propic")
    }
    return (
        <>
            <input type="file" onChange={handleChange} accept="image/x-png,image/gif,image/jpeg,image/jpg" />
            <button onClick={upload}>Set profile photo</button>
        </>
    )
}

export function MentorBMDC({ handleUpload }) {
    const [image, setImage] = useState(null);
    const [dumpurl, setDumpurl] = useState(null);
    const handleChange = (e) => {
        setImage(e.target.files[0])

    }
    const upload = async (e) => {
        e.preventDefault()
        const body = new FormData()
        body.append('upload_preset', UPLOADPRESET)
        body.append("file", image)
        const { data } = await axios.post("https://api.cloudinary.com/v1_1/coursebee/upload", body)
        let url = []
        url.push(data.url)
        setDumpurl(url)
        handleUpload(dumpurl, "propic")
    }
    return (
        <>
            <input type="file" onChange={handleChange} accept="image/x-png,image/gif,image/jpeg,image/jpg" />
            <button onClick={upload}>Set profile photo</button>
        </>
    )
}

export function MentorNid({ handleUpload }) {
    const [image, setImage] = useState(null);
    const [dumpurl, setDumpurl] = useState(null);
    const handleChange = (e) => {
        setImage(e.target.files[0])

    }
    const upload = async (e) => {
        e.preventDefault()
        const body = new FormData()
        body.append('upload_preset', UPLOADPRESET)
        body.append("file", image)
        const { data } = await axios.post("https://api.cloudinary.com/v1_1/coursebee/upload", body)
        let url = []
        url.push(data.url)
        setDumpurl(url)
        handleUpload(dumpurl, "propic")
    }
    return (
        <>
            <input type="file" onChange={handleChange} accept="image/x-png,image/gif,image/jpeg,image/jpg" />
            <button onClick={upload}>Set profile photo</button>
        </>
    )
}