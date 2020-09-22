<?php

/*
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace App\Services;

use App\Helper\Constants;
use App\Models\HistoricalName;
use Illuminate\Support\Facades\Cache;

class HistoricalNameServices extends BaseServices
{
    public function createRecord($name, $id)
    {
        $record = new HistoricalName;
        $record->submitted_name = $name;
        $record->user_id = $id;
        $record->save();  
    }
}
