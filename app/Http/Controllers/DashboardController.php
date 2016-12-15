<?php

namespace App\Http\Controllers;

use App\Entry;
use App\User;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Get user dashboard data
     *
     * @param Request $request
     * @return mixed
     */
    public function data(Request $request)
    {
        /** @var User $me */
        $me = auth()->user();

        $week_chart = DB::table('entries')
            ->select(DB::raw('avg(speed) as avg_speed, avg(distance) as avg_distance, date'))
            ->where('user_id', $me->id)
            ->where('date', '>=', Carbon::now()->subWeeks(2)->toDateString())
            ->groupBy('date')
            ->get()->map(function ($item) {
                return [Carbon::parse($item->date)->format('m/d'), round($item->avg_speed, 2), round($item->avg_distance, 2)];
            });

        return [
            'weekly_count' => $me->entries()->where('date', '>=', Carbon::now()->startOfWeek()->toDateString())->count(),
            'weekly_avg_speed' => $me->entries()->where('date', '>=', Carbon::now()->startOfWeek()->toDateString())->avg('speed'),
            'weekly_avg_pace' => $me->entries()->where('date', '>=', Carbon::now()->startOfWeek()->toDateString())->avg('pace'),
            'week_chart' => $week_chart,
            'max_speed' => $me->entries()->max('speed'),
            'max_distance' => $me->entries()->max('distance'),
            'max_time' => $me->entries()->max('time'),
        ];
    }
}
