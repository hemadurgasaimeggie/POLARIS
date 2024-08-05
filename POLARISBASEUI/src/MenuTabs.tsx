import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Welcome from './Welcome';
// Example components for demonstration
const OtherComponent = () => <div>Other Component</div>;

const MenuTabs = () => {
  const [menuItems, setMenuItems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<null | Error>(null);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [subMenuItems, setSubMenuItems] = React.useState<string[]>([]);
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null); // Track the active menu item

  React.useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch("https://mocki.io/v1/f582d7c8-5c16-40d9-b852-408beba2b3d0");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMenuItems(data.menuItems);
      } catch (error) {
        setError(error as Error);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>, subMenu: string[], label: string) => {
    setAnchorElNav(event.currentTarget);
    setSubMenuItems(subMenu);
    setActiveMenu(label); // Set the active menu item
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setSubMenuItems([]);
  };

  const renderComponent = () => {
    switch (activeMenu) {
      case 'Home':
        return "<Welcome />";
      case 'INTENT':
        return "Intent";
      case 'Ticket':
        return "Ticket"
      case 'CaseSearch':
        return 'CaseSearch'
      case 'Other':
        return <OtherComponent />;
      
      default:
        return <Welcome/>;
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box>
      <AppBar position="static" sx={{ width: '100%' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 2, justifyContent: 'space-between' }}>
            {menuItems.map((item) => (
              <Box key={item.label} sx={{ marginX: 2, position: 'relative' }}>
                <Button
                  onClick={(e) => handleOpenNavMenu(e, item.subMenu, item.label)}
                  sx={{
                    color: activeMenu === item.label ? 'black' : 'white',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {item.label}
                  {item.subMenu.length > 0 && <ArrowDropDownIcon sx={{ ml: 1 }} />}
                </Button>
                {item.subMenu.length > 0 && (
                  <Menu
                    anchorEl={anchorElNav}
                    open={Boolean(anchorElNav && subMenuItems.length > 0)}
                    onClose={handleCloseNavMenu}
                    sx={{ mt: 2 }}
                  >
                    {subMenuItems.map((subItem) => (
                      <MenuItem key={subItem} onClick={handleCloseNavMenu}>
                        {subItem}
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </Box>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2 }}>
        {renderComponent()}
      </Box>
    </Box>
  );
};

export default MenuTabs;
