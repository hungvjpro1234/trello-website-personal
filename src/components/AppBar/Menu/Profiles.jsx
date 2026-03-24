import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'

function Profiles() {
  // Dùng docs có sẵn của Menu trong MUI lib
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 32, height: 32 }}
            alt='avatar'
            src='https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/485803004_1407742610217469_7734979483111841972_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeF1ajy-njt9V93P-mevBX9H7G4AMBD1HD3sbgAwEPUcPZAfEAXAdQH2sWSZjN4RgvM1Ihg1Z3EiZeqRPORAxEmO&_nc_ohc=sBLAOTZ-3PAQ7kNvwF8YC7t&_nc_oc=Adpf5vnoAhNfTiLE601JRQJhX-OVchVoeLHvemHCSkH59Qy4z3Ntq6qQdu6z8_HRt6-xAsdFsfAvBGsijg1WUSEr&_nc_zt=23&_nc_ht=scontent.fhan15-2.fna&_nc_gid=NKdeluq3rH7E0jyZnGQJZQ&_nc_ss=7a32e&oh=00_Afyyd0Y1a-C7x5aQmwHdvk0ibXA6mKo1Bq_b5IOnlHSJ0g&oe=69C7103B'
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-profiles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-profiles'
        }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar sx={{width: 28, height: 28, mr: 2}}/> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar sx={{width: 28, height: 28, mr: 2}}/> My account
        </MenuItem>
        <Divider />
        <MenuItem >
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profiles