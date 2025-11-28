import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCart } from "react-use-cart";

import { getUserData } from "../../reducer/user";

const pages = ["Home", "My Learn", "Logout"];

function UserappBar() {
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();
  const { totalUniqueItems } = useCart();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (menuname) => {
    setAnchorElNav(null);

    if (menuname === "Home") {
      navigate("/userhome");
    } else if (menuname === "My Learn") {
      navigate("/Mysubscription");
    } else if (menuname === "Logout") {
      localStorage.clear();
      dispatch(
        getUserData({
          name: "",
          email: "",
          password: "",
          address: "",
          mobile: "",
        })
      );
      navigate("/");
    }
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo (Desktop) */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              SKILL BRIDGE
            </Typography>
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">
                    {page}
                    {/* Optional: Cart badge if you add "Cart" to pages */}
                    {page === "Cart" ? ` - ${totalUniqueItems}` : ""}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo (Mobile) */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SKILL BRIDGE
          </Typography>

          {/* Desktop Menu */}
          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
                {page === "Cart" ? ` - ${totalUniqueItems}` : ""}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default UserappBar;




// import React, { useState } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Button from "@mui/material/Button";
// import MenuItem from "@mui/material/MenuItem";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useCart } from "react-use-cart";

// import { getUserData } from "../../reducer/user";

// const pages = ["Home", "My Learn", "Logout"];

// function UserappBar() {
//   const dispatch = useDispatch();
//   const [anchorElNav, setAnchorElNav] = useState("");
//   const navigate = useNavigate();
//   const { totalUniqueItems } = useCart();

//   const handleOpenNavMenu = event => {
//     setAnchorElNav(event.currentTarget);
//   };

//   const handleCloseNavMenu = menuname => {
//     // setAnchorElNav(menuname);
//     if (menuname === "Home") {
//       navigate("/userhome");
//     } else if (menuname === "My Learn") {
//       navigate("/Mysubscription");
//     } else if (menuname === "Login") {
//       navigate("/login");
//     } else {
//       localStorage.clear();
//       dispatch(
//         getUserData({
//           name: "",
//           email: "",
//           password: "",
//           address: "",
//           mobile: ""
//         })
//       );
//       navigate("/");
//     }
//   };

//   return (
//     <AppBar position="sticky">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Typography
//               variant="h5"
//               noWrap
//               component="a"
//               href="/"
//               sx={{
//                 mr: 2,
//                 display: { xs: "none", md: "flex" },
//                 fontFamily: "monospace",
//                 fontWeight: 700,
//                 letterSpacing: ".1rem",
//                 color: "inherit",
//                 textDecoration: "none"
//               }}
//             >
//               SKILL BRIDGE
//             </Typography>
//           </Box>
//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//               keepMounted
//               transformOrigin={{ vertical: "top", horizontal: "left" }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{ display: { xs: "block", md: "none" } }}
//             >
//               {pages.map(page =>
//                 <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
//                   <Typography textAlign="center">
//                     {page}&nbsp;
//                     {page === "Cart"
//                       ? <span>
//                           - {totalUniqueItems}
//                         </span>
//                       : ""}
//                   </Typography>
//                 </MenuItem>
//               )}
//             </Menu>
//           </Box>
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href=""
//             sx={{
//               mr: 2,
//               display: { xs: "flex", md: "none" },
//               flexGrow: 1,
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".1rem",
//               color: "inherit",
//               textDecoration: "none"
//             }}
//           >
//             SKILL BRIDGE
//           </Typography>
//           <Box
//             sx={{
//               flexGrow: 0,
//               display: {
//                 xs: "none",
//                 md: "flex",
//                 justifyContent: "space-between"
//               }
//             }}
//           >
//             {pages.map(page =>
//               <Button
//                 key={page}
//                 onClick={() => handleCloseNavMenu(page)}
//                 sx={{ my: 2, color: "white", display: "block" }}
//               >
//                 {page}&nbsp;
//                 {page === "Cart"
//                   ? <span>
//                       - {totalUniqueItems}
//                     </span>
//                   : ""}
//               </Button>
//             )}
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
// export default UserappBar;
