<?php

namespace App\Notifications;

use App\Models\Model;
use App\Models\NotificationLog;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TokenExpiration extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * JWT token
     *
     * @var string
     */
    public $token;

    /**
     * Create a notification instance.
     *
     * @param  string  $token
     * @return void
     */
    public function __construct($token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's channels.
     *
     * @param  mixed  $notifiable
     * @return array|string
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * If should prevent duplicate
     * (if true, it will not send notification)
     *
     * @param Model $notifiable
     *
     * @return bool
     */
    public function preventDuplicate($notifiable)
    {
        return NotificationLog::where($this->preventDuplicateData($notifiable))
            ->exists();
    }

    /**
     * Get prevent duplicate data
     * (if this method exists it will store data in notifications_log)
     *
     * @param $notifiable
     *
     * @return array
     */
    public function preventDuplicateData($notifiable)
    {
        return [
            'notifiable_id'   => $notifiable->id,
            'notifiable_type' => $notifiable->getMorphClass(),
            'notification'    => 'token_expiration',
            'channel'         => 'email',
            'contact'         => $notifiable->Login,
            'meta'            => $this->token['jti'],
        ];
    }

    /**
     * Build the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $expire = Carbon::parse($this->token['exp']);

        return (new MailMessage)
            ->subject(__('Your API token expiring soon'))
            ->line(__('The API token you just used will expire in 30 days, on ') . $expire->format('n/j/Y') . '.')
            ->line(__('Please make sure to refresh token before expiration date.'));
    }
}
