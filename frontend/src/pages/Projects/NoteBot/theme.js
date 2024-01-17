import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
                contained: {
                    backgroundColor: '#ED7D31',
                    '&:hover': {
                        backgroundColor: '#ED7D31',
                    },
                    '&:active': {
                        backgroundColor: '#ED7D31',
                    },
                },
                outlined: {
                    color: "#ED7D31",
                    borderColor: "#ED7D31",
                    '&:hover': {
                        color: '#ED7D31',
                        borderColor: "#ED7D31",
                    },
                    '&:active': {
                        color: '#ED7D31',
                        borderColor: "#ED7D31",
                    },
                },
            },
        },
    },
});

export default theme;