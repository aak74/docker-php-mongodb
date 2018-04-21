<?php

namespace Backup;

trait CallbackTrait
{
    private $callback = null;

    /** 
     * Вызывает внешнюю функцию
     * Используется для информирования вызывающего скрипта о прогрессе
     */
    private function callbackExec($status, $message = null)
    {
        if (is_callable($this->callback)) {
            call_user_func_array($this->callback, [$status, $message]);
        }
    }
}
