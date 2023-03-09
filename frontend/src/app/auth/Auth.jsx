import React, { useState, useContext, useEffect} from 'react';
import GlobalContext from '../../shared/contexts/GlobalContext';
import { auth } from '../../shared/apis/UserApi';
import { useNavigate } from "react-router";
import routes from "../../shared/constants/routes";

function Auth() {
  const { name, setName } = useContext(GlobalContext);
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect( () => {
    if(name ) {
      navigate(routes.MAIN);
    }
  }, [])

  const authUser = async () => {
    const response = await auth(user);
    if (response) {
      setName(response.data.name);
      navigate(routes.MAIN);
    }
  }

  return (
    <div className='auth'>
      Auth
      <input
        className='authInput'
        type='text'
        placeholder='name'
        onChange={(event) => {
          setUser(event.target.value);
        }}
      />

      <button
        onClick={authUser}
        className='submitButton'
      ><span className='arrow'>&#8594;</span></button>
    </div>
  )
}

export default Auth;