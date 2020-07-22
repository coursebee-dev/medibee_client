import React from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios';
let key = "7c8dbeaced1b17c9fabff5d4f68a6e12"
let url = `https://api.imgbb.com/1/upload?key=${key}`
export function ProPicUploader() {
    const handleChangeStatus = ({ meta, remove }, status) => {
        if (status === 'headers_received') {
            console.log(`${meta.name} uploaded!`)
            console.log({ meta, status })
            remove()
        } else if (status === 'aborted') {
            console.log(`${meta.name}, upload failed...`)
        }
    }
    return (
        <Dropzone
            getUploadParams={({ file, meta }) => {
                const body = new FormData()
                body.append('image', file)
                console.log(meta)

                return { url: url, body }
            }}
            autoUpload="true"
            onChangeStatus={handleChangeStatus}
            accept="image/*" />
    )
}

export function StudentIDCard() {
    return (
        <Dropzone
            getUploadParams={({ file, meta }) => console.log({ file, meta })}
            onChangeStatus={() => console.log("a")}
            accept="image/*" />
    )
}

export function StudentNid() {
    return (
        <Dropzone
            getUploadParams={({ file, meta }) => console.log({ file, meta })}
            onChangeStatus={() => console.log("a")}
            accept="image/*" />
    )
}

export function MentorMBBS() {
    return (
        <Dropzone
            getUploadParams={({ file, meta }) => console.log({ file, meta })}
            onChangeStatus={() => console.log("a")}
            accept="image/*" />
    )
}

export function MentorBMDC() {
    return (
        <Dropzone
            getUploadParams={({ file, meta }) => console.log({ file, meta })}
            onChangeStatus={() => console.log("a")}
            accept="image/*" />
    )
}

export function MentorNid() {
    return (
        <Dropzone
            getUploadParams={({ file, meta }) => console.log({ file, meta })}
            onChangeStatus={() => console.log("a")}
            accept="image/*" />
    )
}