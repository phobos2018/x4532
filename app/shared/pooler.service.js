"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const Observable_1 = require("rxjs/Observable");
const Subject_1 = require("rxjs/Subject");
require("rxjs/add/observable/interval");
require("rxjs/add/operator/mergeMap");
require("rxjs/add/operator/multicast");
require("rxjs/add/operator/takeUntil");
let PoolingService = class PoolingService {
    constructor() {
        this.subscriptionOpenOrdersController = new Subject_1.Subject();
        this.subscriptionController = new Subject_1.Subject();
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
    execute(operation, frequency = 1000, controller, debug) {
        const subject = new Subject_1.Subject();
        if (typeof controller === 'undefined' || !controller) {
            controller = this.subscriptionController;
        }
        const source = Observable_1.Observable.create((observer) => {
            let sub;
            sub = Observable_1.Observable.interval(frequency)
                .mergeMap(operation)
                .takeUntil(controller)
                .subscribe({
                next(result) {
                    if (typeof debug === 'undefined') {
                        console.log('Debug param missing');
                    }
                    else {
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
};
PoolingService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], PoolingService);
exports.PoolingService = PoolingService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9vbGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwb29sZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUEyQztBQUMzQyxnREFBNkM7QUFDN0MsMENBQXVDO0FBR3ZDLHdDQUFzQztBQUN0QyxzQ0FBb0M7QUFDcEMsdUNBQXFDO0FBQ3JDLHVDQUFxQztBQUdyQyxJQUFhLGNBQWMsR0FBM0I7SUFLSTtRQUhRLHFDQUFnQyxHQUFpQixJQUFJLGlCQUFPLEVBQUUsQ0FBQztRQUMvRCwyQkFBc0IsR0FBaUIsSUFBSSxpQkFBTyxFQUFFLENBQUM7UUFHekQsRUFBRTtJQUNOLENBQUM7SUFFRCx1QkFBdUI7UUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQztJQUNqRCxDQUFDO0lBRUQscUJBQXFCO1FBQ2pCLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxPQUFPLENBQUksU0FBOEIsRUFBRSxZQUFvQixJQUFJLEVBQ3hELFVBQXlCLEVBQUUsS0FBYztRQUVoRCxNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztRQUM5QixFQUFFLENBQUMsQ0FBQyxPQUFPLFVBQVUsS0FBSyxXQUFXLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ25ELFVBQVUsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUM7UUFDN0MsQ0FBQztRQUVELE1BQU0sTUFBTSxHQUFHLHVCQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBcUI7WUFFbkQsSUFBSSxHQUFpQixDQUFDO1lBQ3RCLEdBQUcsR0FBRyx1QkFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7aUJBQy9CLFFBQVEsQ0FBQyxTQUFTLENBQUM7aUJBQ25CLFNBQVMsQ0FBQyxVQUFVLENBQUM7aUJBQ3JCLFNBQVMsQ0FBQztnQkFDUCxJQUFJLENBQUMsTUFBTTtvQkFDSCxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO3dCQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7b0JBQ3ZDLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDOUMsQ0FBQztvQkFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM5QixDQUFDO2dCQUNELEtBQUssQ0FBQyxHQUFHO29CQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDekMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsQ0FBQztnQkFDRCxRQUFRO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQztnQkFDakQsQ0FBQzthQUNKLENBQUMsQ0FBQztZQUVQLGlEQUFpRDtZQUNqRCxNQUFNLENBQUM7Z0JBQ0gsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDTixHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7WUFDTCxDQUFDLENBQUM7UUFFTixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQzthQUMzQixRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0NBQ0osQ0FBQTtBQWpFWSxjQUFjO0lBRDFCLGlCQUFVLEVBQUU7O0dBQ0EsY0FBYyxDQWlFMUI7QUFqRVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzL09ic2VydmVyJztcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS9pbnRlcnZhbCc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21lcmdlTWFwJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbXVsdGljYXN0JztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdGFrZVVudGlsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBvb2xpbmdTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uT3Blbk9yZGVyc0NvbnRyb2xsZXI6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb25Db250cm9sbGVyOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vXG4gICAgfVxuXG4gICAgZ2V0T3Blbk9yZGVyc0NvbnRyb2xsZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1YnNjcmlwdGlvbk9wZW5PcmRlcnNDb250cm9sbGVyO1xuICAgIH1cblxuICAgIHN0b3BPcGVuT3JkZXJzUG9vbGVycygpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25PcGVuT3JkZXJzQ29udHJvbGxlci5uZXh0KHRydWUpO1xuICAgIH1cblxuICAgIHN0b3BQb29sZXJzKCkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbkNvbnRyb2xsZXIubmV4dCh0cnVlKTtcbiAgICB9XG5cbiAgICBleGVjdXRlPFQ+KG9wZXJhdGlvbjogKCkgPT4gT2JzZXJ2YWJsZTxUPiwgZnJlcXVlbmN5OiBudW1iZXIgPSAxMDAwLFxuICAgICAgICAgICAgICAgY29udHJvbGxlcj86IFN1YmplY3Q8YW55PiwgZGVidWc/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcblxuICAgICAgICBjb25zdCBzdWJqZWN0ID0gbmV3IFN1YmplY3QoKTtcbiAgICAgICAgaWYgKHR5cGVvZiBjb250cm9sbGVyID09PSAndW5kZWZpbmVkJyB8fCAhY29udHJvbGxlcikge1xuICAgICAgICAgICAgY29udHJvbGxlciA9IHRoaXMuc3Vic2NyaXB0aW9uQ29udHJvbGxlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8VD4pID0+IHtcblxuICAgICAgICAgICAgbGV0IHN1YjogU3Vic2NyaXB0aW9uO1xuICAgICAgICAgICAgc3ViID0gT2JzZXJ2YWJsZS5pbnRlcnZhbChmcmVxdWVuY3kpXG4gICAgICAgICAgICAgICAgLm1lcmdlTWFwKG9wZXJhdGlvbilcbiAgICAgICAgICAgICAgICAudGFrZVVudGlsKGNvbnRyb2xsZXIpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSh7XG4gICAgICAgICAgICAgICAgICAgIG5leHQocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkZWJ1ZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0RlYnVnIHBhcmFtIG1pc3NpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTm90aWZpY2F0aW9uIEZyb206ICcsIGRlYnVnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyIC8gUG9vbGVyJywgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NvbXBsZXRlZCBieSB0YWtlVW50aWwgc2lnbmFsJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uIHdpdGggaGFuZGxlciB0byB1bnN1YnNjcmliZVxuICAgICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNvdXJjZS5tdWx0aWNhc3Qoc3ViamVjdClcbiAgICAgICAgICAgIC5yZWZDb3VudCgpO1xuICAgIH1cbn1cbiJdfQ==