<?php

namespace App\Http\Controllers;

use App\Entry;
use Illuminate\Http\Request;

class EntryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function index()
    {
        return ['entries' => auth()->user()->entries()
            ->orderBy('date', 'desc')->orderBy('distance', 'desc')->paginate(15)];
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'date'         => 'required|date',
            'distance'     => 'required|numeric',
            'time_minutes' => 'required|digits_between:1,2|min:0',
            'time_seconds' => 'required|digits_between:1,2|between:0,60',
        ]);

        $entry = new Entry($request->only('date', 'distance'));
        $entry->user_id = auth()->id();
        $entry->time = $request->get('time_minutes') * 60 + $request->get('time_seconds');
        $entry->speed = $entry->distance / ($entry->time / 3600);
        $entry->pace = ($entry->time / 60) / $entry->distance;
        $entry->save();

        return ['entry' => $entry];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
