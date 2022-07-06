import React, { useState } from 'react'
import { Box, Typography, styled, TextField } from '@mui/material';
import { useChatContext } from 'stream-chat-react';

import { AiFillCloseCircle } from 'react-icons/ai'

import { UserList } from './'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:5,
  height: 600,
};

const buttonStyle = {
  height: '82px',
  background: '#f7f6f8',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  borderBottomRightRadius: '20px',
  borderBottomLeftRadius: '20px',
  padding: '8px 15px',
  fontSize: '1.1rem'
}

const ChannelNameInputContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100px',
  padding: '20px',
}))

const HeaderBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '62px',
  boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1)',
  padding: '10px 30px',
  fontSize: '1.1rem'
}))


const ChannelNameInput = ({ channelName = '', setChannelName }) => {

  const handleChange = (e) => {
    setChannelName(e.target.value);
  }

  return (
    <ChannelNameInputContainer>
      <TextField
        id="outlined-basic"
        label="Channel-name"
        variant="outlined"
        placeholder='channel-name'
        value={channelName}
        onChange={handleChange}
      />
    </ChannelNameInputContainer>
  )
}

const CreateChannel = ({ createType, setIsCreating }) => {
  const { client, setActiveChannel } = useChatContext();

  const [channelName, setChannelName] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);

  const closeHandler = () => {
    setIsCreating(false);
  }

  const createChannel = async (e) => {
    e.preventDefault();

    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName, members: selectedUsers
      })

      await newChannel.watch();

      setChannelName('');
      setIsCreating(false);
      setSelectedUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <Box sx={style}>
      <Box display='flex' flexDirection='column' height='100%'>
        <HeaderBox>
          <Typography>{createType === 'team' ? 'Create a New Channel' : 'Send Direct Message'}</Typography>
          <AiFillCloseCircle onClick={closeHandler} style={{ cursor: 'pointer' }} />
        </HeaderBox>
        {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}
        <UserList setSelectedUsers={setSelectedUsers} />
        <div style={buttonStyle} onClick={createChannel}>
          <Typography variant="button" sx={{cursor:'pointer'}} >{createType === 'team' ? 'Create Channel' : 'Create Message Group'}</Typography>
        </div>
      </Box>
    </Box>
  )
}

export default CreateChannel