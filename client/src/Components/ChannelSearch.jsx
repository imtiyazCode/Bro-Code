import React, { useState } from 'react';
import { Box, TextField, InputAdornment } from '@mui/material'
import { BsSearch } from 'react-icons/bs'


const ChannelSearch = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const getChannel = (text) =>{
        //TODO: fetch channel from stream server
    }

    const onSearch = (e) => {
        e.preventDefault();

        setLoading(true);
        setQuery(e.target.value);
        getChannel(e.target.value);
    }

    return (
        <div style={{paddingTop:'16px', borderTop:"1px solid #00000033"}}>
            <Box sx={{ margin: '4px', bgcolor: '#ffffff33', borderRadius: '5px' }}>
                <TextField
                    id="outlined-start-adornment"
                    color='white'
                    size="small"
                    value={query}
                    onChange={onSearch}
                    placeholder={"Search..."}
                    sx={{
                        '& #outlined-start-adornment':{
                            color: '#ffffff'
                        }
                    }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><BsSearch color='#fff' width="44px" height="44px" /></InputAdornment>,
                    }}
                />
            </Box>
        </div>
    )
}

export default ChannelSearch