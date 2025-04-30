<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => [
                'string',
                'required',
                'min:3',
                'max:100',
                'unique:projects,name',
            ],
            'description' => ['nullable', 'string', 'min:5', 'max:2000'],
            'start_date' => ['nullable', 'date', Rule::date()->after(today())],
            'due_date' => ['nullable', 'date'],
        ];

        if ($this->get('start_date')) {
            $rules['due_date'][] = Rule::date()->after($this->get('start_date'));
        }

        return $rules;
    }
}
