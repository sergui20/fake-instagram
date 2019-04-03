import React from 'react';
// import axios from 'axios';
// import flatted from 'flatted';

import ModalCamera from './modal-camera';
import UploadFile from './upload-file';

import './file-form.css';

class FileForm extends React.Component {
    state = {
        fileButtons: false,
        filePath: null
    }

    handleFile = (ev) => {
        console.log(ev.target)
        const path = ev.target.value.split('fakepath').join("")
        const fileName = path.split("C:")

        this.setState({
            filePath: fileName,
            fileButtons: true
        })
    }

    cancelFile = () => {
        this.setState({
            fileButtons: false
        })
    }

    render () {
        return (
            <div className="row">
                <div className="col s12">
                    <div className="file-input-container">
                        <form action={`/api/posts/`} encType="multipart/form-data" className="form-media-upload" id="formUpload">
                            <ModalCamera fileButtons={this.state.fileButtons} openModal={this.props.openModal} cancelFile={this.cancelFile} filePath={this.state.filePath} modalCamera={this.props.modalCamera} uploading={this.props.uploading} defaultButtons={this.props.defaultButtons} freeze={this.props.freeze} closeModal={this.props.closeModal} unfreeze={this.props.unfreeze} postSnap={this.props.postSnap} handleFile={this.handleFile}></ModalCamera>
                            <UploadFile fileButtons={this.state.fileButtons} handleFile={this.handleFile} cancelFile={this.cancelFile} filePath={this.state.filePath}></UploadFile>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default FileForm;