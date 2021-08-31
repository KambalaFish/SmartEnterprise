import React, {useState} from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import {Tabs, Tab, Typography, Box, Grid} from '@material-ui/core';
import {CompanyDepartmentsOld} from "../CompanyDepartments/CompanyDepartmentsOld";
import {Paper} from "@material-ui/core";
import {CompanyDepartments} from "../CompanyDepartments/CompanyDepartments";
import {CompanyRoles} from "../CompanyRoles/CompanyRoles";
import {CompanyTeams} from "../CompanyTeams/CompanyTeams";
import CustomAlert from "../../../Reusable/CustomAlert/CustomAlert";

interface TabPanelProps {
    // children?: React.ReactNode;
    children: JSX.Element;
    index: number;
    value: number;
    // index: any;
    // value: any;
}

function TabPanel(props: TabPanelProps): JSX.Element {
    const { children, value, index} = props;
    return (
            <Grid item xs={12} hidden={value!==index} style={{marginTop: 8}}>
                {value === index && (children)}
            </Grid>
    );
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        // flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(4)
    },
}));

interface CompanyTabsProps{
    id: number;
}

export function CompanyTabs({id}: CompanyTabsProps): JSX.Element{
    const classes = useStyles();
    const [tabNumber, setTabNumber] = useState<number>(0);

    const [alert, setAlert] = useState<string|null>(null);

    function onAlert(message: string){
        setAlert(message);
    }

    function onAlertClose(){
        setAlert(null);
    }

    const handleChange = (event: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
        setTabNumber(newValue);
    };

    return (
        <>
            <CustomAlert alert={alert} onAlertClose={onAlertClose}/>
            {/*<Grid item container direction={'row'} className={classes.root} alignItems={'center'} justifyContent={'center'}>*/}
            <Grid item container direction={'row'} className={classes.root} alignItems={'center'} justifyContent={'center'} style={{height: 450}}>
                <Grid item container direction={'column'} xs={9}>
                    <AppBar position="relative" component={Paper} elevation={6}>
                        <Tabs value={tabNumber} variant={'fullWidth'} centered onChange={handleChange}>
                            <Tab label="Departments"/>
                            <Tab label="Roles"/>
                            <Tab label="Teams"/>
                        </Tabs>
                    </AppBar>
                    <TabPanel value={tabNumber} index={0}>
                        <CompanyDepartments id={id} onAlert={onAlert}/>
                    </TabPanel>
                    <TabPanel value={tabNumber} index={1}>
                        <CompanyRoles id={id} onAlert={onAlert}/>
                    </TabPanel>
                    <TabPanel value={tabNumber} index={2}>
                        <CompanyTeams id={id} onAlert={onAlert}/>
                    </TabPanel>
                </Grid>
            </Grid>
        </>
    );
}
