import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PinDropIcon from "@mui/icons-material/PinDrop";
import SettingsIcon from "@mui/icons-material/Settings";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";

const SideBar = () => {
  const labels = [
    {
      id: 1,
      name: "Orders",
      route: "/backoffice/order",
      icon: <FactCheckIcon />,
    },
    {
      id: 2,
      name: " Menu Categories",
      route: "/backoffice/menu-category",
      icon: <MenuBookIcon />,
    },
    {
      id: 3,
      name: "Menus",
      route: "/backoffice/menu",
      icon: <AutoAwesomeMosaicIcon />,
    },
    {
      id: 4,
      name: " Addon Categories",
      route: "/backoffice/addon-category",
      icon: <LibraryBooksIcon />,
    },
    {
      id: 5,
      name: "Addons",
      route: "/backoffice/addon",
      icon: <ImportContactsIcon />,
    },
    {
      id: 6,
      name: "Locations",
      route: "/backoffice/location",
      icon: <PinDropIcon />,
    },
    {
      id: 7,
      name: "Tables",
      route: "/backoffice/table",
      icon: <TableRestaurantIcon />,
    },
    {
      id: 8,
      name: "Settings",
      route: "/backoffice/setting",
      icon: <SettingsIcon />,
    },
  ];
  return (
    <List
      sx={{
        width: "350px",
        bgcolor: "#31363F",
      }}
    >
      {labels.slice(0, 7).map((item) => (
        <Link
          href={`${item.route}`}
          key={item.id}
          style={{ textDecoration: "none" }}
        >
          <ListItem>
            <ListItemButton>
              <ListItemIcon sx={{ color: "#EEEEEE" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} sx={{ color: "#EEEEEE" }} />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
      <Divider variant={"middle"} sx={{ bgcolor: "#EEEEEE", mt: 3 }} />
      {labels.slice(-1).map((item) => (
        <Link
          href={`${item.route}`}
          key={item.id}
          style={{ textDecoration: "none" }}
        >
          <ListItem>
            <ListItemButton>
              <ListItemIcon sx={{ color: "#EEEEEE" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} sx={{ color: "#EEEEEE" }} />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export default SideBar;
