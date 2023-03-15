import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
// import Avatar from '@mui/material/Avatar';
// import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LanguageIcon from '@mui/icons-material/Language';
import Divider from '@mui/material/Divider';
// import Typography from '@mui/material/Typography';
// import { useUser } from '@contexts/user.context';
import { useSession } from 'next-auth/react';

export default function Profile(props) {
    // const { user } = useUser()
    const { data: session } = useSession()

    return (
        <>
            {session && (
                <List
                    sx={{
                        width: '100%'
                    }}
                >
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <BadgeIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Nama" secondary={session.user?.fullname} />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <EmailIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Email" secondary={session.user?.email} />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <WhatsAppIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Whatsapp" secondary={session.user?.whatsapp} />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <AdminPanelSettingsIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Role" secondary={session.user?.role} />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <LanguageIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Bahasa" secondary={session.user?.language || ''} />
                    </ListItem>
                    <Divider component="li" />

                </List>
            )}
        </>
    )
}