<?php

/*
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HistoricalName extends Model
{
    protected $table = 'historical_names';

    public $timestamps = true;

    protected $guarded = ['id'];

    public function user()
    {
        return  $this->belongsTo(User::class, 'user_id', 'id');
    }

}
