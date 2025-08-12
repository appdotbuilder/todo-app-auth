import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Task Manager - Stay Organized">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <div className="flex gap-4">
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href={route('tasks.index')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] bg-[#1b1b18] text-[#FDFDFC] hover:bg-[#2a2a27] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b] dark:bg-[#EDEDEC] dark:text-[#1b1b18] dark:hover:bg-[#d4d4d0]"
                                >
                                    My Tasks
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-6xl lg:flex-row lg:gap-8">
                        {/* Main Content */}
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-center lg:text-left shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <div className="mb-8">
                                <h1 className="mb-6 text-4xl font-bold lg:text-6xl">
                                    📝 Task Manager
                                </h1>
                                <p className="mb-8 text-xl text-[#706f6c] lg:text-2xl dark:text-[#A1A09A]">
                                    Stay organized and boost your productivity with our modern task management system
                                </p>
                                
                                {/* Feature highlights */}
                                <div className="mb-8 grid gap-4 lg:grid-cols-2">
                                    <div className="rounded-lg border border-[#19140035] p-4 dark:border-[#3E3E3A]">
                                        <div className="mb-2 text-2xl">✅</div>
                                        <h3 className="mb-2 font-semibold">Task Management</h3>
                                        <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                            Create, edit, and organize your tasks with priorities and due dates
                                        </p>
                                    </div>
                                    <div className="rounded-lg border border-[#19140035] p-4 dark:border-[#3E3E3A]">
                                        <div className="mb-2 text-2xl">🚀</div>
                                        <h3 className="mb-2 font-semibold">Boost Productivity</h3>
                                        <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                            Track progress and stay on top of deadlines with smart filtering
                                        </p>
                                    </div>
                                    <div className="rounded-lg border border-[#19140035] p-4 dark:border-[#3E3E3A]">
                                        <div className="mb-2 text-2xl">📊</div>
                                        <h3 className="mb-2 font-semibold">Progress Tracking</h3>
                                        <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                            Visual dashboard with statistics and recent task overview
                                        </p>
                                    </div>
                                    <div className="rounded-lg border border-[#19140035] p-4 dark:border-[#3E3E3A]">
                                        <div className="mb-2 text-2xl">🔒</div>
                                        <h3 className="mb-2 font-semibold">Secure & Private</h3>
                                        <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                            Your tasks are private and secure with user authentication
                                        </p>
                                    </div>
                                </div>

                                {/* Call to Action */}
                                {!auth.user ? (
                                    <div className="flex flex-col gap-4 lg:flex-row lg:justify-start">
                                        <Link
                                            href={route('register')}
                                            className="inline-block rounded-lg bg-[#1b1b18] px-8 py-3 text-lg font-medium text-[#FDFDFC] hover:bg-[#2a2a27] dark:bg-[#EDEDEC] dark:text-[#1b1b18] dark:hover:bg-[#d4d4d0]"
                                        >
                                            🚀 Get Started Free
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="inline-block rounded-lg border border-[#19140035] px-8 py-3 text-lg font-medium text-[#1b1b18] hover:border-[#1915014a] hover:bg-[#f8f8f7] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b] dark:hover:bg-[#1a1a19]"
                                        >
                                            📝 Sign In
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-4 lg:flex-row lg:justify-start">
                                        <Link
                                            href={route('dashboard')}
                                            className="inline-block rounded-lg bg-[#1b1b18] px-8 py-3 text-lg font-medium text-[#FDFDFC] hover:bg-[#2a2a27] dark:bg-[#EDEDEC] dark:text-[#1b1b18] dark:hover:bg-[#d4d4d0]"
                                        >
                                            📊 Go to Dashboard
                                        </Link>
                                        <Link
                                            href={route('tasks.index')}
                                            className="inline-block rounded-lg border border-[#19140035] px-8 py-3 text-lg font-medium text-[#1b1b18] hover:border-[#1915014a] hover:bg-[#f8f8f7] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b] dark:hover:bg-[#1a1a19]"
                                        >
                                            📝 View My Tasks
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <footer className="mt-12 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                Built with ❤️ by{" "}
                                <a 
                                    href="https://app.build" 
                                    target="_blank" 
                                    className="font-medium text-[#f53003] hover:underline dark:text-[#FF4433]"
                                >
                                    app.build
                                </a>
                            </footer>
                        </div>

                        {/* Visual Preview */}
                        <div className="flex-shrink-0 lg:w-96">
                            <div className="rounded-tl-lg rounded-tr-lg bg-gradient-to-br from-blue-50 to-indigo-100 p-6 shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tr-lg lg:rounded-bl-none dark:from-blue-950 dark:to-indigo-950 dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                                <div className="space-y-4">
                                    {/* Mock task list */}
                                    <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
                                        <div className="flex items-center gap-2">
                                            <div className="h-4 w-4 rounded bg-green-500"></div>
                                            <span className="text-sm font-medium">Finish project proposal</span>
                                            <span className="ml-auto rounded bg-red-100 px-2 py-1 text-xs text-red-800">High</span>
                                        </div>
                                    </div>
                                    <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
                                        <div className="flex items-center gap-2">
                                            <div className="h-4 w-4 rounded border-2 border-gray-300"></div>
                                            <span className="text-sm">Review team feedback</span>
                                            <span className="ml-auto rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800">Medium</span>
                                        </div>
                                    </div>
                                    <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
                                        <div className="flex items-center gap-2">
                                            <div className="h-4 w-4 rounded border-2 border-gray-300"></div>
                                            <span className="text-sm">Update documentation</span>
                                            <span className="ml-auto rounded bg-green-100 px-2 py-1 text-xs text-green-800">Low</span>
                                        </div>
                                    </div>
                                    
                                    {/* Stats preview */}
                                    <div className="mt-6 grid grid-cols-2 gap-2 text-center">
                                        <div className="rounded bg-white p-2 shadow-sm dark:bg-gray-800">
                                            <div className="text-lg font-bold text-blue-600">12</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
                                        </div>
                                        <div className="rounded bg-white p-2 shadow-sm dark:bg-gray-800">
                                            <div className="text-lg font-bold text-green-600">8</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">Done</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}