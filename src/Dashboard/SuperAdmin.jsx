import { Box, Button, Card, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';
const SuperAdmin = () => {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchClinics = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await axios.get("http://localhost:3001/clinics");
      console.log("dataa: ", response.data)
      setClinics(response.data);
    } catch (error) {
      console.error("Failed to fetch clinics:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchClinics();
  }, []);

  if (loading) return <p>Loading clinics...</p>;
  if (error) return <p>Something went wrong while fetching clinics.</p>;
  return (
    <Box p={3} sx={{ maxWidth: 1600, margin: '0 auto' }}>
      <Card elevation={2} sx={{ mb: 3, p: 2, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Clinics Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          View and Manage all Clinics  details
        </Typography>
      </Card>

      {/* search container */}

      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          sx={{ width: '400px', ml: '30px' }}
          label="Search Admins"
          variant="outlined"
          size="small"
          // value={searchQuery}
          // onChange={handleSearchChange}
          placeholder="Search by Company, name, phone, email"
        />
        <Button
          variant="contained"
          startIcon={<AddBoxIcon />}
          sx={{ mr: '30px' }}
        // onClick={handleAddClick}
        >
          Add
        </Button>
      </Box>

      {/* table  */}

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.04)' }}>
              <TableCell align="center"><strong>sl</strong></TableCell>
              <TableCell align="center"><strong> Name</strong></TableCell>
              <TableCell align="center"><strong> email</strong></TableCell>
              <TableCell align="center"><strong> Phone</strong></TableCell>
              <TableCell align="center"><strong>Clinic name</strong></TableCell>
              <TableCell align="center"><strong>Clinic phone</strong></TableCell>
              <TableCell align="center"><strong>Clinic email</strong></TableCell>
               <TableCell align="center"><strong>address</strong></TableCell>
              <TableCell align="center"><strong>status</strong></TableCell>
              <TableCell align="center"><strong>edit</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              clinics.length > 0 ? (
                clinics.map((clinic, index) => (
                  <TableRow key={clinic.id}>
                    <TableCell align="center" >{index + 1}</TableCell>
                    <TableCell align="center" >{clinic?.name || "default"}</TableCell>
                    <TableCell align="center" >{ clinic?.email || "default"}</TableCell>
                    <TableCell align="center" >{ clinic?.phone || "default"}</TableCell>
                    <TableCell align="center" >{ clinic?.clinicName || "default"}</TableCell>
                    <TableCell align="center" >{ clinic?.clinicEmail || "default"}</TableCell>
                    <TableCell align="center" >{ clinic?.clinicPhoneNo || "default"}</TableCell>
                    <TableCell align="center" >{ clinic?.address || "default"}</TableCell>
                    <TableCell align="center" ><IconButton aria-label='status'>
                      {clinic.isActive ? <ToggleOnOutlinedIcon fontSize='large' sx={{color:"green"}}  /> : <ToggleOffOutlinedIcon color='error' fontSize='large' /> }
                    </IconButton>
                     </TableCell>
                    <TableCell align="center">
                      <IconButton aria-label='edit'>
                        <EditOutlinedIcon fontSize='medium' color='secondary' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" color="text.secondary" py={3}>
                    No clinics Found
                  </Typography>
                </TableCell>
              </TableRow>
              )
            } 

          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default SuperAdmin