import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useUser } from '@contexts/user.context';

export default function Profile(props) {
    const { user } = useUser()

    return (
        <List
            sx={{
                width: '100%'
            }}
        >
            <ListItem>
                <ListItemText primary="Nama" secondary={user.fullname} />
            </ListItem>
            <Divider component="li" />
            <ListItem>
                <ListItemText primary="Email" secondary={user.email}/>
            </ListItem>
            <Divider component="li" />
            <ListItem>
                <ListItemText primary="Whatsapp" secondary={user.whatsapp} />
            </ListItem>
            <Divider component="li" />
            <ListItem>
                <ListItemText primary="Bahasa" secondary={user.language || ''} />
            </ListItem>
            <Divider component="li" />

        </List>
    )
}