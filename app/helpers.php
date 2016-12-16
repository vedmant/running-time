<?php

if (! function_exists('time2secconds')) {
    /**
     * Convert time to seconds
     *
     * @param $hms
     * @return int
     */
    function time2secconds($hms)
    {
        list($h, $m, $s) = explode(':', $hms);
        $seconds = 0;
        $seconds += (intval($h) * 3600);
        $seconds += (intval($m) * 60);
        $seconds += (intval($s));

        return $seconds;
    }
}

if (! function_exists('seconds2time')) {
    /**
     * Convert seconds to time
     *
     * @param      $sec
     * @param bool $padHours
     * @return string
     */
    function seconds2time($sec, $padHours = false)
    {
        $hms   = '';
        $hours = intval(intval($sec) / 3600);

        $hms .= ($padHours)
            ? str_pad($hours, 2, "0", STR_PAD_LEFT) . ':'
            : $hours . ':';

        $minutes = intval(($sec / 60) % 60);

        $hms .= str_pad($minutes, 2, "0", STR_PAD_LEFT) . ':';

        $seconds = intval($sec % 60);

        $hms .= str_pad($seconds, 2, "0", STR_PAD_LEFT);

        return $hms;
    }
}