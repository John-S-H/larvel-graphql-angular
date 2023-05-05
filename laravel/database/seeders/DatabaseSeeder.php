<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Post;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Company::factory(15)->create();
        Post::factory(20)->create();
    }
}
