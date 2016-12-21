<?php

namespace App\Http\Controllers;

use App\Entry;
use App\User;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * Class ReportController
 *
 * @package App\Http\Controllers
 * @resource Reports
 */
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

        $sqlite = DB::connection()->getDriverName() === 'sqlite';

        /** @var LengthAwarePaginator $weekly */
        $query = DB::table('entries')
            ->select($sqlite ?
                DB::raw('STRFTIME("%W", `date`) as `week`, STRFTIME("%Y", `date`) as `year`, avg(`speed`) as `avg_speed`, avg(`distance`) as `avg_distance`')
                : DB::raw('WEEK(`date`) as `week`, YEAR(`date`) as `year`, avg(`speed`) as `avg_speed`, avg(`distance`) as `avg_distance`')
            )
            ->where('user_id', $me->id)
            ->where($sqlite ? 'year' : DB::raw('YEAR(`date`)'), $request->get('year', date('Y')))
            ->groupBy('year', 'week')
            ->orderBy('year', 'desc')
            ->orderBy('week', 'desc');

        $min_year = DB::table('entries')->select($sqlite ?
            DB::raw('MIN(STRFTIME("%Y", `date`)) as year')
            : DB::raw('MIN(YEAR(`date`)) as year'))->value('year');

        $max_year = DB::table('entries')->select($sqlite ?
            DB::raw('MAX(STRFTIME("%Y", `date`)) as year')
            : DB::raw('MAX(YEAR(`date`)) as year'))->value('year');


        $weekly = $query->get()->map(function ($item) {
            $date = (new Carbon())->setISODate($item->year, $item->week);
            return [
                'week'         => $item->week,
                'week_start'   => $date->toDateString(),
                'week_end'     => $date->endOfWeek()->toDateString(),
                'avg_speed'    => round($item->avg_speed, 2),
                'avg_distance' => round($item->avg_distance, 2),
            ];
        });

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
