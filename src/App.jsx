import { Check, Close } from '@mui/icons-material';
import {
  Box,
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddTaskModal from './components/AddTaskModal';
import UpdateTaskModal from './components/UpdateTaskModal';

const App = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const handleOpenUpdateModal = (rowData) => {
    setOpenUpdateModal(true);
    setRowData(rowData);
  };
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);
  const [rowData, setRowData] = useState({});

  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('*');

  const getListData = useCallback(async () => {
    let response;

    if (status != '*') {
      response = await axios.get(`http://localhost:5000/tasks?status=${status}`);
    } else {
      response = await axios.get('http://localhost:5000/tasks');
    }
    setTasks(response.data);
  }, [status]);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`).then(() => {
      toast.success('Success!');
      getListData();
    });
  };

  useEffect(() => {
    getListData();
  }, [openAddModal, openUpdateModal, status, getListData]);

  return (
    <>
      <Container maxWidth="md">
        <Typography align="center" variant="h4" marginTop={5}>
          Task Management
        </Typography>

        <Box display="flex" justifyContent="space-between" marginY={5}>
          <Button variant="contained" onClick={handleOpenAddModal}>
            Add Task
          </Button>

          <Select sx={{ width: 200 }} value={status} onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="*">All</MenuItem>
            <MenuItem value="Incomplete">Incomplete</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </Box>

        <TableContainer sx={{ border: '1px solid #ccc' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tasks.map((row, index) => (
                <TableRow key={row.id} onClick={() => handleOpenUpdateModal(row)}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      {row.status == 'Incomplete' ? (
                        <>
                          <Close />
                          {row.status}
                        </>
                      ) : (
                        <>
                          <Check />
                          {row.status}
                        </>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(row.id);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {tasks.length == 0 && (
            <Box height={100} display="flex" justifyContent="center" alignItems="center">
              <Typography>No data</Typography>
            </Box>
          )}
        </TableContainer>

        <AddTaskModal open={openAddModal} onClose={handleCloseAddModal} />

        <UpdateTaskModal data={rowData} open={openUpdateModal} onClose={handleCloseUpdateModal} />

        <ToastContainer />
      </Container>
    </>
  );
};

export default App;
