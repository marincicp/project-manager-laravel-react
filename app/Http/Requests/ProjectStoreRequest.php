<?php

namespace App\Http\Requests;

use Carbon\Carbon;
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
        return [
            "name" => [
                "string",
                "required",
                "min:3",
                "max:100",
            ],
            "description" => ["nullable", "string", "min:5", "max:2000"],
            "start_date" => ["required", Rule::date()->after(today())],
            "due_date" => ["required", Rule::date()->after($this->get("start_date"))],
        ];
    }
}
