<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCompanyRequest;
use App\Http\Resources\CompanyCollection;
use App\Http\Resources\CompanyResource;
use App\Http\Resources\CompanyResourceCollection;
use App\Http\Resources\CustomerManagerContactResource;
use App\Http\Resources\DepartmentResourceCollection;
use App\Http\Resources\ItHeadContactResource;
use App\Http\Resources\MainAdminContactResource;
use App\Http\Resources\RoleResourceCollection;
use App\Http\Resources\TeamResourceCollection;
use App\Models\Company;
use App\Models\Contacts\MainAdminContact;
use App\Models\Department;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
    //     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $queryRaw = json_decode(json_encode($request->query()));
        if (isset($queryRaw->status)){
            if ($queryRaw->status=='any')
                $queryRaw->status='';
        }
        unset($queryRaw->page);
        $query = array();
        foreach ($queryRaw as $key => $value){
            if ($value){
                array_push($query, [$key, $value]);
            }
        }
        $paginatedCompanies = empty($query)? Company::paginate(5) : Company::where($query)->paginate(5);
        return CompanyResourceCollection::make($paginatedCompanies);
    }

    public function indexAll(){
        return CompanyResource::collection(Company::all());
//        return CompanyResource::make(Company::all());
    }

    private function isNullishObj($obj){
        if (is_object($obj)){
            foreach ($obj as $key => $value){
                if(is_null($value)) {
                    return true;
                }
            }
            return false;
        }
        return true;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCompanyRequest $request)
    {
        $data = json_decode(json_encode($request->input()));
        $company = Company::create([
            'name' => $data->name,
            'country' => $data->country,
            'city' => $data->city,
            'address' => $data->address,
            'zipCode' => $data->zipCode,
            'usersNumber' => 1,
            'beaconsNumber' => 1,
            'status' => $data->status
        ]);
        $admin = $data->admin;
        $company->mainAdminContact()->create([
            'firstName' => $admin->firstName,
            'lastName' => $admin->lastName,
            'email' => $admin->email,
            'phoneNumber' => $admin->phone,
        ]);

        $itHead = $data->itHead;
        $company->itHeadContact()->create([
            'firstName' => $itHead->firstName,
            'lastName' => $itHead->lastName,
            'email' => $itHead->email,
            'phoneNumber' => $itHead->phone,
        ]);
        $customerManager = $data->customerManager;
        $company->customerManagerContact()->create([
            'firstName' => $customerManager->firstName,
            'lastName' => $customerManager->lastName,
            'email' => $customerManager->email,
            'phoneNumber' => $customerManager->phone,
        ]);
        return response(CompanyResource::make($company));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function show(Company $company)
    {
        return response(CompanyResource::make($company));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Company $company)
    {
        $data = json_decode(json_encode($request->input()));
        $company->name = $data->name;
        $company->country = $data->country;
        $company->city = $data->city;
        $company->address = $data->address;
        $company->zipCode = $data->zipCode;
        $company->status = $data->status;

        $admin = $data->admin;
        $company->mainAdminContact->firstName = $admin->firstName;
        $company->mainAdminContact->lastName = $admin->lastName;
        $company->mainAdminContact->email = $admin->email;
        $company->mainAdminContact->phoneNumber = $admin->phone;
        $company->mainAdminContact->save();

        $itHead = $data->itHead;
        $company->itHeadContact->firstName = $itHead->firstName;
        $company->itHeadContact->lastName = $itHead->lastName;
        $company->itHeadContact->email = $itHead->email;
        $company->itHeadContact->phoneNumber = $itHead->phone;
        $company->itHeadContact->save();

        $customerManager = $data->customerManager;
        $company->customerManagerContact->firstName = $customerManager->firstName;
        $company->customerManagerContact->lastName = $customerManager->lastName;
        $company->customerManagerContact->email = $customerManager->email;
        $company->customerManagerContact->phoneNumber = $customerManager->phone;
        $company->customerManagerContact->save();

        $company->save();
//        return response('Company with id: '.$company->id.' was updated successfully');
        return response(CompanyResource::make($company));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function destroy(Company $company)
    {
        $name = $company->name;
        $company->delete();
        return response($name.' company was deleted successfully');
    }

    /**
    * @param  \App\Models\Company  $company
    * @return \Illuminate\Http\Response
    */
    public function mainAdminContact(Company $company){
        return response(MainAdminContactResource::make($company->mainAdminContact));
    }

    /**
    * @param  \App\Models\Company  $company
    * @return \Illuminate\Http\Response
    */
    public function itHeadContact(Company $company){
        return response(ItHeadContactResource::make($company->itHeadContact));
    }

    /**
    * @param  \App\Models\Company  $company
    * @return \Illuminate\Http\Response
    */
    public function customerManagerContact(Company $company){
        return response(CustomerManagerContactResource::make($company->customerManagerContact));
    }
    public function companyDepartments(Company $company){
        return DepartmentResourceCollection::make($company->departments()->paginate(5));
    }
    public function companyRoles(Company $company){
        return RoleResourceCollection::make($company->roles()->paginate(5));
    }
    public function companyTeams(Company $company){
        return TeamResourceCollection::make($company->teams()->paginate(5));
    }
}

//public function store(StoreCompanyRequest $request)
//{
//
//    logger(json_encode($request->input()));
//    $data = json_decode(json_encode($request->input()));
//    $company = Company::create([
//        'name' => $data->name,
//        'country' => $data->country,
//        'city' => $data->city,
//        'address' => $data->address,
//        'zip_code' => $data->zipCode,
//        'users_number' => 1,
//        'beacons_number' => 1,
//        'status' => $data->status
//    ]);
//    $admin = $data->admin;
//    if (!$this->isNullishObj($admin)){
//        logger('admin');
//        $company->mainAdminContact()->create([
//            'first_name' => $admin->firstName,
//            'last_name' => $admin->lastName,
//            'email' => $admin->email,
//            'phone_number' => $admin->phone,
//        ]);
//    }
//    $itHead = $data->itHead;
//    if (!$this->isNullishObj($itHead)){
//        $company->itHeadContact()->create([
//            'first_name' => $itHead->firstName,
//            'last_name' => $itHead->lastName,
//            'email' => $itHead->email,
//            'phone_number' => $itHead->phone,
//        ]);
//    }
//    $customerManager = $data->customerManager;
//    if (!$this->isNullishObj($customerManager)){
//        $company->customerManagerContact()->create([
//            'first_name' => $customerManager->firstName,
//            'last_name' => $customerManager->lastName,
//            'email' => $customerManager->email,
//            'phone_number' => $customerManager->phone,
//        ]);
//    }
//    return response('created '.$company->name.' company successfully');
//}


//public function index(Request $request)
//{
////        $company = Company::query()->where('name', '=','Harvey-West')->get()->first();
////        $company = Company::find(14);
////        logger('company: '. $company);
////        return CompanyResource::make($company);
//
////        return CompanyResource::make(Company::find(11));
////        return response()->json(['collection'=>CompanyResource::collection(Company::all())]);
////        return CompanyResource::collection(Company::all());
////        return CompanyResource::collection(Company::all()->keyBy->id);
////        return new CompanyResourceCollection(Company::all()->keyBy->id);
////        return CompanyResourceCollection::make(Company::all());
////        return Company::all();
////        return ['collection' => CompanyResource::collection(Company::all())];
//
////        $page = Company::cursorPaginate(3);
////        logger($page->count());
////        return CompanyResourceCollection::make($page);
//    logger($request->query());
////        $paginatedCompanies = Company::where('name', $request->name)->paginate(5);
//    $paginatedCompanies = Company::paginate(5);
//    return CompanyResourceCollection::make($paginatedCompanies);
////        return CompanyResourceCollection::collection(Company::paginate(4));
//}
