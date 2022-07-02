import React from 'react'

const TeamChannelList = ({error=false, loading, children, type}) => {

    if (error) {
        return type === 'team' ? (
            <div className='team-channel-list'>
                <p className="team-channel-list_message">
                    Connection error, please wait a moment and try again.
                </p>
            </div>
        ) : null
    }

    if (loading) {
        return (
            <div className='team-channel-list'>
                <p className="team-channel-list_message loading">
                    {type === 'team' ? 'Channels' : 'Messages'} loading...
                </p>
            </div>
        )
    }

    return (
        <div className='team-channel-list'>
            <div className="team-channel-list_header">
                <p className="team-channel-list_header_title">
                    {type === 'team' ? 'Channels' : ' Direct Messages'}
                </p>
            </div>
            {children}
        </div>
    )
}

export default TeamChannelList