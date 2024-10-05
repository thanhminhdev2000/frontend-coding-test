import { Box, FormHelperText, FormLabel, TextField } from '@mui/material';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ModalDialog from './ModalDialog';

const AddTaskModal = ({ open, onClose }) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    axios
      .post('http://localhost:5000/tasks', { ...data, status: 'Incomplete' })
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
    <ModalDialog title="Add new task" open={open} onClose={handleClose} onSubmit={onSubmit}>
      <form onSubmit={onSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" flexDirection="column" gap={1}>
            <FormLabel>Title</FormLabel>
            <TextField {...register('title', { required: true })} />
            {errors.title && <FormHelperText sx={{ color: 'red' }}>This field is required</FormHelperText>}
          </Box>

          <Box display="flex" flexDirection="column" gap={1}>
            <FormLabel>Description</FormLabel>
            <TextField {...register('description', { required: true })} multiline rows={4} />
            {errors.description && <FormHelperText sx={{ color: 'red' }}>This field is required</FormHelperText>}
          </Box>
        </Box>
      </form>
    </ModalDialog>
  );
};

export default AddTaskModal;
