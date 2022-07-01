import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import { Grid } from '@mui/material'

import './App.css';
import { ChannelContainer, ChannelListContainer } from './Components'

const chatClient = new StreamChat('your_api_key');
const client = new StreamChat('your_api_key');

const App = () => {
  return (
    <div className="App" >
      <Chat client={client}>
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
  );
}

export default App;
