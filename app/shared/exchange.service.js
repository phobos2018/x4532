"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
require("rxjs/add/observable/interval");
require("rxjs/add/operator/mergeMap");
require("rxjs/add/operator/multicast");
require("rxjs/add/operator/takeUntil");
let ExchangeService = class ExchangeService {
    constructor() {
        //
    }
    calculateOffset(prevDay, last) {
        return (last - prevDay) / prevDay * 100;
    }
    calculateSpread(bid, ask) {
        return ((ask - bid) / ask * 100).toFixed(1) + '%';
    }
    getPairTypes() {
        return ['BTC', 'ETH'];
    }
};
ExchangeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ExchangeService);
exports.ExchangeService = ExchangeService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjaGFuZ2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4Y2hhbmdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx3Q0FBbUQ7QUFJbkQsd0NBQXNDO0FBQ3RDLHNDQUFvQztBQUNwQyx1Q0FBcUM7QUFDckMsdUNBQXFDO0FBR3JDLElBQWEsZUFBZSxHQUE1QjtJQUNJO1FBQ0ksRUFBRTtJQUNOLENBQUM7SUFFRCxlQUFlLENBQUMsT0FBTyxFQUFFLElBQUk7UUFDekIsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLE9BQU8sR0FBRyxHQUFHLENBQUM7SUFDNUMsQ0FBQztJQUNELGVBQWUsQ0FBQyxHQUFHLEVBQUUsR0FBRztRQUNwQixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUN0RCxDQUFDO0lBQ0QsWUFBWTtRQUNSLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMxQixDQUFDO0NBQ0osQ0FBQTtBQWRZLGVBQWU7SUFEM0IsaUJBQVUsRUFBRTs7R0FDQSxlQUFlLENBYzNCO0FBZFksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJ3J4anMvT2JzZXJ2ZXInO1xuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL2ludGVydmFsJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWVyZ2VNYXAnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tdWx0aWNhc3QnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90YWtlVW50aWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRXhjaGFuZ2VTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy9cbiAgICB9XG5cbiAgICBjYWxjdWxhdGVPZmZzZXQocHJldkRheSwgbGFzdCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAobGFzdCAtIHByZXZEYXkpIC8gcHJldkRheSAqIDEwMDtcbiAgICB9XG4gICAgY2FsY3VsYXRlU3ByZWFkKGJpZCwgYXNrKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICgoYXNrIC0gYmlkKSAvIGFzayAqIDEwMCkudG9GaXhlZCgxKSArICclJztcbiAgICB9XG4gICAgZ2V0UGFpclR5cGVzKCk6IEFycmF5PHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gWydCVEMnLCAnRVRIJ107XG4gICAgfVxufVxuIl19