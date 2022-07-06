import React from 'react';
import { useChatContext, Channel, MessageTeam } from 'stream-chat-react';
import { Box, styled, Modal } from '@mui/material';

import { ChannelInner,CreateChannel, EditChannel } from './'


const ChannelContainerWraper = styled(Box)(()=>({
  height: '100%',
  width:' 100%'
}))

const ChannelContainer = ({isCreating, setIsCreating, createType}) => {

  const handleClose = () => setIsCreating(false);

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
        <ChannelInner />
      </Channel>
      <Modal
        open={isCreating}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </Modal>
    </ChannelContainerWraper>
  )
}

export default ChannelContainer