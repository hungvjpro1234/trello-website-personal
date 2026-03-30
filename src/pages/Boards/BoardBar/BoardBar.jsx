// Board Bar component trong trang Board ( hầu như chỉ sử dụng ở trang Board nên tách ra thành component bên trong page)
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatters'

// style dùng chung của các item trên thanh Board Bar
const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar({ board }) {
  return (
    /* Board Bar */
    <Box sx={{
      width: '100%',
      // Dùng bản sử dụng tạo ra bộ cơ sở trên theme.js
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingX: 2,
      gap: 2,
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      overflowX: 'auto',
      '&::-webkit-scrollbar-track': { m: 2 }
    }}>
      {/* Khối sider left : menu */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx = { MENU_STYLES }
          icon={<DashboardIcon />}
          label={ board?.title }
          clickable
        />

        <Chip
          sx = { MENU_STYLES }
          icon={<VpnLockIcon />}
          // Không cần thiết phải kiểm tra kiểu dữ liệu của board?.type vì trong mockData đã đảm bảo rằng type luôn tồn tại và có giá trị hợp lệ ('public' hoặc 'private').
          label={ capitalizeFirstLetter(board?.type) }
          clickable
        />

        <Chip
          sx = { MENU_STYLES }
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
        />

        <Chip
          sx = { MENU_STYLES }
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />

        <Chip
          sx = { MENU_STYLES }
          icon={<FilterListIcon />}
          label="Filters"
          clickable
        />
      </Box>

      {/* Khối sider right : Button invite và avatars */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon= {<PersonAddIcon />}
          sx= {{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white'
            }
          }}
        >
          Invite
        </Button>

        <AvatarGroup
          max= {7}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              border: 'none',
              cursor: 'pointer',
              color: 'white',
              '&:first-of-type': {
                bgcolor: '#a4b0be'
              }
            }
          }}
        >
          <Tooltip title= "manhung">
            <Avatar
              alt="manhung"
              src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/485803004_1407742610217469_7734979483111841972_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeF1ajy-njt9V93P-mevBX9H7G4AMBD1HD3sbgAwEPUcPZAfEAXAdQH2sWSZjN4RgvM1Ihg1Z3EiZeqRPORAxEmO&_nc_ohc=sBLAOTZ-3PAQ7kNvwF8YC7t&_nc_oc=Adpf5vnoAhNfTiLE601JRQJhX-OVchVoeLHvemHCSkH59Qy4z3Ntq6qQdu6z8_HRt6-xAsdFsfAvBGsijg1WUSEr&_nc_zt=23&_nc_ht=scontent.fhan15-2.fna&_nc_gid=NKdeluq3rH7E0jyZnGQJZQ&_nc_ss=7a32e&oh=00_Afyyd0Y1a-C7x5aQmwHdvk0ibXA6mKo1Bq_b5IOnlHSJ0g&oe=69C7103B"
            />
          </Tooltip>
          <Tooltip title= "manhung">
            <Avatar
              alt="manhung"
              src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/485803004_1407742610217469_7734979483111841972_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeF1ajy-njt9V93P-mevBX9H7G4AMBD1HD3sbgAwEPUcPZAfEAXAdQH2sWSZjN4RgvM1Ihg1Z3EiZeqRPORAxEmO&_nc_ohc=sBLAOTZ-3PAQ7kNvwF8YC7t&_nc_oc=Adpf5vnoAhNfTiLE601JRQJhX-OVchVoeLHvemHCSkH59Qy4z3Ntq6qQdu6z8_HRt6-xAsdFsfAvBGsijg1WUSEr&_nc_zt=23&_nc_ht=scontent.fhan15-2.fna&_nc_gid=NKdeluq3rH7E0jyZnGQJZQ&_nc_ss=7a32e&oh=00_Afyyd0Y1a-C7x5aQmwHdvk0ibXA6mKo1Bq_b5IOnlHSJ0g&oe=69C7103B"
            />
          </Tooltip>
          <Tooltip title= "manhung">
            <Avatar
              alt="manhung"
              src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/485803004_1407742610217469_7734979483111841972_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeF1ajy-njt9V93P-mevBX9H7G4AMBD1HD3sbgAwEPUcPZAfEAXAdQH2sWSZjN4RgvM1Ihg1Z3EiZeqRPORAxEmO&_nc_ohc=sBLAOTZ-3PAQ7kNvwF8YC7t&_nc_oc=Adpf5vnoAhNfTiLE601JRQJhX-OVchVoeLHvemHCSkH59Qy4z3Ntq6qQdu6z8_HRt6-xAsdFsfAvBGsijg1WUSEr&_nc_zt=23&_nc_ht=scontent.fhan15-2.fna&_nc_gid=NKdeluq3rH7E0jyZnGQJZQ&_nc_ss=7a32e&oh=00_Afyyd0Y1a-C7x5aQmwHdvk0ibXA6mKo1Bq_b5IOnlHSJ0g&oe=69C7103B"
            />
          </Tooltip>
          <Tooltip title= "manhung">
            <Avatar
              alt="manhung"
              src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/485803004_1407742610217469_7734979483111841972_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeF1ajy-njt9V93P-mevBX9H7G4AMBD1HD3sbgAwEPUcPZAfEAXAdQH2sWSZjN4RgvM1Ihg1Z3EiZeqRPORAxEmO&_nc_ohc=sBLAOTZ-3PAQ7kNvwF8YC7t&_nc_oc=Adpf5vnoAhNfTiLE601JRQJhX-OVchVoeLHvemHCSkH59Qy4z3Ntq6qQdu6z8_HRt6-xAsdFsfAvBGsijg1WUSEr&_nc_zt=23&_nc_ht=scontent.fhan15-2.fna&_nc_gid=NKdeluq3rH7E0jyZnGQJZQ&_nc_ss=7a32e&oh=00_Afyyd0Y1a-C7x5aQmwHdvk0ibXA6mKo1Bq_b5IOnlHSJ0g&oe=69C7103B"
            />
          </Tooltip>
          <Tooltip title= "manhung">
            <Avatar
              alt="manhung"
              src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/485803004_1407742610217469_7734979483111841972_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeF1ajy-njt9V93P-mevBX9H7G4AMBD1HD3sbgAwEPUcPZAfEAXAdQH2sWSZjN4RgvM1Ihg1Z3EiZeqRPORAxEmO&_nc_ohc=sBLAOTZ-3PAQ7kNvwF8YC7t&_nc_oc=Adpf5vnoAhNfTiLE601JRQJhX-OVchVoeLHvemHCSkH59Qy4z3Ntq6qQdu6z8_HRt6-xAsdFsfAvBGsijg1WUSEr&_nc_zt=23&_nc_ht=scontent.fhan15-2.fna&_nc_gid=NKdeluq3rH7E0jyZnGQJZQ&_nc_ss=7a32e&oh=00_Afyyd0Y1a-C7x5aQmwHdvk0ibXA6mKo1Bq_b5IOnlHSJ0g&oe=69C7103B"
            />
          </Tooltip>

          <Tooltip title= "manhung">
            <Avatar
              alt="manhung"
              src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/485803004_1407742610217469_7734979483111841972_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeF1ajy-njt9V93P-mevBX9H7G4AMBD1HD3sbgAwEPUcPZAfEAXAdQH2sWSZjN4RgvM1Ihg1Z3EiZeqRPORAxEmO&_nc_ohc=sBLAOTZ-3PAQ7kNvwF8YC7t&_nc_oc=Adpf5vnoAhNfTiLE601JRQJhX-OVchVoeLHvemHCSkH59Qy4z3Ntq6qQdu6z8_HRt6-xAsdFsfAvBGsijg1WUSEr&_nc_zt=23&_nc_ht=scontent.fhan15-2.fna&_nc_gid=NKdeluq3rH7E0jyZnGQJZQ&_nc_ss=7a32e&oh=00_Afyyd0Y1a-C7x5aQmwHdvk0ibXA6mKo1Bq_b5IOnlHSJ0g&oe=69C7103B"
            />
          </Tooltip>

          <Tooltip title= "manhung">
            <Avatar
              alt="manhung"
              src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/485803004_1407742610217469_7734979483111841972_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeF1ajy-njt9V93P-mevBX9H7G4AMBD1HD3sbgAwEPUcPZAfEAXAdQH2sWSZjN4RgvM1Ihg1Z3EiZeqRPORAxEmO&_nc_ohc=sBLAOTZ-3PAQ7kNvwF8YC7t&_nc_oc=Adpf5vnoAhNfTiLE601JRQJhX-OVchVoeLHvemHCSkH59Qy4z3Ntq6qQdu6z8_HRt6-xAsdFsfAvBGsijg1WUSEr&_nc_zt=23&_nc_ht=scontent.fhan15-2.fna&_nc_gid=NKdeluq3rH7E0jyZnGQJZQ&_nc_ss=7a32e&oh=00_Afyyd0Y1a-C7x5aQmwHdvk0ibXA6mKo1Bq_b5IOnlHSJ0g&oe=69C7103B"
            />
          </Tooltip>

          <Tooltip title= "manhung">
            <Avatar
              alt="manhung"
              src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/485803004_1407742610217469_7734979483111841972_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeF1ajy-njt9V93P-mevBX9H7G4AMBD1HD3sbgAwEPUcPZAfEAXAdQH2sWSZjN4RgvM1Ihg1Z3EiZeqRPORAxEmO&_nc_ohc=sBLAOTZ-3PAQ7kNvwF8YC7t&_nc_oc=Adpf5vnoAhNfTiLE601JRQJhX-OVchVoeLHvemHCSkH59Qy4z3Ntq6qQdu6z8_HRt6-xAsdFsfAvBGsijg1WUSEr&_nc_zt=23&_nc_ht=scontent.fhan15-2.fna&_nc_gid=NKdeluq3rH7E0jyZnGQJZQ&_nc_ss=7a32e&oh=00_Afyyd0Y1a-C7x5aQmwHdvk0ibXA6mKo1Bq_b5IOnlHSJ0g&oe=69C7103B"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar

// L2 : Object destructuring : là một tính năng của JavaScript cho phép bạn trích xuất các giá trị từ một đối tượng và gán chúng cho các biến riêng biệt một cách dễ dàng và ngắn gọn hơn. Cú pháp của object destructuring sử dụng dấu ngoặc nhọn {} để chỉ định các thuộc tính mà bạn muốn trích xuất từ đối tượng.
// Ví dụ: BoardBar({ board }) có thể được viết lại thành:
// const BoardBar(props)
// const { board } = props; để trích xuất giá trị của board từ props.
// Tuy nhiên, bằng cách sử dụng object destructuring trực tiếp trong tham số của hàm, bạn có thể viết ngắn gọn hơn và tránh phải tạo thêm một biến trung gian props.