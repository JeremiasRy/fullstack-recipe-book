import { useSelector } from 'react-redux'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

const Notification = () => {
  const message = useSelector(state => state.notification)

  if (!message) {
    return null
  }

  if (message.snackbar === true) {
    return (
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} message={message.message} open />
    )
  }
  return (
    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open>
      <Alert severity={message.type} sx={{ width: '100%' }}>{message.message}</Alert>
    </Snackbar>
  )
}

export default Notification
