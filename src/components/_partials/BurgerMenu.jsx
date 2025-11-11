import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import {Typography} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import * as React from 'react';
import { NavLink } from "react-router-dom";

export default function BurgerMenu({ type = 'default', children, ...props }) {
  return (
    <>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <Avatar variant="contained" {...bindTrigger(popupState)}>
              {children}
            </Avatar>
            <Menu {...bindMenu(popupState)}>
              {props.title && 
                <Typography variant='subtitle2'>
                  {props.title}
                </Typography>
              }
              {props.data.map((element) => {
                return (
                  <MenuItem>
                    <NavLink
                      to={element.lien}
                    >
                      {element.title}
                    </NavLink>
                  </MenuItem>
                )
              })}
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    </>
  );
}