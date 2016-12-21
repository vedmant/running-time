<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Lang;
use Validator;

/**
 * Class AuthController
 *
 * @package App\Http\Controllers
 * @resource Authentication
 */
class AuthController extends Controller
{
    use AuthenticatesUsers;

    /**
     * Login
     *
     * Handle a login request to the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Contracts\Auth\Authenticatable|array
     */
    public function login(Request $request)
    {
        $this->validateLogin($request);

        // If the class is using the ThrottlesLogins trait, we can automatically throttle
        // the login attempts for this application. We'll key this by the username and
        // the IP address of the client making these requests into this application.
        if ($this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);
            $seconds = $this->limiter()->availableIn($this->throttleKey($request));

            abort(429, Lang::get('auth.throttle', ['seconds' => $seconds]));
        }

        if ($this->attemptLogin($request)) {
            $this->clearLoginAttempts($request);

            /** @var User $user */
            $user = $this->guard()->user();

            return ['user' => $user, 'access_token' => $user->getOrMakeToken()];
        }

        // If the login attempt was unsuccessful we will increment the number of attempts
        // to login and redirect the user back to the login form. Of course, when this
        // user surpasses their maximum number of attempts they will get locked out.
        $this->incrementLoginAttempts($request);

        abort(401, Lang::get('auth.failed'));
    }

    /**
     * Registration
     *
     * Handle a registration request for the application.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function register(Request $request)
    {
        $this->validator($request->all())->validate();

        event(new Registered($user = $this->create($request->all())));

        return ['user' => $user, 'access_token' => $user->getOrMakeToken()];
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
    }
}
