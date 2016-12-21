<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Exception\HttpResponseException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        \Illuminate\Auth\AuthenticationException::class,
        \Illuminate\Auth\Access\AuthorizationException::class,
        \Symfony\Component\HttpKernel\Exception\HttpException::class,
        ModelNotFoundException::class,
        \Illuminate\Session\TokenMismatchException::class,
        \Illuminate\Validation\ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        if ($request->expectsJson()) {
            return $this->renderJson($request, $exception);
        }

        return parent::render($request, $exception);
    }

    /**
     * Render JSON exception response
     *
     * @param           $request
     * @param Exception $e
     * @return \Illuminate\Http\JsonResponse
     */
    public function renderJson($request, Exception $e)
    {
        if ($e instanceof HttpResponseException) {
            return response()->json(['message' => $e->getMessage()], $e->getResponse()->getStatusCode());
        } elseif ($e instanceof AuthenticationException) {
            return response()->json(['error' => 'Unauthenticated.', 'message' => $e->getMessage()], 401);
        } elseif ($e instanceof AuthorizationException) {
            return response()->json(['error' => 'Unauthorized.', 'message' => $e->getMessage()], 401);
        } elseif ($e instanceof ValidationException) {
            return response()->json(['message' => $e->getMessage(), 'validation' => $e->validator->errors()->getMessages()], 422);
        } elseif ($this->isHttpException($e)) {
            return response()->json(['message' => $e->getMessage()], $e->getStatusCode());
        }

        // If the app is in debug mode
        if (config('app.debug')) {
            return response()->json([
                'exception' => get_class($e),
                'message' => $e->getMessage(),
                'trace' => $e->getTrace(),
            ], 500);
        }

        return response()->json($e->getMessage(), 500);
    }

    /**
     * Convert an authentication exception into an unauthenticated response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Auth\AuthenticationException  $exception
     * @return \Illuminate\Http\Response
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->expectsJson()) {
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }

        return redirect()->guest('login');
    }
}
