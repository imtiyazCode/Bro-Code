import React from 'react';
import { useChatContext, Channel, MessageTeam } from 'stream-chat-react';
import { Box, styled } from '@mui/material';

import { ChannelInner,CreateChannel, EditChannel } from './'


const ChannelContainerWraper = styled(Box)(()=>({
  height: '100%',
  width:' 100%'
}))

const ChannelContainer = ({ isCreating, isEditing, setIsCreating, setIsEditing, createType }) => {

  if (isCreating) {
    return (
      <ChannelContainerWraper >
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </ChannelContainerWraper>
    )
  }

  if (isEditing) {
    return (
      <ChannelContainerWraper className="channel_container">
        <EditChannel setIsEditing={setIsEditing} />
      </ChannelContainerWraper>
    )
  }

  const EmptyState = () =>{
    <div className="channel-empty_container">
      <p className="channel-empty_first">This is the beginning of your chat history.</p>
      <p className="channel-empty_second">Send messages, attachments, links, emojis, and more!</p>
    </div>
  }

  return (
    <ChannelContainerWraper className="channel_container">
      <Channel EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </ChannelContainerWraper>
  )
}

export default ChannelContainer