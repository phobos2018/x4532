import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/multicast';
import 'rxjs/add/operator/takeUntil';

@Injectable()
export class PoolingService {

    private subscriptionOpenOrdersController: Subject<any> = new Subject();
    private subscriptionController: Subject<any> = new Subject();

    constructor() {
        //
    }

    getOpenOrdersController() {
        return this.subscriptionOpenOrdersController;
    }

    stopOpenOrdersPoolers() {
        this.subscriptionOpenOrdersController.next(true);
    }

    stopPoolers() {
        this.subscriptionController.next(true);
    }

    execute<T>(operation: () => Observable<T>, frequency: number = 1000,
               controller?: Subject<any>, debug?: string): Observable<T> {

        const subject = new Subject();
        if (typeof controller === 'undefined' || !controller) {
            controller = this.subscriptionController;
        }

        const source = Observable.create((observer: Observer<T>) => {

            let sub: Subscription;
            sub = Observable.interval(frequency)
                .mergeMap(operation)
                .takeUntil(controller)
                .subscribe({
                    next(result) {
                            if (typeof debug === 'undefined') {
                                console.log('Debug param missing');
                            } else {
                                console.log('Notification From: ', debug);
                            }
                            observer.next(result);
                    },
                    error(err) {
                            console.log('Err / Pooler', err.message);
                            observer.error(err);
                    },
                    complete() {
                        console.log('Completed by takeUntil signal');
                    }
                });

            // Returns a function with handler to unsubscribe
            return () => {
                if (sub) {
                    sub.unsubscribe();
                }
            };

        });

        return source.multicast(subject)
            .refCount();
    }
}
