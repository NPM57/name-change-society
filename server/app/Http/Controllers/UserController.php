<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\HistoricalName;
use App\Http\Resources\UserResource;
use App\Http\Resources\HistoricalNameResource;
use App\Services\HistoricalNameServices;
use Carbon\Carbon;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    /**
     * @var HistoricalNameServices
     */
    protected $historicalNameService;

    /**
     * UserController constructor.
     *
     * @param Request      $request
     * @param HistoricalNameServices $historicalNameService
     */
    public function __construct(Request $request, HistoricalNameServices $historicalNameService)
    {
        $this->request     = $request;
        $this->historicalNameService = $historicalNameService;
    }


    public function index()
    {
        \Gate::authorize('view_user_info', 'admin');

        $user = User::paginate();

        return UserResource::collection($user);
    }

    public function show($id)
    {
        \Gate::authorize('view_user_info', 'admin');

        $user = User::find($id);
        return new UserResource($user);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'unique:users', 'max:255'],
            'email' => ['required', 'unique:users', 'max:255'],
            'password' => ['required'],
            'role_id' => ['required'],
        ]);

        if ($validator->fails()) {
            return response("Duplicated Name or Email", Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $now = Carbon::now();

        $user = User::create($request->only('name', 'email', 'role_id') + [
            'password' => Hash::make($request->input('password')),
            'updated_name_at' => $now,
        ]);

        return response(new UserResource($user), Response::HTTP_CREATED);
    }

    public function update(Request $request, $id)
    {
        \Gate::authorize('update_user_info', 'admin');

        $user = User::find($id);
        $validator = Validator::make($request->all(), [
            'name' => ['unique:users', 'max:255'],
            'email' => ['unique:users', 'max:255'],
            // 'role_id' => ['required'],
        ]);

        // $historical_validator = Validator::make($request->all(), [
        //     'submitted_name' => [Rule::unique('historical_names')->where('user_id', $id)],
        // ]);

        $historical_validator = HistoricalName::where('submitted_name', $request->name)->where('user_id', $id)->first();

        if ($historical_validator) {
            return response("You have used this name before !!", Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        if ($validator->fails()) {
            return response("Duplicated Name or Email", Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $this->historicalNameService->createRecord($user->name, $user->id);

        $now = Carbon::now();

        if ($request->input('password')) {
            $user->update($request->only('name', 'email', 'role_id') + [
                'password' => Hash::make($request->only('password')),
                'updated_name_at' => $now,
            ]);
        } else {
            $user->update($request->only('name', 'email', 'role_id') + [
                'updated_name_at' => $now,
            ]);
        }

        return response(new UserResource($user), Response::HTTP_ACCEPTED);
    }

    public function destroy($id)
    {
        User::destroy($id);
        return response('The user has been deleted', Response::HTTP_NO_CONTENT);
    }

    public function user()
    {
        $user = \Auth::user();
        return new UserResource($user);
    }

    public function updateInfo(Request $request)
    {

        $user = \Auth::user();

        $validator = Validator::make($request->all(), [
            'name' => ['unique:users', 'max:255'],
            'email' => ['unique:users', 'max:255'],
        ]);

        $historical_validator = HistoricalName::where('submitted_name', $request->name)->where('user_id', $user->id)->first();

        if ($historical_validator) {
            return response("You have used this name before !!", Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        if ($validator->fails()) {
            return response("Duplicated Name or Email", Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $this->historicalNameService->createRecord($user->name, $user->id);

        $now = Carbon::now();

        if ($request->input('password')) {
            $user->update($request->only('name', 'email') + [
                'password' => Hash::make($request->only('password')),
                'updated_name_at' => $now,
            ]);
        } else {
            $user->update($request->only('name', 'email') + [
                'updated_name_at' => $now,
            ]);
        }

        return response(new UserResource($user), Response::HTTP_ACCEPTED);
    }

    public function getHistoricalName(Request $request)
    {
        $user = \Auth::user();
        $historical_names = HistoricalName::where('user_id', $user->id)->get();
        //return response($historical_names);
        return HistoricalNameResource::collection($historical_names);
    }

    public function getUserNameNearlyExpire()
    {
        $user = User::where('updated_name_at', '<=', Carbon::now()->addDays(28)->subYear())
            ->get();

        return UserResource::collection($user);
    }
}
