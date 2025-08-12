import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { InputError } from '@/components/ui/input-error';

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

export default function EditTask({ task }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        title: task.title,
        description: task.description || '',
        completed: task.completed,
        due_date: task.due_date || '',
        priority: task.priority,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('tasks.update', task.id));
    };

    return (
        <AppShell>
            <Head title={`Edit ${task.title}`} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">✏️ Edit Task</h1>
                        <p className="text-muted-foreground">
                            Update task details
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('tasks.show', task.id)}>
                            <Button variant="outline">
                                ← Back to Task
                            </Button>
                        </Link>
                        <Link href={route('tasks.index')}>
                            <Button variant="outline">
                                📝 All Tasks
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Task Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium mb-2">
                                    Title *
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Enter task title"
                                    required
                                />
                                <InputError message={errors.title} className="mt-1" />
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium mb-2">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Enter task description (optional)"
                                />
                                <InputError message={errors.description} className="mt-1" />
                            </div>

                            {/* Completed Status */}
                            <div>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={data.completed}
                                        onChange={(e) => setData('completed', e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300"
                                    />
                                    <span className="text-sm font-medium">
                                        {data.completed ? '✅ Task completed' : '⏳ Mark as completed'}
                                    </span>
                                </label>
                                <InputError message={errors.completed} className="mt-1" />
                            </div>

                            {/* Due Date */}
                            <div>
                                <label htmlFor="due_date" className="block text-sm font-medium mb-2">
                                    Due Date
                                </label>
                                <input
                                    id="due_date"
                                    type="date"
                                    value={data.due_date}
                                    onChange={(e) => setData('due_date', e.target.value)}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <InputError message={errors.due_date} className="mt-1" />
                            </div>

                            {/* Priority */}
                            <div>
                                <label htmlFor="priority" className="block text-sm font-medium mb-2">
                                    Priority *
                                </label>
                                <Select value={data.priority} onValueChange={(value: 'low' | 'medium' | 'high') => setData('priority', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">🟢 Low</SelectItem>
                                        <SelectItem value="medium">🟡 Medium</SelectItem>
                                        <SelectItem value="high">🔴 High</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.priority} className="mt-1" />
                            </div>

                            {/* Submit */}
                            <div className="flex gap-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? '⏳ Updating...' : '💾 Update Task'}
                                </Button>
                                <Link href={route('tasks.show', task.id)}>
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}