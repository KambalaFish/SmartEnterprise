<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoleStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
    private string $nameRegEx = '/^[a-zA-Z]+(?:(?:,\s|\s-\s|[-\s\'])?[a-zA-Z]+)*\.{0,3}$/';
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'regex:'.$this->nameRegEx]
        ];
    }
}
