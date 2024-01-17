import { createTheme } from '@mui/material/styles';

const colors = {
    main: '#ED7D31',
    black: '#000000',
    grey: '#A5A5A5',
    blue: '#4472C4',
};

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
                contained: {
                    backgroundColor: colors.main,
                    '&:hover, &:active': {
                        backgroundColor: colors.main,
                    },
                },
                outlined: {
                    color: colors.main,
                    borderColor: colors.main,
                    '&:hover, &:active': {
                        color: colors.main,
                        borderColor: colors.main,
                    },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                big: {
                    fontSize: 18,
                    fontWeight: "bold",
                    color: colors.black,
                },
                bigMain: {
                    fontSize: 18,
                    fontWeight: "bold",
                    color: colors.main,
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    // Hier können Sie allgemeine Stile für die Tabs festlegen
                    // Zum Beispiel: Hintergrundfarbe, Schriftart, etc.
                },
                indicator: {
                    backgroundColor: colors.main,
                },
                centered: {
                    // Hier können Sie Stile für zentrierte Tabs festlegen
                    // Zum Beispiel: Padding, etc.
                },
                // Weitere Überschreibungen nach Bedarf
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    color: colors.main,
                },
            },
        },
    },
});


export default theme;