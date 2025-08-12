import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Task {
    id: number;
    title: string;
    description: string | null;
    completed: boolean;
    due_date: string | null;
    priority: 'low' | 'medium' | 'high';
    created_at: string;
    updated_at: string;
}

interface Props {
    task: Task;
    [key: string]: unknown;
}

const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const priorityEmojis = {
    low: '🟢',
    medium: '🟡',
    high: '🔴',
};

export default function ShowTask({ task }: Props) {
    const toggleTaskCompletion = () => {
        router.patch(route('tasks.update', task.id), {
            completed: !task.completed,
        }, {
            preserveState: true,
            onSuccess: () => {
                // Task updated successfully
            }
        });
    };

    const deleteTask = () => {
        if (confirm('Are you sure you want to delete this task?')) {
            router.delete(route('tasks.destroy', task.id));
        }
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'No due date set';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const isOverdue = (dueDate: string | null, completed: boolean) => {
        if (!dueDate || completed) return false;
        return new Date(dueDate) < new Date();
    };

    return (
        <AppShell>
            <Head title={task.title} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                            {task.completed ? '✅' : '📝'} {task.title}
                        </h1>
                        <p className="text-muted-foreground">
                            Task Details
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('tasks.index')}>
                            <Button variant="outline">
                                ← Back to Tasks
                            </Button>
                        </Link>
                        <Link href={route('tasks.edit', task.id)}>
                            <Button variant="outline">
                                ✏️ Edit
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Task Details Card */}
                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={toggleTaskCompletion}
                                    className="mt-1 h-5 w-5 rounded border-gray-300"
                                />
                                <div>
                                    <CardTitle className={`text-xl ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                                        {task.title}
                                    </CardTitle>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Badge className={priorityColors[task.priority]}>
                                            {priorityEmojis[task.priority]} {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                                        </Badge>
                                        <Badge variant={task.completed ? 'secondary' : 'default'}>
                                            {task.completed ? '✅ Completed' : '⏳ Pending'}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    
                    <CardContent>
                        <div className="space-y-4">
                            {/* Description */}
                            {task.description && (
                                <div>
                                    <h3 className="font-medium mb-2">Description</h3>
                                    <p className="text-muted-foreground whitespace-pre-wrap">
                                        {task.description}
                                    </p>
                                </div>
                            )}

                            {/* Due Date */}
                            <div>
                                <h3 className="font-medium mb-2">Due Date</h3>
                                <div className="flex items-center gap-2">
                                    {task.due_date ? (
                                        <Badge variant={isOverdue(task.due_date, task.completed) ? 'destructive' : 'secondary'}>
                                            {isOverdue(task.due_date, task.completed) ? '⚠️ Overdue' : '📅'} {formatDate(task.due_date)}
                                        </Badge>
                                    ) : (
                                        <span className="text-muted-foreground">No due date set</span>
                                    )}
                                </div>
                            </div>

                            {/* Timestamps */}
                            <div className="border-t pt-4">
                                <h3 className="font-medium mb-2">Task Information</h3>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                    <p>📅 Created: {formatDateTime(task.created_at)}</p>
                                    <p>🔄 Last updated: {formatDateTime(task.updated_at)}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            <Button
                                onClick={toggleTaskCompletion}
                                variant={task.completed ? 'outline' : 'default'}
                            >
                                {task.completed ? '↩️ Mark as Pending' : '✅ Mark as Complete'}
                            </Button>
                            <Link href={route('tasks.edit', task.id)}>
                                <Button variant="outline">
                                    ✏️ Edit Task
                                </Button>
                            </Link>
                            <Button
                                onClick={deleteTask}
                                variant="destructive"
                            >
                                🗑️ Delete Task
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}