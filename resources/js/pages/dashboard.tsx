import React from 'react';
import { Head, Link } from '@inertiajs/react';
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

interface Stats {
    total: number;
    pending: number;
    completed: number;
    overdue: number;
}

interface Props {
    stats: Stats;
    recentTasks: Task[];
    [key: string]: unknown;
}

const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export default function Dashboard({ stats, recentTasks }: Props) {
    const formatDate = (dateString: string | null) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const isOverdue = (dueDate: string | null, completed: boolean) => {
        if (!dueDate || completed) return false;
        return new Date(dueDate) < new Date();
    };

    return (
        <AppShell>
            <Head title="Dashboard" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">📊 Dashboard</h1>
                        <p className="text-muted-foreground">
                            Overview of your task management
                        </p>
                    </div>
                    <Link href={route('tasks.create')}>
                        <Button>
                            ➕ Add New Task
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                            <span className="text-2xl">📝</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <p className="text-xs text-muted-foreground">
                                All tasks in your list
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                            <span className="text-2xl">⏳</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.pending}</div>
                            <p className="text-xs text-muted-foreground">
                                Tasks to be completed
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Completed</CardTitle>
                            <span className="text-2xl">✅</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.completed}</div>
                            <p className="text-xs text-muted-foreground">
                                Tasks finished
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
                            <span className="text-2xl">⚠️</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
                            <p className="text-xs text-muted-foreground">
                                Tasks past due date
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Tasks */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>📋 Recent Tasks</CardTitle>
                                <Link href={route('tasks.index')}>
                                    <Button variant="outline" size="sm">
                                        View All
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {recentTasks.length === 0 ? (
                                <div className="text-center py-4">
                                    <p className="text-muted-foreground mb-4">No tasks yet</p>
                                    <Link href={route('tasks.create')}>
                                        <Button size="sm">Create your first task</Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {recentTasks.map((task) => (
                                        <div key={task.id} className="flex items-start justify-between p-3 border rounded-lg">
                                            <div className="flex items-start gap-2">
                                                <span className="text-lg">
                                                    {task.completed ? '✅' : '⏳'}
                                                </span>
                                                <div>
                                                    <Link 
                                                        href={route('tasks.show', task.id)}
                                                        className="font-medium hover:underline"
                                                    >
                                                        {task.title}
                                                    </Link>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge className={priorityColors[task.priority]} size="sm">
                                                            {task.priority}
                                                        </Badge>
                                                        {task.due_date && (
                                                            <Badge 
                                                                variant={isOverdue(task.due_date, task.completed) ? 'destructive' : 'secondary'}
                                                                size="sm"
                                                            >
                                                                {formatDate(task.due_date)}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>⚡ Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <Link href={route('tasks.create')}>
                                    <Button className="w-full justify-start" variant="outline">
                                        ➕ Create New Task
                                    </Button>
                                </Link>
                                <Link href={route('tasks.index')}>
                                    <Button className="w-full justify-start" variant="outline">
                                        📋 View All Tasks
                                    </Button>
                                </Link>
                                <Link href={route('tasks.index', { status: 'pending' })}>
                                    <Button className="w-full justify-start" variant="outline">
                                        ⏳ View Pending Tasks
                                    </Button>
                                </Link>
                                <Link href={route('tasks.index', { status: 'completed' })}>
                                    <Button className="w-full justify-start" variant="outline">
                                        ✅ View Completed Tasks
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Welcome Message */}
                {stats.total === 0 && (
                    <Card>
                        <CardContent className="py-8">
                            <div className="text-center">
                                <h2 className="text-xl font-semibold mb-2">🎉 Welcome to Your Task Manager!</h2>
                                <p className="text-muted-foreground mb-4">
                                    Get started by creating your first task. Stay organized and boost your productivity!
                                </p>
                                <Link href={route('tasks.create')}>
                                    <Button>Create Your First Task</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppShell>
    );
}