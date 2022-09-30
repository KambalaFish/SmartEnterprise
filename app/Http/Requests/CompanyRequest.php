<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CompanyRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
//        return false;
        return true;
    }

//    private string $nameRegEx = '/^(?:[aA-zZ]+\s?[aA-zZ]*)*$/';
    private string $nameRegEx = '/^[a-zA-Z]+(?:(?:,\s|\s-\s|[-\s\'])?[a-zA-Z]+)*\.{0,3}$/';
//    private string $phoneRegEx = '/^\+?(?:\s?\d)*$/';
//    private string $phoneRegEx = '/^\+?\s?\d+(\.|\s|-)?(\1?\d)*$/';
    private string $phoneRegEx = '/^\+?\d*\s?(?:\(\d+\)\s?\d+([-\s.]?)(?:\1?\d)*|([.\s-]?)(\2?\d)*)$/';
//    private string $countryRegEx = '/^(Afghanistan|Albania|Algeria|Andorra|Angola|Antigua and Barbuda|Argentina|Armenia|Australia|Austria|Azerbaijan|Bahamas|Bahrain|Bangladesh|Barbados|Belarus|Belgium|Belize|Benin|Bhutan|Bolivia|Bosnia and Herzegovina|Botswana|Brazil|Brunei|Bulgaria|Burkina Faso|Burundi|Ivory Coast|Cabo Verde|Cambodia|Cameroon|Canada|Central African Republic|Chad|Chile|China|Colombia|Comoros|Congo|Costa Rica|Croatia|Cuba|Cyprus|Czechia|Czech Republic|Democratic Republic of the Congo|Denmark|Djibouti|Dominica|Dominican Republic|Ecuador|Egypt|El Salvador|Equatorial Guinea|Eritrea|Estonia|Eswatini|Ethiopia|Fiji|Finland|France|Gabon|Gambia|Georgia|Germany|Ghana|Greece|Grenada|Guatemala|Guinea|Guinea-Bissau|Guyana|Haiti|Holy See|Honduras|Hungary|Iceland|India|Indonesia|Iran|Iraq|Ireland|Israel|Italy|Jamaica|Japan|Jordan|Kazakhstan|Kenya|Kiribati|Kuwait|Kyrgyzstan|Laos|Latvia|Lebanon|Lesotho|Liberia|Libya|Liechtenstein|Lithuania|Luxembourg|Madagascar|Malawi|Malaysia|Maldives|Mali|Malta|Marshall Islands|Mauritania|Mauritius|Mexico|Micronesia|Moldova|Monaco|Mongolia|Montenegro|Morocco|Mozambique|Myanmar|Namibia|Nauru|Nepal|Netherlands|New Zealand|Nicaragua|Niger|Nigeria|North Korea|North Macedonia|Norway|Oman|Pakistan|Palau|Palestine State|Panama|Papua New Guinea|Paraguay|Peru|Philippines|Poland|Portugal|Qatar|Romania|Russia|Rwanda|Saint Kitts and Nevis|Saint Lucia|Saint Vincent and the Grenadines|Samoa|San Marino|Sao Tome and Principe|Saudi Arabia|Senegal|Serbia|Seychelles|Sierra Leone|Singapore|Slovakia|Slovenia|Solomon Islands|Somalia|South Africa|South Korea|South Sudan|Spain|Sri Lanka|Sudan|Suriname|Sweden|Switzerland|Syria|Tajikistan|Tanzania|Thailand|Timor|Leste|Togo|Tonga|Trinidad and Tobago|Tunisia|Turkey|Turkmenistan|Tuvalu|Uganda|Ukraine|United Arab Emirates|United Kingdom|United States of America|Uruguay|Uzbekistan|Vanuatu|Venezuela|Vietnam|Yemen|Zambia|Zimbabwe)$/';

    private function contactRequiredRow($name): array
    {
        return [
            $name.'.firstName' => [
                'required_with:'.$name.'.lastName,'.$name.'.phone,'.$name.'.email',
                'string',
                'regex:'.$this->nameRegEx,
                'nullable'
            ],
            $name.'.lastName' => [
                'required_with:'.$name.'.firstName,'.$name.'.phone,'.$name.'.email',
                'string',
                'regex:'.$this->nameRegEx,
                'nullable'
            ],
            $name.'.phoneNumber' => [
                'required_with:'.$name.'.firstName,'.$name.'.lastName,'.$name.'.email',
                'string',
                'regex:'.$this->phoneRegEx,
                'nullable'
            ],
            $name.'.email' => [
                'required_with:'.$name.'.firstName,'.$name.'.lastName,'.$name.'.phone',
                'string',
                'email',
                'nullable'
            ]
        ];
    }

    private function nameValidation(): array
    {
        return ['required', 'string', 'regex:'.$this->nameRegEx];
    }

    private function contactRequiredAll($name): array
    {
        return [
            $name.'.firstName' => $this->nameValidation(),
            $name.'.lastName' => $this->nameValidation(),
            $name.'.phoneNumber' => ['required', 'string', 'regex:'.$this->phoneRegEx],
            $name.'.email' => ['required', 'string', 'email']
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(){
        return [
            'name' => $this->nameValidation(),
            'country' => $this->nameValidation(),
            'city' => $this->nameValidation(),
            'address' => ['required', 'string'],
            'zipCode' => ['required', 'integer','min:1'],
            'status' => ['required', Rule::in(['served', 'not served'])],
            ]
            + $this->contactRequiredAll('mainAdminContact')
            + $this->contactRequiredAll('itDepartmentContact')
            + $this->contactRequiredAll('customerManagerContact');
//        + $this->contactRequiredRow('mainAdminContact')
//        + $this->contactRequiredRow('itDepartmentContact')
//        + $this->contactRequiredRow('customerManagerContact');
    }
}
