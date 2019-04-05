import React, {Fragment} from 'react';

function UploadFile (props) {
    return(
        <Fragment>
            <div className="col s3 file-buttons div-file-anchor btn file-field input-field">
                <span><i className="fas fa-upload"></i> Choose a pic</span>
                <input name="file" id="file" type="file" onChange={props.handleFile} accept="image/jpeg, image/jpg, image/gif, image/png" />
            </div>
            {
                props.fileButtons &&
                <Fragment>
                    <div className="col s3 file-buttons">
                        <button className="btn btn-upload" type="submit"><i className="fas fa-cloud-upload-alt"></i> Post</button>
                    </div>
                    <div className="col s3 file-buttons">
                        <a className="btn cancel-btn" onClick={props.cancelFile}><i className="fas fa-window-close"></i> Cancel</a>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

export default UploadFile;