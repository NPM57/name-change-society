<?php

namespace App\Console\Commands;

use App\Models\HistoricalName;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;

class change_pending extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check:pending_name';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $now = Carbon::now()->subDays(28);

        $listname = Submitname::where('created_at', '<' , $now)->get();
        //Process big data by chunk.
        DB::table('users')->where('created_at', false)
            ->chunkById(100, function ($users) {
                foreach ($users as $user) {
                    DB::table('users')
                        ->where('id', $user->id)
                        ->update(['active' => true]);
                }
            });
        
        return true;
    }
}
