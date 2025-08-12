<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Task::where('user_id', $request->user()->id)
            ->latest();

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            if ($request->status === 'completed') {
                $query->completed();
            } elseif ($request->status === 'pending') {
                $query->pending();
            }
        }

        // Filter by priority
        if ($request->has('priority') && $request->priority !== 'all') {
            $query->where('priority', $request->priority);
        }

        $tasks = $query->paginate(10)->withQueryString();

        return Inertia::render('tasks/index', [
            'tasks' => $tasks,
            'filters' => [
                'status' => $request->status ?? 'all',
                'priority' => $request->priority ?? 'all',
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('tasks/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $task = Task::create([
            ...$request->validated(),
            'user_id' => $request->user()->id,
        ]);

        return redirect()->route('tasks.index')
            ->with('success', 'Task created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('tasks/show', [
            'task' => $task,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('tasks/edit', [
            'task' => $task,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }

        $task->update($request->validated());

        return redirect()->route('tasks.show', $task)
            ->with('success', 'Task updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }

        $task->delete();

        return redirect()->route('tasks.index')
            ->with('success', 'Task deleted successfully.');
    }
}