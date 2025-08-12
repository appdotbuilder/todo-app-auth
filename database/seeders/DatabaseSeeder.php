<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a test user
        $testUser = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create sample tasks for the test user
        Task::factory(5)->for($testUser)->create();
        Task::factory(3)->for($testUser)->completed()->create();
        Task::factory(2)->for($testUser)->highPriority()->create();
        
        // Create an overdue task
        Task::factory()->for($testUser)->create([
            'due_date' => now()->subDays(2),
            'completed' => false,
            'priority' => 'high',
            'title' => 'Overdue Task - Review quarterly reports',
        ]);
    }
}
