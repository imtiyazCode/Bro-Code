import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

const TeamChannelPreview = ({type}) => {

    const { channel, client } = useChatContext();

    const ChannelPreview = () => (
        <p className='channel-preview_item'>
            # {channel?.data?.name || channel?.data?.id}
        </p>
    );

    const DirectPreview = () => {
        const member = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
        return (
            <div className="channel-preview_item single">
                <Avatar
                    image={member[0]?.user?.image}
                    name={member[0]?.user?.fullName}
                    size={24}
                />
                <p>{member[0]?.user?.fullName || member[0]?.user?.name || member[0]?.user?.first_name || member[0]?.user?.id}</p>
            </div>
        )
    }

    return (
        <div>
            {type === "team" ? <ChannelPreview /> : <DirectPreview />}
        </div>
    )
}

export default TeamChannelPreview