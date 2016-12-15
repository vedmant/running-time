<?php

namespace App\Http\Controllers;

use App\Entry;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EntryController extends Controller
{
    /**
     * Display a listing of time entries.
     *
     * @param Request $request
     * @return array
     */
    public function index(Request $request)
    {
        /** @var User $me */
        $me = auth()->user();
        $entry = $me->entries();

        if ($request->get('all')) {
            $this->authorize('listAll', Entry::class);
            $entry = (new Entry)->with('user');
        }

        $entries = $entry->orderBy('date', 'desc')
                         ->orderBy('distance', 'desc');

        if ($request->get('dateFrom')) {
            $entries->where('date', '>=', Carbon::parse($request->get('dateFrom'))->toDateString());
        }

        if ($request->get('dateTo')) {
            $entries->where('date', '<=', Carbon::parse($request->get('dateTo'))->toDateString());
        }

        return ['entries' => $entries->paginate(15)];
    }

    /**
     * Store a newly created time entry in storage.
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
     * Display the specified time entry.
     *
     * @param Entry $entry
     * @return array
     */
    public function show(Entry $entry)
    {
        $this->authorize($entry);

        return ['entry' => $entry];
    }

    /**
     * Update time entry in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param Entry                     $entry
     * @return array
     */
    public function update(Request $request, Entry $entry)
    {
        $this->authorize($entry);

        $this->validate($request, [
            'date'         => 'required|date',
            'distance'     => 'required|numeric',
            'time_minutes' => 'required|digits_between:1,2|min:0',
            'time_seconds' => 'required|digits_between:1,2|between:0,60',
        ]);

        $entry->fill($request->only('date', 'distance'));
        $entry->time = $request->get('time_minutes') * 60 + $request->get('time_seconds');
        $entry->speed = $entry->distance / ($entry->time / 3600);
        $entry->pace = ($entry->time / 60) / $entry->distance;
        $entry->save();

        return ['entry' => $entry];
    }

    /**
     * Remove time entry from storage.
     *
     * @param Entry $entry
     * @return array
     * @internal param int $id
     */
    public function destroy(Entry $entry)
    {
        $this->authorize($entry);

        $entry->delete();

        return ['message' => 'Success'];
    }
}
