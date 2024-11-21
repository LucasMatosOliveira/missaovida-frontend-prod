import { Theme } from "react-select";

export const getSelectTheme = (theme: Theme) => ({
    ...theme,
    spacing: {
        ...theme.spacing,
        controlHeight: 26,
        baseUnit: 0,
    },
});

export const getSelectStyles = (tags: boolean | undefined) => ({
    control: (baseStyles: any) => ({
        ...baseStyles,
        border: '0px',
        borderBottom: '1px solid #d9d9d9',
        boxShadow: 'none',
        paddingTop: '2px',
        borderRadius: '0px',
    }),
    container: (baseStyles: any) => ({
        ...baseStyles,
        borderStyle: 'none',
        borderRadius: '0',
        width: '100%'
    }),
    multiValue: (styles: any) => (tags && {
        ...styles,
        paddingLeft: '5px',
        width: 'auto',
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#c7e7ff',
        //marginTop: '2px',
        marginBottom: '2px',
        marginLeft: '3px'
    }),

    multiValueLabel: (styles: any) => (tags && {
        ...styles,
        width: 'auto',
        color: '#008efa'
    }),
    multiValueRemove: (styles: any) => (tags && {
        ...styles,
        height: '21px',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: '5px',
        width: '20px',
        color: '#008efa',
        ':hover': {
            backgroundColor: '#028ffa',
            color: 'white'
        }
    }),
    valueContainer: (styles: any) => ({
        ...styles,
        '> div.root': {
            marginLeft: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }
    }),
    menuPortal: (styles: any) => ({
        ...styles,
        zIndex: 9999
    })
});

export const getSelectStyles2 = () => ({

    container: (baseStyles: any) => ({
        ...baseStyles,
        borderStyle: 'none',
        borderRadius: '0',
        width: '100%'
    }),
    menuPortal: (styles: any) => ({
        ...styles,
        zIndex: 9999
    })
});