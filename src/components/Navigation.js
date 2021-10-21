import React, {useState} from "react";

//@material-ui
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";


//assets
import Logo1 from "../assets/logo1.svg"
import Logo2 from "../assets/logo2.svg"

//external
import clsx from "clsx"

//internal
import MenuItem from "./MenuItem";
import routes from "../routes";
import { useStyles } from "../styles";


const Navigation = () => {

  const [open, setOpen] = useState(true);
  const classes = useStyles();
  

  return (
    <div>
      
    </div>
  )
}

export default Navigation
