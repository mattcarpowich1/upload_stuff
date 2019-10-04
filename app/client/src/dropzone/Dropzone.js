// basic dropzone component courtesy of https://medium.com/quick-code/how-to-create-file-dropzone-component-with-react-41e5f958d3f2
import React, { Component } from 'react'
import './Dropzone.css'

class Dropzone extends Component {
  constructor (props) {
    super(props)

    this.state = {
      hover: false
    }

    this.handleDragOver = this.handleDragOver.bind(this)
    this.handleDragLeave = this.handleDragLeave.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.handleOpenFileDialog = this.handleOpenFileDialog.bind(this)
    this.handleOnFilesAdded = this.handleOnFilesAdded.bind(this)
  }

  handleDragOver (e) {
    this.stopEvent(e)
    this.setState({
      hover: true
    })
  }

  handleDragLeave (e) {
    this.stopEvent(e)
    this.setState({
      hover: false
    })
  }

  handleDrop (e) {
    this.stopEvent(e)

    const { onFilesAdded } = this.props
    const { files } = e.dataTransfer
    onFilesAdded(this.fileListToArray(files))
    this.setState({
      hover: false
    })
  }

  handleOpenFileDialog () {
    this.fileInputRef.click()
  }

  handleOnFilesAdded (e) {
    const { files } = e.target
    const { onFilesAdded } = this.props
    onFilesAdded(this.fileListToArray(files))
  }

  stopEvent (e) {
    e.preventDefault()
    e.stopPropagation()
  }

  fileListToArray (list) {
    return Array.from(list)
  }

  render () {
    const { hover } = this.state
    const {
      handleOpenFileDialog,
      handleOnFilesAdded,
      handleDragOver,
      handleDragLeave,
      handleDrop
    } = this
    return (
      <div
        className={`drop-zone-container ${hover && 'hover'}`}
        onClick={handleOpenFileDialog}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type='file'
          multiple
          ref={node => { this.fileInputRef = node }}
          onChange={handleOnFilesAdded}
        />
        <div className='drag-files'>
          Drag files to upload
        </div>
      </div>
    )
  }
}

export default Dropzone
