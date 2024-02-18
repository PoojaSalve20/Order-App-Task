import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Header from './Header2';

function CreateNewForm({addRow}) {
  const [formData, setFormData] = useState({
    ID: '',
    SHPIIFY: '',
    DATE: '',
    STATUS: '',
    CUSTOMER: '',
    EMAIL: '',
    COUNTRY: '',
    SHIPPING: '',
    SOURCE: '',
    ORDERTYPE: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addRow(formData);
    setFormData({
      ID: '',
      SHPIIFY: '',
      DATE: '',
      STATUS: '',
      CUSTOMER: '',
      EMAIL: '',
      COUNTRY: '',
      SHIPPING: '',
      SOURCE: '',
      ORDERTYPE: '',
    });
  };


  return (
    <>
    
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 600 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="ID"
              name="ID"
              value={formData.ID}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Shpiify"
              name="SHPIIFY"
              value={formData.SHPIIFY}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date"
              name="DATE"
              value={formData.DATE}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Status"
              name="STATUS"
              value={formData.STATUS}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Customer"
              name="CUSTOMER"
              value={formData.CUSTOMER}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="EMAIL"
              value={formData.EMAIL}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Country"
              name="COUNTRY"
              value={formData.COUNTRY}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Shipping"
              name="SHIPPING"
              value={formData.SHIPPING}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Source"
              name="SOURCE"
              value={formData.SOURCE}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Order Type"
              name="ORDERTYPE"
              value={formData.ORDERTYPE}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20 }}>
          Submit
        </Button>
      </form>
    </Box>
    </>
  );
}

export default CreateNewForm;
