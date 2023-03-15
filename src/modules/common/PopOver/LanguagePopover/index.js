import { useState, useEffect } from 'react';
// import theme from 'src/theme';
import Router from 'next/router'
import { useSession } from 'next-auth/react';

// @mui
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material';
import Image from 'next/image';

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/flag-uk.svg',
  },
  {
    value: 'de',
    label: 'German',
    icon: '/assets/icons/flag-de.svg',
  },
  {
    value: 'id',
    label: 'Indonesian',
    icon: '/assets/icons/flag-id.svg',
  },
  {
    value: 'nl',
    label: 'Netherlands',
    icon: '/assets/icons/flag-nl.svg',
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const [open, setOpen] = useState(null);
  const { data: session } = useSession()
  const [ selectedLang, setSelectedLang ] = useState(LANGS[0])
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (e, lang) => {
    // console.log(lang)
    // console.log(lang === LANGS[0].value)
    Router.push([],[],{ locale: lang })

    const temp = LANGS.filter(lgs => lgs.value === lang)
    setSelectedLang(temp[0])
    setOpen(null);
  };

  // useEffect(() => {
  //   console.log(selectedLang)
  // }, [selectedLang])

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 30,
          height: 30,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <Image src={selectedLang.icon} alt={selectedLang.label} width={30} height={30}/>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem key={option.value} selected={option.value === selectedLang.value} value={option.value} onClick={(e) => handleClose(e, option.value)}>
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />

              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}