import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { connect ,  useDispatch } from "react-redux";
import { addEmployeeList,addTotalRecieved,addTotalRecipient,
  addPercentageDiff,addTotalBalance,addCustomer } from "src/js/actions/index";
  import {RegisterUrl} from "src/js/constants/apiurls";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const mapDispatchToProps = (dispatch) =>{
  return {
    addEmployeeList: employeeList => dispatch(addEmployeeList(employeeList)),
    addTotalRecieved: totalRecieved => dispatch(addTotalRecieved(totalRecieved)),
    addTotalRecipient: totalRecipient => dispatch(addTotalRecipient(totalRecipient)),
    addPercentageDiff: percentageDiff => dispatch(addPercentageDiff(percentageDiff)),
    addTotalBalance: totalBalance => dispatch(addTotalBalance(totalBalance)),
    addCustomer: customer => dispatch(addCustomer(customer))
  }
}

const ConnectedForm = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              companyEmail: '',
              companyName: '',
              companyCountry: '',
              password: '',
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                companyEmail: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                companyName: Yup.string().max(255).required('Company name is required'),
                companyCountry: Yup.string().max(255).required('Last name is required'),
                password: Yup.string().max(255).required('password is required'),
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })
            }

            onSubmit={(event) => {
              const apiUrl = RegisterUrl;

              fetch(apiUrl,{
                method:'post',
                headers: { 
                  'Accept': 'application/json',
                  'Content-Type': 'application/json' },
                body:JSON.stringify({
                  companyName:event.companyName,
                  email:event.companyEmail,
                  country:event.companyCountry,
                  password:event.password
                })
              })
                .then((response) => {
                  console.log(response.status);
                  response.json()
                })
                .then((data) =>{
                  console.log('This is your data', data)
                  dispatch(addCustomer(data))
                  navigate('/app/dashboard', { replace: true });
                });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use the company email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.companyName && errors.companyName)}
                  fullWidth
                  helperText={touched.companyName && errors.companyName}
                  label="Company Name"
                  margin="normal"
                  name="companyName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.companyName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.companyCountry && errors.companyCountry)}
                  fullWidth
                  helperText={touched.companyCountry && errors.companyCountry}
                  label="Country"
                  margin="normal"
                  name="companyCountry"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.companyCountry}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.companyEmail && errors.companyEmail)}
                  fullWidth
                  helperText={touched.companyEmail && errors.companyEmail}
                  label="Company Email Address"
                  margin="normal"
                  name="companyEmail"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.companyEmail}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box
                  alignItems="center"
                  display="flex"
                  ml={-1}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

const RegisterView = connect(
  null,
  mapDispatchToProps
)(ConnectedForm);

export default RegisterView;
