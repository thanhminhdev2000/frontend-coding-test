import { Close } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  padding: 2,
  border: 'none',
  outline: 'none',
};

const ModalDialog = ({ title, open, onClose, onSubmit, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <Box onClick={onClose}>
            <Close sx={{ cursor: 'pointer' }} />
          </Box>
        </Box>

        <Box marginY={2}>{children}</Box>

        <Box display="flex" justifyContent="flex-end" marginTop={3} gap={2}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={onSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalDialog;
