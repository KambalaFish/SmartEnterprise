<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RequestLogger
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */

    public function handle(Request $request, Closure $next)
    {
//        I created the middleware to learn how middleware works
//        check out storage/logs/laravel for logs
        logger('header: '.$request->header('X-XSRF-TOKEN'));
        $sessionInfo = str_replace("'", "\'", json_encode($request->session()->all()));
        logger('session: '.$sessionInfo);
//        logger('Host is: '.$request->getHost());
//        logger('method is: '.$request->getMethod());
//        logger('scheme is: '.$request->getScheme());
        return $next($request);
    }
}
