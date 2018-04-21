<?php

// $router->group(['middleware' => 'auth'], function () use ($router) {
// $router->get('api/v1/', function () {
//     return '1';
// });
// return;
$router->group(['prefix' => '/api/v1'], function () use ($router) {
    $router->get('/', function ()    {
        return '1';
    });

    // $router->apiResource('projects', 'ProjectController');
    // $router->get('projects', [
    //     'as' => 'projects', 'uses' => 'ProjectController@showProfile'
    // ]);
    $router->group(['prefix' => 'projects'], function () use ($router) {
        $router->get('/', ['uses' => 'ProjectController@index']);
        
        $router->get('/{id}', ['uses' => 'ProjectController@show']);
    });
});