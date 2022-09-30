import React, {useState} from "react";
import CustomAlert from "../../Reusable/CustomAlert/CustomAlert";
import CustomSuccessMessage from "../../Reusable/CustomSuccessMessage/CustomSuccessMessage";
import TablePageHeader from "../../Reusable/Headers/TablePageHeader/TablePageHeader";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid, makeStyles,
    TextField
} from "@material-ui/core";
import {AdvancedReusableTable} from "../../Reusable/Tables/ReusableTable/AdvancedReusableTable";
import {Column} from "../../../utils/Interfaces/PropsInterfaces";
import {getCompanyRoles} from "../../../utils/FetchFunctions";
import {useAuth} from "../../Auth/Authentication";
import {ErrorBody, IRole, IRoleCreation, PaginatedTableFetcher} from "../../../utils/Interfaces/InterfacesApi";
import {useForm} from "react-hook-form";

function RolesTable(): JSX.Element{
    const [alert, setAlert] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const {handleSubmit, control, formState: {errors}} = useForm<IRoleCreation>();
    function onAlertClose(){
        setAlert(null);
    }
    function onSuccessMessageClose(){
        setSuccessMessage(null);
    }
    const {user}  = useAuth();
    function fetcher(pageNumber: number): Promise<PaginatedTableFetcher<IRole> | ErrorBody>{
        return getCompanyRoles(user.companyId as number, pageNumber);
    }

    const columns: Column[] = [
        {name: 'Role name', property: 'name', percent: 70},
        {name: 'Number of users', property: 'usersNumber', percent: 30},
    ]

    function onCatch(message: string) {
        setAlert(message);
    }

    const [open, setOpen] = useState<boolean>(false);
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleCreate = () => {
        handleClose();
    }
    const handleClose = () => {
        setOpen(false);
    }

    const useStyles = makeStyles((theme) => ({
                mt: {
                    marginTop: theme.spacing(3),
                },
                mb: {
                    marginBottom: theme.spacing(3),
                }
            }
        )
    );
    const classes = useStyles();

    return <>
        <CustomAlert alert={alert} onAlertClose={onAlertClose}/>
        <CustomSuccessMessage message={successMessage} onClose={onSuccessMessageClose}/>
        <TablePageHeader header={'All roles:'}/>
        <Grid item container direction={'row'} justifyContent={'center'}>
            <Grid item xs={10}>
                <AdvancedReusableTable
                    fetcher={fetcher}
                    tableCellHeight={65}
                    columns={columns}
                    actionColumns={[]}
                    // activateFilterEffect={activateFilterEffect}
                    // activateRowRemovalEffect={activateRemovalEffect}
                    onCatch={onCatch}
                />
            </Grid>
        </Grid>
        <Grid item container direction={'row'} justifyContent={'flex-end'} className={classes.mt}>
            <Grid item xs={2}>
                <Button variant={'contained'} color={'secondary'} onClick={handleClickOpen}>Create role</Button>
            </Grid>
        </Grid>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create role</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin='dense'
                    label={'Role'}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCreate} color={'secondary'}>Cancel</Button>
                <Button onClick={handleClose} color={'secondary'}>Create</Button>
            </DialogActions>
        </Dialog>
    </>
}

export default RolesTable;
