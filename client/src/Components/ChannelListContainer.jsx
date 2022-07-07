import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { List, ListItem, ListItemAvatar, Avatar, Drawer, IconButton } from '@mui/material';

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import { FaLaptopCode } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import {AiOutlineMenuFold} from 'react-icons/ai'

const cookies = new Cookies();

const Sidebar = ({ logout }) => (
    <List sx={{ width: '72px', bgcolor: '#0048c5', height: '100vh', padding: '0' }} >
        <ListItem sx={{ paddingTop: '12px' }}>
            <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#ffffff', width: 44, height: 44, color: '#000', cursor: 'pointer' }}>
                    <FaLaptopCode />
                </Avatar>
            </ListItemAvatar>
        </ListItem>
        <ListItem>
            <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#ffffff', width: 44, height: 44, color: '#000', cursor: 'pointer' }} onClick={logout}>
                    <FiLogOut />
                </Avatar>
            </ListItemAvatar>
        </ListItem>
    </List>
);

const CompanyHeader = ({setOpenDrawer}) => {
    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };
    
    return (
    <div className="channel-list__header">
        <p className="channel-list__header__text">Bro Code</p>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerClose}
            edge="start"
            sx={{ mr: 2, display: { sm: 'flex', md: 'none' } }}
        >
            <AiOutlineMenuFold color='#fff'/>
        </IconButton>
    </div>
)}

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');
}

const ChannelListContent = ({ setIsCreating, setCreateType, setOpenDrawer }) => {
    const { client } = useChatContext();

    const logout = () => {
        cookies.remove("token");
        cookies.remove('userId');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNumber');

        window.location.reload();
    }

    const filters = { members: { $in: [client.userID] } };

    return (
        <>
            <Sidebar logout={logout} />
            <div className="channel-list__list__wrapper">
                <CompanyHeader setOpenDrawer={setOpenDrawer}/>
                <ChannelSearch />
                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={customChannelTeamFilter}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type="team"
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            type="team"
                            setOpenDrawer={setOpenDrawer}
                        />
                    )}
                />
                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={customChannelMessagingFilter}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type="messaging"
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            type="messaging"
                            setOpenDrawer={setOpenDrawer}
                        />
                    )}
                />
            </div>
        </>
    );
}

const ChannelListContainer = ({ setIsCreating, setCreateType, openDrawer, setOpenDrawer }) => {

    return (
        <>
            <div className="channel-list__container">
                <ChannelListContent setIsCreating={setIsCreating} setCreateType={setCreateType} />
            </div>


            <div className="channel-list__drawer-responsive">
                <Drawer 
                    variant='persistent'
                    anchor="left"
                    open={openDrawer}
                >
                    <div className="channel-list__container-responsive">
                        <ChannelListContent setIsCreating={setIsCreating} setCreateType={setCreateType} setOpenDrawer={setOpenDrawer} />
                    </div>
                </Drawer>
            </div>
        </>
    )

}

export default ChannelListContainer;