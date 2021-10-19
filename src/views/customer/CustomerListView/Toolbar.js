import { useNavigate } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  RaisedButton
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import axios from 'axios';
import { connect ,  useDispatch } from "react-redux";
import {concatEmployeeList, addEmployeeList } from "src/js/actions/index";
import {ExportEmployeeAirtimeListUrl} from "src/js/constants/apiurls"

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const mapDispatchToProps = (dispatch) =>{
  return {
    addEmployeeList: employeeList => dispatch(addEmployeeList(employeeList)),
    concatEmployeeList:employeeList => dispatch(concatEmployeeList(employeeList))
  }
}

const mapStateToProps = state => {
  return { customer: state.customer };
};

const Toolbar = ({ className,customer, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeHandler = (event, actionType) => {
    event.preventDefault()

    console.log(event.target.files[0])

    var formData = new FormData();
    formData.append("companyId",customer.companyId);
    formData.append("file", event.target.files[0]);

    console.log(formData)
    
    axios.post(ExportEmployeeAirtimeListUrl, formData, { 
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    .then(res => {
      console.log(res.statusText)
      console.log(res.data)

      if(actionType === "ADD_CUSTOMER"){
        dispatch(concatEmployeeList(res.data))
      }else if (actionType === "REPLACE_CUSTOMER" ){
        dispatch(addEmployeeList(res.data))
      }

      navigate('/app/customers', { replace: true });
      console.log("navigated")
    })

  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <input
        accept="/xlsx*"
        className={classes.input}
        id="contained-button-file-1"
        multiple
        type="file"
        style={{ display: "none" }}
        onChange={(e)=>{onChangeHandler(e,"ADD_CUSTOMER")}}
      />
      
      <input
        accept="/xlsx*"
        className={classes.input}
        id="contained-button-file-2"
        multiple
        type="file"
        style={{ display: "none" }}
        onChange={(e)=>{onChangeHandler(e,"REPLACE_CUSTOMER")}}
      />

      <label htmlFor="contained-button-file-1">
        <Button className={classes.importButton} variant="contained" color="primary" component="span" >
          Add Customers
        </Button>
      </label>
      
      <label htmlFor="contained-button-file-2">
        <Button className={classes.exportButton} variant="contained" color="primary" component="span">
        Replace Customers 
        </Button>
      </label>

        {/* <Button className={classes.importButton} type="file" onChange={onChangeHandler}>
        <input
            type="file"
            style={{ display: "none" }}
          />
          Add Customers
        </Button> */}
{/* 
        <Button className={classes.exportButton} type ="file" onChange={onChangeHandler}>
          <input
            type="file"
            style={{ display: "none" }}
          />
          Replace Customers 
        </Button> */}
        <Button
          color="primary"
          variant="contained"
        >
          Add customer
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search customer"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

const NewToolBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);

export default NewToolBar;
