import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'universal-cookie'

import './App.css';
import { ChannelContainer, ChannelListContainer, Auth } from './Components'

const cookies = new Cookies();

const apiKey = '6t5d478dpjeu';
const chatClient = StreamChat.getInstance(apiKey);
const authToken = cookies.get('token');

const theme = createTheme({
  palette: {
    primary: {
      main: '#005fff',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
    white: {
      main: '#ffffff'
    }
  },
});

const App = () => {

  if(!authToken) return <Auth />

  return (
    <ThemeProvider theme={theme}>
      <div className="App" >
        <Chat client={chatClient}>
          <Grid container height='100%'>
            <Grid item xs={0} md='auto' height='100%'>
              <ChannelListContainer />
            </Grid>
            <Grid item xs={12} md height='100%'>
              <ChannelContainer />
            </Grid>
          </Grid>
        </Chat>
      </div>
    </ThemeProvider>
  );
}

export default App;
