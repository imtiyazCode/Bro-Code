import React from 'react';
import { Box, styled, Typography, Avatar } from '@mui/material';
import { useChatContext } from 'stream-chat-react';

const ResultDropdownContainer = styled(Box)(() => ({
    position: 'absolute',
    height: 'fit-content',
    width: '300px',
    background: '#fff',
    border: '1px solid #e9e9ea',
    boxSizing: 'border-box',
    borderRadius: '8px',
    zIndex: '10',
    left: '230px',
    top: '10px'
}))

const ResultHeader = styled(Typography)(() => ({
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Helvetica Neue, sans-serif',
    fontSize: '14px',
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: '120%',
    marginLeft: '12px',
    color: ' #858688',
}))

const searchResultFocused = {
    width: '100%',
    height: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    background: '#005fff1a'
}
const searchResult = {
    width: '100%',
    height: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    "&:hover": {
        background: '#005fff1a',
        cursor: 'pointer'
    }
}
const ResultTypo = styled(Typography)(() => ({
    width: '100%',
    fontFamily: 'Helvetica Neue, sans-serif',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '120%',
    color: '#2c2c30',
}))


const SearchResult = ({ channel, focusedId, type, setChannel, setToggleContainer }) => {
    const { client, setActiveChannel } = useChatContext();

    if (type === 'channel') {
        return (
            <Box style={ focusedId === channel.id ? searchResultFocused : searchResult }>
                <Avatar children="#" sx={{ height: '24px', width: '24px', bgcolor: '#005fff', fontSize: '14px', margin: '5px 12px' }} />
                <ResultTypo>{channel.data.name}</ResultTypo>
            </Box>
        )
    }
    return (
        <div>
            Found
        </div>
    )
}

const ResultDropdown = ({ teamChannels, directChannels, focusedId, loading, setChannel, setToggleContainer }) => {
    return (
        <ResultDropdownContainer>
            <ResultHeader>Channels</ResultHeader>
            {loading && !teamChannels.length && (
                <ResultHeader>
                    <i style={{ fontWeight: 'normal', marginLeft: '12px' }}>Loading...</i>
                </ResultHeader>
            )}
            {!loading && !teamChannels.length ?
                (<ResultHeader> No Channels Found </ResultHeader>
                ) : (
                    teamChannels?.map((channel, i) => (
                        <SearchResult
                            channel={channel}
                            focusedId={focusedId}
                            key={i}
                            setChannel={setChannel}
                            type='channel'
                            setToggleContainer={setToggleContainer}
                        />
                    ))
                )
            }
            <ResultHeader>Users</ResultHeader>
            {loading && !directChannels.length && (
                <ResultHeader>
                    <i style={{ fontWeight: 'normal', marginLeft: '12px' }}>Loading...</i>
                </ResultHeader>
            )}
            {!loading && !directChannels.length ?
                (<ResultHeader> No direct messages found </ResultHeader>
                ) : (
                    <SearchResult />
                )
            }
        </ResultDropdownContainer>
    )
}

export default ResultDropdown