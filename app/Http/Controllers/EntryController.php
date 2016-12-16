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
            'date'     => 'required|date',
            'distance' => 'required|numeric',
            'time'     => 'required|date_format:H:i:s',
        ]);

        $entry = new Entry($request->only('date', 'distance', 'time'));
        $entry->user_id = auth()->id();
        $entry->speed = $entry->distance / ($entry->seconds()/ 3600);
        $entry->pace = ($entry->seconds() / 60) / $entry->distance;
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
            'date'     => 'required|date',
            'distance' => 'required|numeric',
            'time'     => 'required|date_format:H:i:s',
        ]);

        $entry->fill($request->only('date', 'distance', 'time'));
        $entry->speed = $entry->distance / ($entry->seconds()/ 3600);
        $entry->pace = ($entry->seconds() / 60) / $entry->distance;
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
