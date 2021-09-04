import React, {useState} from "react";
import CustomAlert from "../../Reusable/CustomAlert/CustomAlert";
import CustomSuccessMessage from "../../Reusable/CustomSuccessMessage/CustomSuccessMessage";
import TablePageHeader from "../../Reusable/Headers/TablePageHeader/TablePageHeader";
import {Grid} from "@material-ui/core";
import {AdvancedReusableTable} from "../../Reusable/Tables/ReusableTable/AdvancedReusableTable";
import {Column} from "../../../utils/Interfaces/PropsInterfaces";
import {getCompanyRoles} from "../../../utils/FetchFunctions";
import {useAuth} from "../../Auth/Authentication";
import {ErrorBody, IRole, PaginatedTableFetcher} from "../../../utils/Interfaces/InterfacesApi";

function RolesTable(): JSX.Element{
    const [alert, setAlert] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
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
    </>
}

export default RolesTable;
