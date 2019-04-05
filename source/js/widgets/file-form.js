import React from 'react';
// import axios from 'axios';
// import flatted from 'flatted';

import ModalCamera from './modal-camera';
import UploadFile from './upload-file';
import FilePreviewBox from './file-preview-box';
import Loader from './loader';

import './file-form.css';

class FileForm extends React.Component {
    render () {
        return (
            <div className="row">
                <div className="col s12">
                    <div className="file-input-container">
                        {
                            this.props.uploading ?
                            <Loader></Loader>
                            :
                            <form ref={this.props.setForm} encType="multipart/form-data" className="form-media-upload" id="formUpload" onSubmit={this.props.submitFile}>
                                <div className="row row-file-buttons">
                                    <ModalCamera fileButtons={this.props.fileButtons} openModal={this.props.openModal} cancelFile={this.props.cancelFile} modalCamera={this.props.modalCamera} uploading={this.props.uploading} defaultButtons={this.props.defaultButtons} freeze={this.props.freeze} closeModal={this.props.closeModal} unfreeze={this.props.unfreeze} postSnap={this.props.postSnap} handleFile={this.props.handleFile}></ModalCamera>
                                    <UploadFile fileButtons={this.props.fileButtons} handleFile={this.props.handleFile} cancelFile={this.props.cancelFile}></UploadFile>
                                </div>
                                <FilePreviewBox fileButtons={this.props.fileButtons} filePath={this.props.filePath}></FilePreviewBox>
                            </form>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default FileForm;