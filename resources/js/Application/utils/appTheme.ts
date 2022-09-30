// import {createMuiTheme} from "@material-ui/core";
import {createTheme} from "@material-ui/core";

// https://material-ui.com/customization/default-theme/#default-theme
const theme = createTheme({
    // typography:{
    //     subtitle1:{
    //         fontWeight: 600
    //     }
    // },
    palette:{
        // type: 'dark',
        primary:{
            // light:'#40e3ff',
            light:'#2d343b',
            // main: '#2a9aad',
            main: '#101820FF',
            // dark: '#287b8a'
            dark: '#040a0f'
        },
        secondary:{
            // light:'#ffca1c',
            light:'#f0b160',
            // main:'#bd9615',
            main: '#F2AA4CFF',
            // dark:'#a1821f'
            dark:'#f08e0e'
        },
        divider: 'rgba(54, 61, 69, 0.52)',
    }
});
export default theme;
// const theme = createMuiTheme({
//     overrides: {
//         MuiButton: {
//             containedSecondary: {
//                 // Some CSS
//                 backgroundColor: 'black',
//                 color: 'green',
//                 '&:hover':{
//                     backgroundColor: 'black',
//                     color: 'white',
//                 }
//             },
//         },
//     },
// });
