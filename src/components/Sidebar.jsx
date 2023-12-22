import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import chatgpt from "../assets/chatgpt.svg";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { window, chats, setChats, setActiveChatIndex } = props;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCreateChat = () => {
    setChats((prevChats) => [
      ...prevChats,
      {
        messages: [
          {
            text: "Hello! How can I assist you today?",
            isBot: true,
          },
        ],
      },
    ]);
    setActiveChatIndex(chats.length);

  };

  const handleDeleteChat = (index) => {
    setChats((prevChats) => {
      const updatedChats = [...prevChats];
      setActiveChatIndex(chats.length - 1)
      updatedChats.splice(index, 1);
      if (updatedChats.length === 0) {
        return [
          {
            messages: [
              {
                text: "Hello! How can I assist you today?",
                isBot: true,
              },
            ],
          },
        ];
      }

      return updatedChats;
    });
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <Button
        variant="contained"
        sx={{ backgroundColor: "#000000" }}
        onClick={handleCreateChat}
        endIcon={<AddCircleOutlineIcon sx={{ fontSize: "large" }} />}
        startIcon={
          <img src={chatgpt} className="h-[30px] w-[30px] rounded-full mr-1" />
        }
      >
        New Chat
      </Button>
      <Divider sx={{ backgroundColor: "#ffffff", marginTop: "4px" }} />
      <List>
        {chats.map((chat, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => setActiveChatIndex(index)}
              sx={{
                "&:hover": {
                  backgroundColor: "#313436",
                },
              }}
            >
              <ListItemText
                primary={
                  chat.messages.length > 1
                    ? chat.messages[1].text.length > 50
                      ? chat.messages[1].text.substring(0, 18) + "..."
                      : chat.messages[1].text
                    : "New Chat"
                }
                sx={{ color: "#ffffff", fontWeight: "bold" }}
              />

              <IconButton onClick={() => handleDeleteChat(index)}>
                <DeleteIcon sx={{ fill: "#ffffff" }} />
              </IconButton>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", color: "ffffff" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#343541",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div"  sx={{ fontWeight: 'bold' }}>
            DevGPT
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          backgroundColor: "#000000",
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#000000",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#000000",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
  chats: PropTypes.array.isRequired,
  setChats: PropTypes.func.isRequired,
  setActiveChatIndex: PropTypes.func.isRequired,
};

export default ResponsiveDrawer;
