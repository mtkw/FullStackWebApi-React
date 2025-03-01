import { AppBar, Toolbar, Typography } from "@mui/material";

export default function NavBar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Web Shop
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
