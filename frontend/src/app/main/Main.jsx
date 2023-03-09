import React, { useContext, useState, useEffect } from 'react';
import logout from '../../img/logout.png';
import GlobalContext from '../../shared/contexts/GlobalContext';
import { Box, TextField, Button, Grid, Typography } from '@mui/material'
import { useNavigate } from "react-router";
import routes from "../../shared/constants/routes";
import { getLetters, readLetter } from '../../shared/apis/LetterApi';
import Sent from "./Sent";
import styles from './style.module.scss';

function Main() {
  const navigate = useNavigate();
  const { name, setName } = useContext(GlobalContext);
  const [letters, setLetters] = useState([]);
  const [isSentOpen, setIsSentOpen] = useState(false);
  const MINUTE_MS = 6000;

  useEffect(() => {
    getAllLetters();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllLetters();
    }, MINUTE_MS);
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

  const getAllLetters = async () => {
    const response = await getLetters(name);
    if (response && response.length > letters.length) {
      setLetters(response);
    }
  }

  const createLetter = () => {
    setIsSentOpen(true);
  }

  const logOut = () => {
    setName('')
    localStorage.removeItem('name');
    navigate(routes.AUTH);
  }

  const openOrCloseLetter = (id) => {
    const text = document.querySelector(`.text${id}`);
    if (text.classList.contains('close')) {
      text.classList.remove('close');
    }
    else {
      text.classList.add('close');
    }
  }

  return (
    <div className="phoneswrapper">
      <Sent
        open={isSentOpen}
        setOpen={setIsSentOpen}
      />
      <div className="phone_head">
        <div className="title"> My Letters </div>
        {
          name ? (
            <Box>{name}</Box>
          ) : null
        }
        <div className='btn'>
          <button className="icon_bubble msg" onClick={createLetter} ><h5>+</h5></button>
          <div
            className="icon_bubble msg"
            onClick={logOut}
          ><img src={logout} alt="out" /></div>
        </div>
      </div>

      <div className="divider"> </div>
      {letters.map((letter) => {
        const date = new Date(letter.date);
        return (
          <div className="phone_body">
            <div className="chat" onClick={() => {openOrCloseLetter(letter.id)}}>
              <div className="chat_info">
                <div className="contact_name">{letter.author} </div>
                <div className="contact_msg">{letter.topic} </div>
              </div>

              <div className="chat_status">
                <div className="chat_date">{`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`}</div>
                {!letter.status ? (<div className="chat_new grad_pb"> New </div>) : null}
              </div>
            </div>

            <div className={"close" + " " + `text${letter.id}`}>
              {letter.text}
            </div>
            <hr/>

          </div>
        )
      })}

      <div className="phone_footer">
        <div className="footer_divider grad_pb"> </div>
      </div>

    </div>
  )
}

export default Main;