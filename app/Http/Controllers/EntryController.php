<?php

namespace App\Http\Controllers;

use App\Entry;
use App\Http\Requests\StoreEntryRequest;
use App\Http\Requests\UpdateEntryRequest;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

/**
 * Class EntryController
 *
 * @package App\Http\Controllers
 * @resource Entry
 */
class EntryController extends Controller
{
    /**
     * Entries list
     *
     * Display a listing of time entries.
     *
     * @param Request $request
     * @return array
     */
    public function index(Request $request)
    {
        /** @var User $me */
        $me = auth()->user();

        $entries = $me->entries()
            ->orderBy('date', 'desc')
            ->orderBy('id', 'desc')
            ->filter($request->only('dateFrom', 'dateTo'));

        return ['entries' => $entries->paginate()];
    }

    /**
     * All ennties list
     *
     * Display a listing of all users time entries (admin access only).
     *
     * @param Request $request
     * @return array
     */
    public function all(Request $request)
    {
        $this->authorize('all', Entry::class);

        $entries = (new Entry)->with('user')
            ->orderBy('date', 'desc')
            ->orderBy('distance', 'desc')
            ->filter($request->only('dateFrom', 'dateTo'));

        return ['entries' => $entries->paginate()];
    }

    /**
     * Store Entry
     *
     * Store a newly created time entry in storage.
     *
     * @param Request $request
     * @return array
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'date'     => 'required|date',
            'distance' => 'required|numeric|min:0.01',
            'time'     => 'required|date_format:H:i:s|time_required',
        ]);

        $entry = new Entry($request->only('distance', 'time'));
        $entry->user_id = auth()->id();
        $entry->date = Carbon::parse($request->get('date'));
        $entry->speed = $entry->distance / ($entry->seconds() / 3600);
        $entry->pace = ($entry->seconds() / 60) / $entry->distance;
        $entry->save();

        return ['entry' => $entry];
    }

    /**
     * Show entry
     *
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
     * Update entry
     *
     * Update time entry in storage.
     *
     * @param Request $request
     * @param Entry                      $entry
     * @return array
     */
    public function update(Request $request, Entry $entry)
    {
        $this->authorize($entry);

        $this->validate($request, [
            'date'     => 'required|date',
            'distance' => 'required|numeric|min:0.01',
            'time'     => 'required|date_format:H:i:s|time_required',
        ]);

        $entry->fill($request->only('distance', 'time'));
        $entry->date = Carbon::parse($request->get('date'));
        $entry->speed = $entry->distance / ($entry->seconds() / 3600);
        $entry->pace = ($entry->seconds() / 60) / $entry->distance;
        $entry->save();

        return ['entry' => $entry];
    }

    /**
     * Delete entry
     *
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
