import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, Typography, Grid, Box, styled } from '@mui/material'
import { ChannelList, useChatContext } from 'stream-chat-react';

import { FiLogOut } from 'react-icons/fi';
import { FaLaptopCode } from 'react-icons/fa'

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';

const SidebarMenuContainer = styled(List)(()=>({
    width: '72px',
    backgroundColor: '#0048c5',
    height: '100vh',
    padding: '0'
}))

const SidebarAvatar = styled(Avatar)(() => ({
    backgroundColor: 'white',
    width: 44,
    height: 44,
    color: '#000',
    cursor: 'pointer'
}))

const HeaderTypography = styled(Typography)(() => ({
    fontFamily: 'Helvetica Neue, sans-serif',
    fontWeight: 'bold',
    lineHeight: '28px',
    fontSize: '18px',
    color: "#fff"
}))

const ChannelListWrapper = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    width: '240px',
    backgroundColor:'#005fff',
}))

const Sidebar = () => (
    <SidebarMenuContainer >
        <ListItem sx={{ paddingTop: '12px' }}>
            <ListItemAvatar>
                <SidebarAvatar >
                    <FaLaptopCode />
                </SidebarAvatar>
            </ListItemAvatar>
        </ListItem>
        <ListItem>
            <ListItemAvatar>
                <SidebarAvatar>
                    <FiLogOut />
                </SidebarAvatar>
            </ListItemAvatar>
        </ListItem>
    </SidebarMenuContainer>
)

const CompanyHeader = () => (
    <Box display='flex' alignItems="center" height={62} paddingLeft='16px'>
        <HeaderTypography variant="h1" component="p">
            Bro Code
        </HeaderTypography>
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
        <Grid container sx={{maxHeight: '100%'}}>
            <Grid item xs="auto" height='100%'>
                <Sidebar />
            </Grid>
            <ChannelListWrapper item xs="auto" sx={{maxHeight: '100vh', bgcolor:'#005fff'}}>
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
                            {...previewProps} />
                    }}
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
                            {...previewProps} />
                    }}
                />
            </ChannelListWrapper>
        </Grid>
    )
}


const ChannelListContainer = () => {
    return (
        <ChannelListContent />
    )
}

export default ChannelListContainer