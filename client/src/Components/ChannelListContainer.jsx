import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, Typography, Grid, Box } from '@mui/material'
import { ChannelList, useChatContext } from 'stream-chat-react';

import { FiLogOut } from 'react-icons/fi';
import { FaLaptopCode } from 'react-icons/fa'

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './'

const Sidebar = () => (
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
                <Avatar sx={{ bgcolor: '#ffffff', width: 44, height: 44, color: '#000', cursor: 'pointer' }}>
                    <FiLogOut />
                </Avatar>
            </ListItemAvatar>
        </ListItem>
    </List>
)

const CompanyHeader = () => (
    <Box display='flex' alignItems="center" height={62} paddingLeft='16px'>
        <Typography variant="h1" component="p" sx={{ fontFamily: 'Helvetica Neue, sans-serif', fontWeight: 'bold', lineHeight: '28px', fontSize: '18px', color: "#fff" }}>
            Bro Code
        </Typography>
    </Box>
)

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');
}


const ChannelListContent = () => {

    const { client } = useChatContext();

    const filters = { members: { $in: [client.userID] } };

    return (
        <Grid container height='100%'>
            <Grid item xs="auto" height='100%'>
                <Sidebar />
            </Grid>
            <Box item xs
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '240px',
                    bgcolor: '#005fff'
                }}
            >
                <CompanyHeader />
                <ChannelSearch />
                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={customChannelTeamFilter}
                    List={(listProps) => {
                        <TeamChannelList
                            {...listProps}
                            type="team" />
                    }}
                    Preview={(previewProps) => {
                    <TeamChannelPreview 
                        {...previewProps}/> }}
                />
                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={customChannelMessagingFilter}
                    List={(listProps) => {
                        <TeamChannelList
                            {...listProps}
                            type="messaging" />
                    }}
                    Preview={(previewProps) => { 
                    <TeamChannelPreview 
                        {...previewProps}/> }}
                />
            </Box>
        </Grid>
    )
}


const ChannelListContainer = () => {
    return (
        <ChannelListContent />
    )
}

export default ChannelListContainer