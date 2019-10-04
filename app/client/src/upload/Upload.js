import React, { useState } from 'react'
import Dropzone from '../dropzone'
import './Upload.css'

const Upload = () => {
  const [files, handleFilesAdded] = useState([])
  const [uploading, changeUploadingStatus] = useState(false)
  const [uploadProgress, changeUploadProgress] = useState({})
  const [successfullyUploaded, chanceSuccessfullyUploaded] = useState(false)
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
              </div>
            ))
          }
        </div>
      </div>
      <div className='actions' />
    </div>
  )
}

export default Upload
