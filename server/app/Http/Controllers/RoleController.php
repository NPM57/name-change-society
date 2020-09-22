<?php

namespace App\Http\Controllers;

use App\Models\Role;

use Illuminate\Http\Request;

class RoleController extends Controller
{

    public function index()
    {
        \Gate::authorize('view_role', 'admin');

        return Role::all();
    }

    public function store(Request $request)
    {   
        \Gate::authorize('create_new_role', 'admin');

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'unique:roles', 'max:255'],
        ]);

        if ($validator->fails()) {
            return response("Role is existed", Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $role = Role::create($request->only('name'));

        return response($role, HTTP::HTTP_CREATED);
    }

    public function show($id)
    {
        \Gate::authorize('view_role_by_id', 'admin');

        return Role::find($id);
    }

    public function update(Request $request, $id)
    {
        \Gate::authorize('update_role', 'admin');

        $role = Role::find($id);   

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'unique:roles', 'max:255'],
        ]);
        
        if ($validator->fails()) {
            return response("Role is existed", Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response($role, Response::HTTP_ACCEPTED);
    }

    public function destroy($id)
    {
        \Gate::authorize('destroy_role', 'admin');

        Role::destroy($id);

        return response('The role has been deleted', Response::HTTP_NO_CONTENT);
    }
}
