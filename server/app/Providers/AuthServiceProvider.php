<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;
use App\Models\User;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes();

        /* Role */
        Gate::define('view_role', function (User $user, $model) {
            return $user->role->name == $model;
        });

        Gate::define('create_new_role', function (User $user, $model) {
            return $user->role->name == $model;
        });

        Gate::define('view_role_by_id', function (User $user, $model) {
            return $user->role->name == $model;
        });

        Gate::define('update_role', function (User $user, $model) {
            return $user->role->name == $model;
        });

        Gate::define('destroy_role', function (User $user, $model) {
            return $user->role->name == $model;
        });


        /* User */
        Gate::define('view_user_info', function (User $user, $model) {
            return $user->role->name == $model;
        });

        Gate::define('update_user_info', function (User $user, $model) {
            return $user->role->name == $model;
        });

    }
}
