import { createTheme } from "@mui/material/styles";

const dark = createTheme({
    shadows: [
        'none',
        '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
        '0px 3px 6px rgba(0,0,0,0.16), 0px 3px 6px rgba(0,0,0,0.23)',
        '0px 10px 20px rgba(0,0,0,0.19), 0px 6px 6px rgba(0,0,0,0.23)',
        '0px 14px 28px rgba(0,0,0,0.25), 0px 10px 10px rgba(0,0,0,0.22)',
        '0px 19px 38px rgba(0,0,0,0.30), 0px 15px 12px rgba(0,0,0,0.22)',
        ...Array(19).fill('0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)'),
    ],
    palette: {
        mode: "dark",
        primary: {
            main: "#1877F2",
            light: "#4B9FF5",
            dark: "#0C62D3",
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: "#42B72A",
            light: "#6BC954",
            dark: "#36A420",
            contrastText: "#FFFFFF",
        },
        success: {
            main: "#42B72A",
            light: "#6BC954",
            dark: "#36A420",
        },
        error: {
            main: "#F02849",
            light: "#F35A73",
            dark: "#D11F3B",
        },
        warning: {
            main: "#FF9800",
            light: "#FFB547",
            dark: "#E68900",
        },
        info: {
            main: "#1877F2",
            light: "#4B9FF5",
            dark: "#0C62D3",
        },
        background: {
            default: "#18191A",
            paper: "#242526",
        },
        text: {
            primary: "#E4E6EB",
            secondary: "#B0B3B8",
            disabled: "#8A8D91",
        },
        divider: "rgba(255, 255, 255, 0.12)",
        grey: {
            50: "#FAFAFA",
            100: "#F5F5F5",
            200: "#EEEEEE",
            300: "#E0E0E0",
            400: "#BDBDBD",
            500: "#9E9E9E",
            600: "#757575",
            700: "#616161",
            800: "#424242",
            900: "#212121",
        },
    },
    typography: {
        fontFamily: '"Segoe UI", Helvetica, Arial, sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: "2.5rem",
        },
        h2: {
            fontWeight: 700,
            fontSize: "2rem",
        },
        h3: {
            fontWeight: 600,
            fontSize: "1.75rem",
        },
        h4: {
            fontWeight: 600,
            fontSize: "1.5rem",
        },
        h5: {
            fontWeight: 600,
            fontSize: "1.25rem",
        },
        h6: {
            fontWeight: 600,
            fontSize: "1rem",
        },
        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                ":root": {
                    "--color-primary": "#1877F2",
                    "--color-secondary": "#42B72A",
                    "--color-accent": "#F02849",
                    "--color-bg": "#18191A",
                    "--color-text": "#E4E6EB",
                    "--color-muted-bg": "#242526",
                    "--text-muted-foreground": "#B0B3B8",
                    "--color-overlay": "rgba(0, 0, 0, 0.8)",
                    "--color-primary-hsl": "214, 89%, 52%",
                    "--color-secondary-hsl": "106, 63%, 45%",
                    "--color-accent-hsl": "349, 87%, 55%",
                },
                body: {
                    scrollbarColor: "#4A4B4D #242526",
                    "&::-webkit-scrollbar": {
                        width: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "#242526",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "#4A4B4D",
                        borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        background: "#5A5B5D",
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.9375rem",
                },
                contained: {
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "none",
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        backgroundColor: "#3A3B3C",
                        "&:hover fieldset": {
                            borderColor: "#4E4F50",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#1877F2",
                        },
                    },
                },
            },
        },
    },
});

const light = createTheme({
    shadows: [
        'none',
        '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
        '0px 3px 6px rgba(0,0,0,0.16), 0px 3px 6px rgba(0,0,0,0.23)',
        '0px 10px 20px rgba(0,0,0,0.19), 0px 6px 6px rgba(0,0,0,0.23)',
        '0px 14px 28px rgba(0,0,0,0.25), 0px 10px 10px rgba(0,0,0,0.22)',
        '0px 19px 38px rgba(0,0,0,0.30), 0px 15px 12px rgba(0,0,0,0.22)',
        ...Array(19).fill('0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)'),
    ],
    palette: {
        mode: "light",
        primary: {
            main: "#1877F2",
            light: "#4B9FF5",
            dark: "#0C62D3",
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: "#42B72A",
            light: "#6BC954",
            dark: "#36A420",
            contrastText: "#FFFFFF",
        },
        success: {
            main: "#42B72A",
            light: "#6BC954",
            dark: "#36A420",
        },
        error: {
            main: "#F02849",
            light: "#F35A73",
            dark: "#D11F3B",
        },
        warning: {
            main: "#FF9800",
            light: "#FFB547",
            dark: "#E68900",
        },
        info: {
            main: "#1877F2",
            light: "#4B9FF5",
            dark: "#0C62D3",
        },
        background: {
            default: "#F0F2F5",
            paper: "#FFFFFF",
        },
        text: {
            primary: "#1C1E21",
            secondary: "#65676B",
            disabled: "#BCC0C4",
        },
        divider: "rgba(0, 0, 0, 0.12)",
        grey: {
            50: "#FAFAFA",
            100: "#F0F2F5",
            200: "#E4E6EB",
            300: "#CCD0D5",
            400: "#BCC0C4",
            500: "#8A8D91",
            600: "#65676B",
            700: "#4E4F50",
            800: "#3A3B3C",
            900: "#1C1E21",
        },
    },
    typography: {
        fontFamily: '"Segoe UI", Helvetica, Arial, sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: "2.5rem",
        },
        h2: {
            fontWeight: 700,
            fontSize: "2rem",
        },
        h3: {
            fontWeight: 600,
            fontSize: "1.75rem",
        },
        h4: {
            fontWeight: 600,
            fontSize: "1.5rem",
        },
        h5: {
            fontWeight: 600,
            fontSize: "1.25rem",
        },
        h6: {
            fontWeight: 600,
            fontSize: "1rem",
        },
        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                ":root": {
                    "--color-primary": "#1877F2",
                    "--color-secondary": "#42B72A",
                    "--color-accent": "#F02849",
                    "--color-overlay": "rgba(255, 255, 255, 0.8)",
                    "--color-bg": "#F0F2F5",
                    "--color-text": "#1C1E21",
                    "--color-muted-bg": "#FFFFFF",
                    "--text-muted-foreground": "#65676B",
                    "--color-primary-hsl": "214, 89%, 52%",
                    "--color-secondary-hsl": "106, 63%, 45%",
                    "--color-accent-hsl": "349, 87%, 55%",
                },
                body: {
                    scrollbarColor: "#BCC0C4 #F0F2F5",
                    "&::-webkit-scrollbar": {
                        width: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "#F0F2F5",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "#BCC0C4",
                        borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        background: "#8A8D91",
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.9375rem",
                },
                contained: {
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "none",
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                },
                elevation1: {
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
                },
                elevation2: {
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                },
                elevation3: {
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        backgroundColor: "#FFFFFF",
                        "&:hover fieldset": {
                            borderColor: "#CCD0D5",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#1877F2",
                        },
                    },
                },
            },
        },
    },
});

const themes = { light, dark };

export default themes;