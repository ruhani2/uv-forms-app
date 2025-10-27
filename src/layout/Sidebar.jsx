import React, { forwardRef } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LogoutIcon from "@mui/icons-material/Logout";

const LinkBehavior = forwardRef(function LinkBehavior(props, ref) {
  const { href, ...other } = props;
  return <NextLink ref={ref} href={href} {...other} />;
});

const Sidebar = ({ size, collapsed, onToggle }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user ?? null;

  const currentPath = router.asPath || router.pathname || "/";

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: <HomeOutlinedIcon fontSize="small" />,
      to: "/",
    },
    user?.role === "admin"
      ? {
          id: "bhandara",
          label: "Bhandara",
          icon: <EmojiFoodBeverageIcon fontSize="small" />,
          to: "/bhandara",
        }
      : null,
    {
      id: "forms",
      label: "Forms",
      icon: <DescriptionOutlinedIcon fontSize="small" />,
      disabled: true,
    },
    {
      id: "sd-forms",
      label: "S&D Forms",
      icon: <ListAltOutlinedIcon fontSize="small" />,
      to: "/first_updesh",
      indent: 1,
    },
    {
      id: "new-registration",
      label: "New Registration",
      icon: <PersonAddAltIcon fontSize="small" />,
      to: "/first_updesh/register",
      indent: 2,
    },
    {
      id: "logout",
      label: "Logout",
      icon: <LogoutIcon fontSize="small" />,
      onClick: handleLogout,
    },
  ].filter(Boolean);

  const renderNavItem = (item) => {
    const isSelected = item.to
      ? item.to === "/"
        ? currentPath === item.to
        : currentPath.startsWith(item.to)
      : false;

    const paddingLeft = collapsed ? 1 : 2 + (item.indent ? item.indent * 2 : 0);

    const buttonProps = {
      key: item.id,
      disabled: item.disabled,
      selected: isSelected,
      onClick: item.onClick,
      sx: {
        color: "#fff",
        justifyContent: collapsed ? "center" : "flex-start",
        alignItems: "center",
        minHeight: 48,
        pl: paddingLeft,
        pr: collapsed ? 1 : 2,
        "&:hover": {
          backgroundColor: "#2E4A7D",
        },
        "&.Mui-selected, &.Mui-selected:hover": {
          backgroundColor: "#2E4A7D",
          color: "#fff",
        },
      },
    };

    if (item.to) {
      buttonProps.component = LinkBehavior;
      buttonProps.href = item.to;
    } else if (item.onClick) {
      buttonProps.onClick = item.onClick;
    }

    const button = (
      <ListItemButton {...buttonProps}>
        <ListItemIcon
          sx={{
            color: "#fff",
            minWidth: 0,
            mr: collapsed ? 0 : 2,
            justifyContent: "center",
            display: "flex",
          }}
        >
          {item.icon}
        </ListItemIcon>
        {!collapsed && (
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{ noWrap: true }}
          />
        )}
      </ListItemButton>
    );

    if (collapsed) {
      return (
        <Tooltip
          key={item.id}
          title={item.label}
          placement="right"
          arrow
          disableInteractive
        >
          <Box component="span" sx={{ display: "block" }}>
            {button}
          </Box>
        </Tooltip>
      );
    }

    return button;
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: size,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: size,
          boxSizing: "border-box",
          backgroundColor: "#1E3765",
          color: "#fff",
          transition: "width 0.2s ease",
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          px: 1,
        }}
      >
        <IconButton onClick={onToggle} color="inherit" size="small">
          {collapsed ? <MenuIcon /> : <MenuOpenIcon />}
        </IconButton>
      </Toolbar>
      <Box sx={{ overflow: "auto" }}>
        <List disablePadding>
          {navItems.map((item) =>
            item.id === "logout"
              ? renderNavItem({ ...item, onClick: handleLogout })
              : renderNavItem(item)
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
