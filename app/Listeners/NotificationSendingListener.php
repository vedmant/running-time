<?php

namespace App\Listeners;

use Illuminate\Notifications\Events\NotificationSending;

class NotificationSendingListener
{
    /**
     * Handle the event.
     *
     * @param NotificationSending $event
     *
     * @return bool
     */
    public function handle(NotificationSending $event)
    {
        dd(1);

        return false;
    }
}
