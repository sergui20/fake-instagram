import React from 'react';

import './footer-post.css';

function FooterPost (props) {
    return (
        <div className="footer-post">
            <div className="footer-buttons-container">
                <div className="social-footer-buttons">
                    {
                        props.liked ?
                        <button onClick={props.toggleLiked} className="footer-button"><i className="fas fa-heart footer-post-buttons i-social"></i></button>
                        : 
                        <button onClick={props.toggleLiked} className="footer-button"><i className="far fa-heart footer-post-buttons i-social"></i></button>
                    }
                    <button className="footer-button"><i className="far fa-comment footer-post-buttons i-social"></i></button>
                    <button className="footer-button"><i className="far fa-share-square footer-post-buttons i-social"></i></button>
                </div>
                <div className="bookmark-button">
                    <button className="bookmark-footer-button footer-button"><i className="far fa-bookmark footer-post-buttons"></i></button>
                </div>
            </div>
            <div className="footer-social-container">
                <span className="like-span">{`${props.likes} Likes`}</span>
            </div>
            {/* <div>
                Post description
            </div>
            <div>
                comments
            </div> */}
            <div>
                <span className="time-counter">Hace 3 horas</span>
            </div>
            {/* <div>
                <div>
                    add Comment
                </div>
                <div>
                    options
                </div>
            </div> */}
        </div>
    )
}

export default FooterPost;