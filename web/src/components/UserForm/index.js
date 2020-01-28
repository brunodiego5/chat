import React, { useState, useEffect } from 'react';

function UserForm( {onSubmit} ) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
    
          },
          (err) => {
            console.log(err);
          },
          {
            timeout: 30000,
          }
        );
    }, []);

    async function handleSubmit(e) {
        e.preventDefault(); //para NAO fazer a chamada de um form
        await onSubmit({
            name,
            email,
            latitude,
            longitude
        });

        setName('');
        setEmail('');
    }
    

    return (
      <>      
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="name">Nome</label>
            <input 
              name="name" 
              id="name" 
              required
              value={name}
              onChange={e => setName(e.target.value)} />
          </div>

          <div className="input-block">
            <label htmlFor="email">Email</label>
            <input 
              name="email" 
              id="email" 
              required 
              value={email}
              onChange={e => setEmail(e.target.value)}/>
          </div>
          <button type="submit">Acessar</button>
        </form>
      </>
    );
}

export default UserForm;