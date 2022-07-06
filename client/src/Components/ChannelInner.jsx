import React, { useState } from 'react';
import { MessageList, MessageInput, Thread, Window, useChannelActionContext, Avatar, useChannelStateContext, useChatContext } from 'stream-chat-react';
import { Box, Toolbar, AppBar, IconButton, Typography, Button } from '@mui/material'

import { ChannelInfo } from '../assets';

export const GiphyContext = React.createContext({});

const ChannelInner = () => {
    const [giphyState, setGiphyState] = useState(false);
    const { sendMessage } = useChannelActionContext();

    const overrideSubmitHandler = (message) => {
        let updatedMessage = {
            attachments: message.attachments,
            mentioned_users: message.mentioned_users,
            parent_id: message.parent?.id,
            parent: message.parent,
            text: message.text,
        };

        if (giphyState) {
            updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
        }

        if (sendMessage) {
            sendMessage(updatedMessage);
            setGiphyState(false);
        }
    };

    return (
        <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
            <div style={{ display: 'flex', width: '100%' }}>
                <Window>
                    <TeamChannelHeader />
                    <MessageList />
                    <MessageInput grow overrideSubmitHandler={overrideSubmitHandler} />
                </Window>
                <Thread />
            </div>
        </GiphyContext.Provider>
    );
};

const TeamChannelHeader = () => {
    const { channel, watcher_count } = useChannelStateContext();
    const { client } = useChatContext();

    const getWatcherText = (watchers) => {
        if (!watchers) return 'No users online';
        if (watchers === 1 && channel.type == "team") return '1 user online';
        if (watchers === 1 && channel.type == "messaging") return 'user online';
        return `${watchers} users online`;
    };

    const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
    const additionalMembers = members.length - 3;

    if (channel.type === 'messaging') {
        return (
            <Box>
                {members.map(({ user }, i) => (
                    <AppBar position="static" sx={{bgcolor:'#fff', color:'#000', borderBottom:'1px solid #0000001a', boxShadow:'none'}} >
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                aria-label="menu"
                            >
                                <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                {user.fullName || user.name || user.first_name || user.id} 
                            </Typography>
                            <Button color="inherit">{getWatcherText(watcher_count)}</Button>
                        </Toolbar>
                    </AppBar>
                ))}
            </Box>
        );
    }

    return (
        <Box>
            <AppBar position="static" sx={{boxShadow:'none', bgcolor:'#fff', color:'#000', borderBottom:'1px solid #0000001a'}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        # {channel.data.name}
                    </Typography>
                    <Button color="inherit">{getWatcherText(watcher_count)}</Button>
                    <Button color="inherit"> <ChannelInfo /></Button>
                </Toolbar>
            </AppBar>
        </Box>
    );

};

export default ChannelInner;