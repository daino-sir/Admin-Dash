import React from 'react';
import PropTypes, { object } from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { connect } from "react-redux";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

// const user = {
//   avatar: '/static/images/avatars/avatar_6.png',
//   city: 'Nairobi',
//   country: 'Kenya',
//   jobTitle: 'Human Resource Enterprises',
//   name: 'Katarina Mwangi',
//   timezone: 'GMT+3'
// };

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const mapStateToProps = state => {
  return { user: state.customer };
};

const checkIfNull = object =>{
  return (object === undefined || object === null) ? "" : object
}

const Profile = ({ className,user, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src="/static/images/avatars/avatar_6.png"
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.companyName}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${ checkIfNull(user.location)} ${checkIfNull(user.country)}`}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {user.companyType}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

const ProfileNew = connect(mapStateToProps)(Profile);

export default ProfileNew;
