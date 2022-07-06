import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'universal-cookie'

import './App.css';
import 'stream-chat-react/dist/css/index.css'
import { Auth, ChannelContainer, ChannelListContainer} from './Components'

const cookies = new Cookies();

const apiKey = '6t5d478dpjeu';
const chatClient = StreamChat.getInstance(apiKey);
const authToken = cookies.get('token');

if (authToken) {
  chatClient.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    image: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword'),
    phoneNumber: cookies.get('phoneNumber'),
  }, authToken)
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#005fff',
      darker: '#003ea7',
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

  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!authToken) return <Auth />

  return (
    <div className="App" >
      <ThemeProvider theme={theme}>
        <Chat client={chatClient}>
          <Grid container height='100%'>
            <Grid item xs={0} md='auto' height='100%'>
              <ChannelListContainer 
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
              />
            </Grid>
            <Grid item xs={12} md height='100%'>
              <ChannelContainer
                setIsCreating={setIsCreating}
                isCreating={isCreating}
                createType={createType}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            </Grid>
          </Grid>
        </Chat>
      </ThemeProvider>
    </div>
  );
}

export default App;