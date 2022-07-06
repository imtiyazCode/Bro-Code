import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { List, ListItem, ListItemAvatar, Avatar } from '@mui/material';

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import { FaLaptopCode } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'

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

const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">Bro Code</p>
    </div>
)

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');
}

const ChannelListContent = ({ setIsCreating, setCreateType }) => {
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
                <CompanyHeader />
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
                        />
                    )}
                />
            </div>
        </>
    );
}

const ChannelListContainer = ({ setIsCreating, setCreateType }) => {
    const [toggleContainer, setToggleContainer] = useState(false);

    return (
        <>
            <div className="channel-list__container">
                <ChannelListContent setIsCreating={setIsCreating} setCreateType={setCreateType} />
            </div>

            <div className="channel-list__container-responsive"
                style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff" }}
            >
                <div className="channel-list__container-toggle" >
                </div>
                <ChannelListContent setIsCreating={setIsCreating} setCreateType={setCreateType} />
            </div>
        </>
    )

}

export default ChannelListContainer;