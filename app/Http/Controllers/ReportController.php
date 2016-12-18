<?php

namespace App\Http\Controllers;

use App\Entry;
use App\User;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class ReportController extends Controller
{
    /**
     * Get weekly report
     *
     * @param Request $request
     * @return mixed
     */
    public function weekly(Request $request)
    {
        /** @var User $me */
        $me = auth()->user();

        /** @var LengthAwarePaginator $weekly */
        $weekly = DB::table('entries')
            ->select(DB::raw('STRFTIME("%W", `date`) as `week`, STRFTIME("%Y", `date`) as `year`, avg(`speed`) as `avg_speed`, avg(`distance`) as `avg_distance`'))
            ->where('user_id', $me->id)
            ->where('year', $request->get('year', date('Y')))
            ->groupBy('year', 'week')
            ->orderBy('year', 'desc')
            ->orderBy('week', 'desc');

        $weekly = $weekly->get()->map(function ($item) {
            $date = (new Carbon())->setISODate($item->year, $item->week);
            return [
                'week'         => $item->week,
                'week_start'   => $date->toDateString(),
                'week_end'     => $date->endOfWeek()->toDateString(),
                'avg_speed'    => round($item->avg_speed, 2),
                'avg_distance' => round($item->avg_distance, 2),
            ];
        });

        $min_year = DB::table('entries')->select(DB::raw('MIN(STRFTIME("%Y", `date`)) as year'))->value('year');
        $max_year = DB::table('entries')->select(DB::raw('MAX(STRFTIME("%Y", `date`)) as year'))->value('year');

        return [
            'weekly' => [
                'year'     => $request->get('year', date('Y')),
                'min_year' => $min_year,
                'max_year' => $max_year,
                'data'     => $weekly,
            ]
        ];
    }
}
