import React from 'react';
import './styles.css';

/*<img src={dev.avatar_url} alt={dev.name}></img>*/

function MessageItem({ message }) {
    return (
        <li className="message-item">
            <header>                
                <div className="user-info">
                    <span>{message.user.name}</span>
                    <strong>{message.text}</strong>
                </div>
            </header>
        </li>
    );       
}

export default MessageItem;