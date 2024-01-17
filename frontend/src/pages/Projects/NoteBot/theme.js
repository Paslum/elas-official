import { createTheme } from '@mui/material/styles';

const colors = {
    main: '#ED7D31',
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
    },
});


export default theme;