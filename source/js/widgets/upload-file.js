import React from 'react';

function UploadFile (props) {
    return(
        ! props.fileButtons ?
        <div id="fileName" className="div-file-anchor btn file-field input-field">
            <span><i className="fas fa-upload"></i> Upload</span>
            <input name="file" id="file" type="file" onChange={props.handleFile} />
        </div>
        :
        <div>
            <a className="btn btn-upload"><i className="fas fa-cloud-upload-alt"></i> Post</a>
            <a className="btn-flat" onClick={props.cancelFile}><i className="fas fa-window-close"></i> Cancel</a>
            <p className="file-path-paragraph"><strong>File:</strong> {props.filePath}</p>
        </div>
    )
}

export default UploadFile;