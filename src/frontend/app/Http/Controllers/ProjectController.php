<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = new \App\Project;
        return $projects->get();
    }
    
    public function show($id)
    {
        // $projects = DB::collection('projects')->get();
        // echo "<pre>";
        // dd($projects);
        // echo "</pre>";
        // $projects = DB::collection('projects')->get();
        $projects = new \App\Project;
        return $projects->where('_id', $id)->get();
    }

    //
}
