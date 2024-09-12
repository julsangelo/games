<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
        return [
            'firstName' => 'required|max:15', 
            'lastName' => 'required|max:10',
            'gender' => 'required|numeric',
            'dateOfBirth' => 'required|date|before:-12 years',
            'username' => 'required|unique:users,username|max:15',
            'password' => ['required', 'min:8', 'max:100', Password::defaults()->mixedCase()->numbers()],
        ];
    }

    public function messages(): array {
        return [
            'dateOfBirth.before' => 'The website is only for 12 years old and above.'
        ];
    }

    protected function failedValidation(Validator $validator) {
        throw new HttpResponseException(response()->json([
            'result' => 'false',
            'message' => $validator->errors(),
        ]));
    }
}

