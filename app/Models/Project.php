<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Project extends Model
{
    use HasFactory;



    protected  $fillable  = ['user_id', 'status_id', 'name', 'description', 'start_date', 'due_date'];



    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    public function features(): HasMany
    {
        return $this->hasMany(Feature::class);
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(ProjectStatus::class);
    }
}
