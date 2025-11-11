import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--color-accent)',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
          overflow: "inherit",
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
          "& img": {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid var(--color-white-30)"
          },
        },
      },
    },

    // 📋 Menu (conteneur du pop-up)
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: "8px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
          padding: "4px 0",
          minWidth: "180px",
          backgroundColor: "var(--color-background-secondary)"
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "0.95rem",
          color: "var(--color-text-primary)",
          transition: "all 0.2s ease",
          '& a': {
            color: "inherit",
            textDecoration: "none",
            width: "100%",
            display: "block",
            padding: "6px 16px",
          },
          '&:hover': {
            backgroundColor: "var(--color-accent)",
            color: "#fff",
          },
        },
      },
    },

    // 🏷️ Titre du menu (on stylise via Typography variant)
    MuiTypography: {
      styleOverrides: {
        subtitle2: {
          fontWeight: 600,
          padding: "8px 16px 4px 16px",
          color: "var(--color-text-primary)",
        },
      },
    },
  },
});