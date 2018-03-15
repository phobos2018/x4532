
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/multicast';
import 'rxjs/add/operator/takeUntil';

@Injectable()
export class ExchangeService {
    constructor() {
        //
    }

    calculateOffset(prevDay, last): number {
        return (last - prevDay) / prevDay * 100;
    }
    calculateSpread(bid, ask): string {
        return ((ask - bid) / ask * 100).toFixed(1) + '%';
    }
    getPairTypes(): Array<string> {
        return ['BTC', 'ETH'];
    }
}
