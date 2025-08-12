<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Task
 *
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property string|null $description
 * @property bool $completed
 * @property \Illuminate\Support\Carbon|null $due_date
 * @property string $priority
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Task newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Task newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Task query()
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereCompleted($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task pending()
 * @method static \Illuminate\Database\Eloquent\Builder|Task completed()
 * @method static \Database\Factories\TaskFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Task extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'completed',
        'due_date',
        'priority',
        'user_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'completed' => 'boolean',
        'due_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tasks';

    /**
     * Get the user that owns the task.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only include pending tasks.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('completed', false);
    }

    /**
     * Scope a query to only include completed tasks.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCompleted($query)
    {
        return $query->where('completed', true);
    }
}