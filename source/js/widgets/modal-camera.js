import React from 'react';
import webcam from 'webcamjs';
// import axios from 'axios';
// import flatted from 'flatted';

import Loader from '../widgets/loader';

import './modal-camera.css';

class ModalCamera extends React.Component {
    render () {
        return (
            <div className="row">
                <div className="col s12">
                    <div className="file-input-container">
                        <form action={`/api/posts/`} encType="multipart/form-data" className="form-media-upload" id="formUpload">
                            <div className="div-camera-anchor">
                                <a className="btn" onClick={this.props.openModal}><i className="fas fa-camera"></i> Take a picture</a>
                            </div>

                            {
                                this.props.modalCamera &&
                                <div id="modal" className="modal">
                                    <div className="modal-content">
                                        {
                                            ! this.props.uploading ?
                                            <div id="open-camera"></div>
                                            :
                                            <Loader></Loader>
                                        }
                                    </div>
                                    {
                                        ! this.props.uploading &&
                                        <div className="modal-footer">
                                        {
                                            this.props.defaultButtons ?
                                            <div className="footer-buttons">
                                                <a className="btn" onClick={this.props.freeze}><i className="fas fa-camera"></i> Snap</a>
                                                <a className="btn-flat" onClick={this.props.closeModal}><i className="fas fa-window-close"></i> Cancel</a>
                                            </div>
                                            :
                                            <div className="footer-buttons">
                                                <a className="btn" onClick={this.props.unfreeze}><i className="fas fa-redo-alt"></i> Retake</a>
                                                <a className="btn btn-upload" onClick={this.props.postSnap}><i className="fas fa-cloud-upload-alt"></i> Post</a>
                                                <a className="btn-flat" onClick={this.props.closeModal}><i className="fas fa-window-close"></i> Cancel</a>
                                            </div>
                                        }
                                    </div>
                                    }
                                </div>
                            }

                            <div id="fileName" className="div-file-anchor btn file-field input-field">
                                <span><i className="fas fa-upload"></i> Upload</span>
                                <input name="hello" id="file" type="file" onChange={this.onchange} />
                            </div>
                            {/* <button id="btnUpload" type="submit" className="btn btn-flat cyan hide">upload</button>
                            <button id="btnCancel" type="button" className="btn btn-flat red hide"><i className="fas fa-times"></i></button> */}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalCamera;