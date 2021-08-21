<?php
namespace App\Http\Requests\CompanyAdmin;

use Illuminate\Validation\Rule;

class CreateCompanyAdminRequest extends CompanyAdminRequest {
    public function rules()
    {
        return [
            'name' => $this->nameValidation(),
            'phoneNumber' => ['required', 'string', 'regex:'.$this->phoneRegEx],
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string', 'regex:'.$this->passwordRegEx],
            'passwordConfirmation' => ['same:password'],
            'status' => ['required', 'string', Rule::in(['works', 'on_vacation', 'illness'])],
            'companyId' => ['required', 'integer']
        ];
    }
}
