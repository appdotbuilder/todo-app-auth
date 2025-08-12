import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

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
    tasks: {
        data: Task[];
        links: unknown[];
        current_page: number;
        last_page: number;
    };
    filters: {
        status: string;
        priority: string;
    };
    [key: string]: unknown;
}

const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export default function TasksIndex({ tasks, filters }: Props) {
    const handleFilterChange = (type: string, value: string) => {
        const params = new URLSearchParams();
        if (value !== 'all') params.set(type, value);
        if (filters.status !== 'all' && type !== 'status') params.set('status', filters.status);
        if (filters.priority !== 'all' && type !== 'priority') params.set('priority', filters.priority);
        
        router.get(route('tasks.index'), Object.fromEntries(params), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const toggleTaskCompletion = (taskId: number, completed: boolean) => {
        router.patch(route('tasks.update', taskId), {
            completed: !completed,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'No due date';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const isOverdue = (dueDate: string | null, completed: boolean) => {
        if (!dueDate || completed) return false;
        return new Date(dueDate) < new Date();
    };

    return (
        <AppShell>
            <Head title="My Tasks" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">📝 My Tasks</h1>
                        <p className="text-muted-foreground">
                            Manage your personal task list
                        </p>
                    </div>
                    <Link href={route('tasks.create')}>
                        <Button>
                            ➕ Add Task
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <label htmlFor="status" className="text-sm font-medium">Status:</label>
                        <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                            <SelectTrigger className="w-32">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <label htmlFor="priority" className="text-sm font-medium">Priority:</label>
                        <Select value={filters.priority} onValueChange={(value) => handleFilterChange('priority', value)}>
                            <SelectTrigger className="w-32">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Tasks List */}
                <div className="space-y-4">
                    {tasks.data.length === 0 ? (
                        <Card>
                            <CardContent className="py-8">
                                <div className="text-center">
                                    <p className="text-muted-foreground mb-4">No tasks found.</p>
                                    <Link href={route('tasks.create')}>
                                        <Button>Create your first task</Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        tasks.data.map((task) => (
                            <Card key={task.id} className={task.completed ? 'opacity-75' : ''}>
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3">
                                            <input
                                                type="checkbox"
                                                checked={task.completed}
                                                onChange={() => toggleTaskCompletion(task.id, task.completed)}
                                                className="mt-1 h-4 w-4 rounded border-gray-300"
                                            />
                                            <div>
                                                <CardTitle className={`text-base ${task.completed ? 'line-through' : ''}`}>
                                                    {task.title}
                                                </CardTitle>
                                                {task.description && (
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {task.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            <Badge className={priorityColors[task.priority]}>
                                                {task.priority}
                                            </Badge>
                                            {task.due_date && (
                                                <Badge variant={isOverdue(task.due_date, task.completed) ? 'destructive' : 'secondary'}>
                                                    {isOverdue(task.due_date, task.completed) ? '⚠️' : '📅'} {formatDate(task.due_date)}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>
                                
                                <CardContent className="pt-0">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-muted-foreground">
                                            Created {new Date(task.created_at).toLocaleDateString()}
                                        </p>
                                        
                                        <div className="flex gap-2">
                                            <Link href={route('tasks.show', task.id)}>
                                                <Button variant="ghost" size="sm">
                                                    👁️ View
                                                </Button>
                                            </Link>
                                            <Link href={route('tasks.edit', task.id)}>
                                                <Button variant="ghost" size="sm">
                                                    ✏️ Edit
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                {/* Pagination would go here if needed */}
                {tasks.last_page > 1 && (
                    <div className="flex justify-center">
                        <p className="text-sm text-muted-foreground">
                            Page {tasks.current_page} of {tasks.last_page}
                        </p>
                    </div>
                )}
            </div>
        </AppShell>
    );
}