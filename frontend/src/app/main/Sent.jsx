import React, { useState, useContext } from 'react';
import styles from './style.module.scss';
import GlobalContext from "../../shared/contexts/GlobalContext";
import { useForm } from 'react-hook-form';

import { Button, Box, Typography, Grid, IconButton, TextField, } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { sentLetter } from '../../shared/apis/LetterApi';

export default function Item({ open, setOpen }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { name, setName } = useContext(GlobalContext);
  const [text, setText] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);



  const sent = async (value) => {
    setOpen(false);
    const response = await sentLetter({...value, author: name});
    reset();
  }

  return (
    <Box>
      <Dialog
        fullWidth={true}
        maxWidth={'lg'}
        open={open}
        onClose={handleClose}
        scroll="body"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <Grid container direction="column">
          <DialogTitle id="scroll-dialog-title">Sent letter</DialogTitle>
          <DialogContent >
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <form onSubmit={handleSubmit(sent)}>
              <Box className={styles.form}>
              <Box width="100%">
                  <TextField 
                    type="text"
                    sx={{ width: '95%' }}
                    variant="filled"
                    error={errors.recipient}
                    label="recipient"
                    helperText={errors.recipient && 'Please enter recipient'}
                    {...register("recipient", {
                      required: true,
                      minLength: 1,
                    })}
                  />
                </Box>
                <Box my={2} width="100%">
                  <TextField 
                    type="text"
                    sx={{ width: '95%' }}
                    variant="filled"
                    error={errors.topic}
                    label="topic"
                    helperText={errors.topic && 'Please enter topic'}
                    {...register("topic", {
                      required: true,
                      minLength: 1,
                    })}
                  />
                </Box>
                <Box my={2} className={styles.textarea}>
                  <textarea placeholder='enter you letter' {...register("text", {
                      required: true,
                      minLength: 1,
                    })}/>
                </Box>
                <Button type="submit" size='small' >Sent</Button>
                </Box>
                </form>             
            </DialogContentText>
          </DialogContent>
          <DialogActions id={styles.dialogActions} > 
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Grid>
      </Dialog>
    </Box>
  );
}