import React from 'react';

function FilePreviewBox (props) {
    return (
        props.fileButtons &&
        <div className="row">
            <div className="col s6 push-s3">
                <p className="file-path-paragraph"><strong>File:</strong> {props.filePath}</p>
            </div>
        </div>
    )
}

export default FilePreviewBox;