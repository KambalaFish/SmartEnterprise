<?php

namespace App\Http\Requests;

use App\Models\Staff;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class CreateCompanyAdminRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $id = Auth::id();
        $staff = Staff::query()->find($id);
//        logger('create company admin authorization. id: '.$id.' staff: '.$staff);
        if ($staff->usertype == 'systemAdmin')
            return true;
        return false;
    }

    private string $nameRegEx = '/^[a-zA-Z]+(?:(?:,\s|\s-\s|[-\s\'])?[a-zA-Z]+)*\.{0,3}$/';
    private string $phoneRegEx = '/^\+?\d*\s?(?:\(\d+\)\s?\d+([-\s.]?)(?:\1?\d)*|([.\s-]?)(\2?\d)*)$/';
    private string $passwordRegEx = '/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/';


    private function nameValidation(): array
    {
        return ['required', 'string', 'regex:'.$this->nameRegEx];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'firstName' => $this->nameValidation(),
            'lastName' => $this->nameValidation(),
            'phoneNumber' => ['required', 'string', 'regex:'.$this->phoneRegEx],
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string', 'regex:'.$this->passwordRegEx],
            'passwordConfirmation' => ['required', 'string', 'regex:'.$this->passwordRegEx],
            'status' => ['required', 'string', Rule::in(['works', 'on_vacation', 'illness'])],
            'companyId' => ['required', 'integer']
        ];
    }
}
