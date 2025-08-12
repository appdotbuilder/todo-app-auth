<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        $totalTasks = $user->tasks()->count();
        $pendingTasks = $user->tasks()->where('completed', false)->count();
        $completedTasks = $user->tasks()->where('completed', true)->count();
        $overdueTasks = $user->tasks()
            ->where('completed', false)
            ->where('due_date', '<', now())
            ->count();
        $recentTasks = $user->tasks()->latest()->take(5)->get();
        
        return Inertia::render('dashboard', [
            'stats' => [
                'total' => $totalTasks,
                'pending' => $pendingTasks,
                'completed' => $completedTasks,
                'overdue' => $overdueTasks,
            ],
            'recentTasks' => $recentTasks,
        ]);
    })->name('dashboard');
    
    Route::resource('tasks', \App\Http\Controllers\TaskController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
