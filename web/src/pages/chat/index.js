import React, { useState, useEffect } from 'react';

import api from  '../../services/api';
import MessageItem from '../../components/MessageItem';
import { connect, disconnect, subscribeToNewMessages } from '../../services/socket';


import '../../global.css';
import '../../App.css';
import '../../Sidebar.css';
import '../../Main.css';

// Componente: Bloco isolado de HTML, CSS, e JS, o qual não interfere no restante da aplicação
// Propriedade: Informações que um componente PAI passa para o componente FILHO
// Estado: Informações mantidas pelo componente (lembrar imutabilidade)

function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    async function loadMessages() {
      const user = JSON.parse(await localStorage.getItem('user'));
      
      /*const response = await api.get('/searchmessages', {
        params: {
            latitude: user.location.coordinates[1],
            longitude: user.location.coordinates[0]
        }
      });
      setMessages(response.data.messages);*/

      const response = await api.get('/messages');
      setMessages(response.data);
      

      setupWebsocket();

    }

    loadMessages();
  }, []);

  async function handleAddMessage() {
    const user = JSON.parse(localStorage.getItem('user'));   

    const response = await api.post('messages', 
      { text, 
        latitude: user.location.coordinates[1],
        longitude: user.location.coordinates[0],
        user });

    setMessages([...messages, response.data]);
}

  useEffect(() => {
    subscribeToNewMessages(message => setMessages([...messages, message]));
  }, [messages]);

  function setupWebsocket() {
    disconnect();

    connect(
        latitude,
        longitude
    );

}

  return (    
    <div id="app">
      <main>
        <ul>
          {messages.map(message => (
            <MessageItem  key={message._id} message={message}/>
          ))}
        </ul>
        <div className="form-send">
        <input className="input-send" 
          placeholder="Digite uma mensagem..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button className="button-send"  
          onClick={handleAddMessage}/>
      </div>
      </main>
 
    </div>
  );
}

export default Chat;
