<?php

namespace App\Http\Requests\CompanyAdmin;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UpdateCompanyAdminRequest extends CompanyAdminRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => $this->nameValidation(),
            'phoneNumber' => ['required', 'string', 'regex:'.$this->phoneRegEx],
            'email' => ['required', 'string', 'email'],
            'password' => ['nullable', 'string', 'regex:'.$this->passwordRegEx],
            'passwordConfirmation' => ['same:password'],
            'status' => ['required', 'string', Rule::in(['works', 'on_vacation', 'illness'])],
            'companyId' => ['required', 'integer']
        ];
    }
}
