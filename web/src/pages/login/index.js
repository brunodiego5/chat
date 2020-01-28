import React, { useState, useEffect } from 'react';

import api from  '../../services/api';
import DevForm from '../../components/UserForm';
import { connect, disconnect } from '../../services/socket';

import '../../global.css';
import '../../App.css';
import '../../Sidebar.css';
import '../../Main.css';
import './styles.css';

import mouth from '../../assets/mouth.svg';

// Componente: Bloco isolado de HTML, CSS, e JS, o qual não interfere no restante da aplicação
// Propriedade: Informações que um componente PAI passa para o componente FILHO
// Estado: Informações mantidas pelo componente (lembrar imutabilidade)

function Login( { history } ) {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log({latitude, longitude});

        setLatitude(latitude);
        setLongitude(longitude);
        setupWebsocket(latitude, longitude);

      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    ); 
  }, []);

  async function handleAddUser(data) {
    const response = await api.post('users', data);
    
    localStorage.setItem('user', JSON.stringify(response.data));

    history.push('/chat');
  }

  function setupWebsocket(latitude, longitude) {
    disconnect();

    connect(
        latitude,
        longitude
    );

}

  return (    
    <div id="app" className="container-login">
      <img src={mouth} className="img-logo" alt="ScreamChat"/>
      <aside>
        <DevForm onSubmit={handleAddUser}/>        
      </aside> 
    </div>
  );
}

export default Login;
