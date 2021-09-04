<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompanyRequest;
use App\Http\Resources\CompanyInfoResource;
use App\Http\Resources\CompanyResource;
use App\Http\Resources\CompanyResourceCollection;
use App\Http\Resources\CustomerManagerContactResource;
use App\Http\Resources\DepartmentResourceCollection;
use App\Http\Resources\ItHeadContactResource;
use App\Http\Resources\MainAdminContactResource;
use App\Http\Resources\RoleResourceCollection;
use App\Http\Resources\TeamResourceCollection;
use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    private function extractArrayElement(array & $validatedData, string $property){
        $extracted = $validatedData[$property];
        unset($validatedData[$property]);
        return $extracted;
    }
    /**
     * Display a listing of the resource.
     *
    //     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = $request->query();
        if ($query['status']=='any')
            unset($query['status']);
        unset($query['page']);
        foreach($query as $key => $value){
            if(is_null($value))
                unset($query[$key]);
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
    public function store(CompanyRequest $request)
    {
        $validatedData = $request->validated();
        $mainAdminContact = $this->extractArrayElement($validatedData, 'mainAdminContact');
        $itDepartmentContact = $this->extractArrayElement($validatedData, 'itDepartmentContact');
        $customerManagerContact = $this->extractArrayElement($validatedData, 'customerManagerContact');
        $validatedData['usersNumber'] = 1;
        $validatedData['beaconsNumber'] = 1;
        $company = Company::create($validatedData);
        $company->mainAdminContact()->create($mainAdminContact);
        $company->itDepartmentContact()->create($itDepartmentContact);
        $company->customerManagerContact()->create($customerManagerContact);
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
    public function update(CompanyRequest $request, Company $company)
    {
        $validatedData = $request->validated();
        $mainAdminContact = $this->extractArrayElement($validatedData, 'mainAdminContact');
        $itDepartmentContact = $this->extractArrayElement($validatedData, 'itDepartmentContact');
        $customerManagerContact = $this->extractArrayElement($validatedData, 'customerManagerContact');
        logger($validatedData);
        $company->mainAdminContact()->update($mainAdminContact);
        $company->itDepartmentContact()->update($itDepartmentContact);
        $company->customerManagerContact()->update($customerManagerContact);
        $company->update($validatedData);
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

    public function companyDepartments(Company $company){
        return DepartmentResourceCollection::make($company->departments()->paginate(5));
    }
    public function companyRoles(Company $company){
        return RoleResourceCollection::make($company->roles()->paginate(5));
    }
    public function companyTeams(Company $company){
        return TeamResourceCollection::make($company->teams()->paginate(5));
    }

    public function info(Company $company){
        return response(CompanyInfoResource::make($company));
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
