import React, { useState } from 'react'
import Dropzone from '../dropzone'
import Progress from '../progress'
import check from './image/check.svg'
import './Upload.css'

const Upload = () => {
  const [files, handleFilesAdded] = useState([])
  const [uploading, changeUploadingStatus] = useState(false)
  const [uploadProgress, changeUploadProgress] = useState({})
  const [successfullyUploaded, changeSuccessfullyUploaded] = useState(false)

  const uploadFiles = async () => {
    changeUploadProgress({})
    changeUploadingStatus(true)
    const promises = []
    files.forEach(file => {
      promises.push(sendRequest(file))
    })
    try {
      await Promise.all(promises)

      changeSuccessfullyUploaded(true)
      changeUploadingStatus(true)
    } catch (e) {
      changeSuccessfullyUploaded(false)
      changeUploadingStatus(false)
      console.log('ERROR: ', e)
    }
  }

  const sendRequest = file => {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener('progress', event => {
        if (event.lengthComputable) {
          const copy = uploadProgress
          copy[file.name] = {
            state: 'pending',
            percentage: (event.loaded / event.total) * 100
          }
          changeUploadProgress(copy)
        }
      })

      req.upload.addEventListener('load', event => {
        const copy = uploadProgress
        copy[file.name] = {
          state: 'done',
          percentage: 100
        }
        changeUploadProgress(copy)
        resolve(req.response)
      })

      req.upload.addEventListener('error', event => {
        const copy = uploadProgress
        copy[file.name] = {
          state: 'error',
          percentage: 0
        }
        changeUploadProgress(copy)
        reject(req.response)
      })

      const formData = new FormData()
      formData.append('file', file, file.name)

      req.open('POST', 'http://localhost:8000/upload')
      req.send(formData)
    })
  }

  const renderProgress = file => {
    const progress = uploadProgress[file.name]
    if (uploading || successfullyUploaded) {
      return (
        <div className='progress-wrapper'>
          <Progress
            progress={
              progress
                ? progress.percentage
                : 0
            }
          />
          <img
            className='check-icon'
            alt='done'
            src={check}
            style={{
              opacity: progress && progress.state === 'done'
                ? 0.5
                : 0
            }}
          />
        </div>
      )
    }
  }

  const renderActions = () => (
    successfullyUploaded
      ? (
        <button
          onClick={() => {
            handleFilesAdded([])
            changeSuccessfullyUploaded(false)
          }}
        >
          Clear
        </button>
      ) : (
        <button
          disabled={files.length < 0 || uploading}
          onClick={uploadFiles}
        >
          Upload
        </button>
      )
  )
  console.log(uploadProgress)
  return (
    <div className='upload'>
      <span className='title'>Upload Files</span>
      <div className='content'>
        <div>
          <Dropzone
            onFilesAdded={newFiles => handleFilesAdded([...files, ...newFiles])}
          />
        </div>
        <div className='files'>
          {
            files.map((file, index) => (
              <div key={`${file.name}_${index}`} className='row'>
                <span className='filename'>{file.name}</span>
                {renderProgress(file)}
              </div>
            ))
          }
        </div>
      </div>
      <div className='actions'>
        {renderActions()}
      </div>
    </div>
  )
}

export default Upload
