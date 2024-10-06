import { Box, FormHelperText, FormLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ModalDialog from './ModalDialog';

const UpdateTaskModal = ({ data, open, onClose }) => {
  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    values: {
      id: data.id,
      title: data.title || '',
      description: data.description || '',
      status: data.status || '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    axios
      .put(`${import.meta.env.VITE_API_URL}/tasks/${data.id}`, data)
      .then(() => {
        onClose();
        reset();
        toast.success('Success!');
      })
      .catch(() => {
        toast.error('Something went wrong!');
      });
  });

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <ModalDialog title="Update task" open={open} onClose={handleClose} onSubmit={onSubmit}>
      <form onSubmit={onSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" flexDirection="column" gap={1}>
            <FormLabel>Title</FormLabel>
            <TextField {...register('title', { required: true })} size="small" />
            {errors.title && <FormHelperText sx={{ color: 'red' }}>This field is required</FormHelperText>}
          </Box>

          <Box display="flex" flexDirection="column" gap={1}>
            <FormLabel>Description</FormLabel>
            <TextField {...register('description', { required: true })} size="small" multiline rows={4} />
            {errors.description && <FormHelperText sx={{ color: 'red' }}>This field is required</FormHelperText>}
          </Box>

          <Box display="flex" flexDirection="column" gap={1}>
            <FormLabel>Status</FormLabel>
            <Select {...register('status', { required: true })} value={watch('status')} size="small">
              <MenuItem value="Incomplete">Incomplete</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </Box>
        </Box>
      </form>
    </ModalDialog>
  );
};

export default UpdateTaskModal;
