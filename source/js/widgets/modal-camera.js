import React from 'react';

import Loader from './loader';

function ModalCamera(props) {
    return (
        ! props.fileButtons &&
        <div className="col s3 file-buttons hide-on-small-only">
            <div className="camera-button">
                <div className="div-camera-anchor">
                    <a className="btn" onClick={props.openModal}><i className="fas fa-camera"></i> Take a picture</a>
                </div>

                {
                    props.modalCamera &&
                    <div id="modal" className="modal">
                        <div className="modal-content">
                            {
                                ! props.uploading ?
                                <div id="open-camera"></div>
                                :
                                <Loader></Loader>
                            }
                        </div>
                        {
                            ! props.uploading &&
                            <div className="modal-footer">
                            {
                                props.defaultButtons ?
                                <div className="footer-buttons">
                                    <a className="btn" onClick={props.freeze}><i className="fas fa-camera"></i> Snap</a>
                                    <a className="btn-flat" onClick={props.closeModal}><i className="fas fa-window-close"></i> Cancel</a>
                                </div>
                                :
                                <div className="footer-buttons">
                                    <a className="btn" onClick={props.unfreeze}><i className="fas fa-redo-alt"></i> Retake</a>
                                    <a className="btn btn-upload" onClick={props.postSnap}><i className="fas fa-cloud-upload-alt"></i> Post</a>
                                    <a className="btn-flat" onClick={props.closeModal}><i className="fas fa-window-close"></i> Cancel</a>
                                </div>
                            }
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default ModalCamera;