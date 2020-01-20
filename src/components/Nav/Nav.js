import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, makeStyles, Button, Chip, Avatar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import FaceRounded from '@material-ui/icons/Face';

// Material-ui styling
const useStyles = makeStyles(theme=>({
  menuButton: {
      marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Nav = () =>{
  const classes = useStyles();
  // State for menu button
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);

  // Handles menu opening
  function handleMenu(event){
    setAnchorEl(event.currentTarget)
  }
  function handleMenu2(event){
    setAnchorE2(event.currentTarget)
  }
  
  // Handles clicking menu button
  function handleClose(event, path){
    setAnchorEl(null)
    setAnchorE2(null)
    if(path){
      history.push(path);
    }
  }

  const user = useSelector(state=>state.username);
  const dispatch = useDispatch();
  
  const history = useHistory();
  return(
    <nav>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            onClick={handleMenu}
            className={classes.menuButton}
            color='inherit'
          >
            <MenuIcon/>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'left'}}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'left'}}
            open={Boolean(anchorEl)}
            onClose={(event)=>handleClose(event)}
          >
            <MenuItem
              onClick={
                event=>{
                  handleClose(event, '/');
                }
              }
            >
              Home
            </MenuItem>
            {
              user.id?
                <MenuItem
                  onClick={
                    event=>{
                      handleClose(event, '/favorites');
                    }
                  }
                >
                  Favorites
                </MenuItem> :
                ''
            }
            {
              user.admin?
                <MenuItem
                  onClick={
                    event=>{
                      handleClose(event, '/admin');
                    }
                  }
                >
                  Admin
                </MenuItem> :
                ''
            }
          </Menu>
          <h1 className={classes.title}>
            Acronym Generator
          </h1>
          {
            user.id?
              <>
                <Chip
                  avatar={<Avatar><FaceRounded/></Avatar>}
                  label={user.username}
                  clickable
                  color="primary"
                  onClick={handleMenu2}
                />
                <Menu
                  anchorEl={anchorE2}
                  anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                  keepMounted
                  transformOrigin={{vertical: 'top', horizontal: 'left'}}
                  open={Boolean(anchorE2)}
                  onClose={(event)=>handleClose(event)}
                >
                  <MenuItem
                    onClick={
                      event=>{
                        handleClose(event, '/');
                      }
                    }
                  >
                    Home
                  </MenuItem>
                    <MenuItem
                      onClick={
                        event=>{
                          handleClose(event, '/favorites');
                        }
                      }
                    >
                      Favorites
                    </MenuItem>
                  {
                    user.admin?
                      <MenuItem
                        onClick={
                          event=>{
                            handleClose(event, '/admin');
                          }
                        }
                      >
                        Admin
                      </MenuItem> :
                      ''
                  }
                  {
                    user.id?
                      <MenuItem onClick={() => dispatch({ type: 'LOGOUT' })}>
                        Log Out
                      </MenuItem>:
                      null
                  }
                </Menu> 
              </>:
              <Button
              color="inherit"
              onClick={
                event=>{
                  handleClose(event, '/favorites');
                }
              }
            >
              Login
            </Button>
          }
        </Toolbar>
      </AppBar>
      
    </nav>
  );
};

export default Nav;