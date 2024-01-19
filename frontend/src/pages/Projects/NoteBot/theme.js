import { createTheme } from '@mui/material/styles';

const colors = {
    main: '#ED7D31',
    black: '#000000',
    grey: '#A5A5A5',
    blue: '#4472C4',
    note: 'rgba(217, 217, 217, 0.3)',
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
                bigBlue: {
                    fontSize: 18,
                    fontWeight: "bold",
                    color: colors.blue,
                },
                normalMain: {
                    color: colors.main,
                    fontWeight: "normal",
                    fontSize: 18,
                },
                normal: {
                    color: colors.black,
                    fontWeight: "bold",
                    fontSize: 18,
                },
                small: {
                    color: colors.grey,
                    fontWeight: "normal",
                    fontSize: 16,
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: colors.main,
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    color: colors.main,
                    textTransform: 'none',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.note,
                    borderRadius: 4,
                    padding: 2,
                    minWidth: 333,
                    height: 220,
                }
            }
        }
    },
});


export default theme;