import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { connect, useDispatch } from "react-redux";
import { addCustomer } from 'src/js/actions';
import {UpdateCompanyProfileUrl} from 'src/js/constants/apiurls'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

const states = [
  {
    value: 'alabama',
    label: 'Nairobi'
  },
  {
    value: 'new-york',
    label: 'Kisumu'
  },
  {
    value: 'san-francisco',
    label: 'Coast'
  }
];

const useStyles = makeStyles(() => ({
  root: {}
}));

const mapStateToProps = state => {
  return { customer: state.customer };
};

const mapDispatchToProps = (dispatch) =>{
  return {
    addCustomer: customer => dispatch(addCustomer(customer))
  }
}

const ProfileDetails = ({ className, customer, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [values, setValues] = useState({
    companyId : customer.companyId,
    companyName: customer.companyName,
    companyType: customer.companyType,
    email: customer.email,
    phoneNumber: customer.phoneNumber,
    location: customer.location,
    country: customer.country
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) =>{
    event.preventDefault()

    const profile = {}    
    profile["companyId"] = values.companyId;
    profile["companyName"] = values.companyName;
    profile["companyType"] = values.companyType;
    profile["email"] = values.email;
    profile["phoneNumber"] = values.phoneNumber;
    profile["location"] = values.location;
    profile["country"] = values.country;
    console.log(profile)

    axios.post(UpdateCompanyProfileUrl,profile)
      .then(response =>{
        console.log('This is your data', response.data)
        dispatch(addCustomer(response.data))
        navigate('/app/account', { replace: true });
      })
  }

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Company Name"
                name="companyName"
                onChange={handleChange}
                required
                value={values.companyName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Company Type"
                name="companyType"
                onChange={handleChange}
                required
                value={values.companyType}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                onChange={handleChange}
                type="number"
                value={values.phoneNumber}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select Location"
                name="location"
                required
                select
                SelectProps={{ native: true }}
                value={values.location}
                variant="outlined"
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    onChange={handleChange}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileDetails);

export default Profile;
