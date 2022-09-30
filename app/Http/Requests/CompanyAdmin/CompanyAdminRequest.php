<?php

namespace App\Http\Requests\CompanyAdmin;

use App\Models\Staff;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CompanyAdminRequest extends FormRequest
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
        if ($staff->usertype == 'systemAdmin')
            return true;
        return false;
    }

    protected string $nameRegEx = '/^[a-zA-Z]+(?:(?:,\s|\s-\s|[-\s\'])?[a-zA-Z]+)*\.{0,3}$/';
    protected string $phoneRegEx = '/^\+?\d*\s?(?:\(\d+\)\s?\d+([-\s.]?)(?:\1?\d)*|([.\s-]?)(\2?\d)*)$/';
    protected string $passwordRegEx = '/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/';

    protected function nameValidation(): array
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
            //
        ];
    }
}
