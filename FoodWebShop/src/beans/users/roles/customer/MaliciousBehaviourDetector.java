package beans.users.roles.customer;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class MaliciousBehaviourDetector {
    private static final long NUM_PAST_DAYS_OF_INTEREST = 30L;
    private static final long CANCELED_ORDERS_THRESHOLD = 5L;

    private final LocalDateTime periodOfInterestStart;

    public MaliciousBehaviourDetector() {
        this.periodOfInterestStart = LocalDateTime.now().minusDays(NUM_PAST_DAYS_OF_INTEREST);
    }

    public CustomerActivityReport createActivityReport(Collection<Activity> customerActivities) {
        return new CustomerActivityReport(getNumOfCanceledOrdersInPeriodOfInterest(customerActivities));
    }

    public UserActivityStatus getCustomerActivityStatus(Collection<Activity> customerActivities) {
        return (userExceededNumOfAllowedOrderCancellations(customerActivities)) ?
                UserActivityStatus.SUSPICIOUS :
                UserActivityStatus.OK;
    }

    private boolean userExceededNumOfAllowedOrderCancellations(Collection<Activity> customerActivities) {
        return getNumOfCanceledOrdersInPeriodOfInterest(customerActivities) > CANCELED_ORDERS_THRESHOLD;
    }

    private long getNumOfCanceledOrdersInPeriodOfInterest(Collection<Activity> customerActivities) {
        Map<ActivityType, List<Activity>> activityMap = getActivityMap(customerActivities);
        if (activityMap.isEmpty()) return 0;
        return activityMap.get(ActivityType.CANCEL_ORDER).size();
    }

    private Map<ActivityType, List<Activity>> getActivityMap(Collection<Activity> customerActivities) {
        return customerActivities.stream()
                .filter(this::isWithinPeriodOfInterest)
                .collect(Collectors.groupingBy(Activity::getType));
    }

    private boolean isWithinPeriodOfInterest(Activity activity) {
        LocalDateTime dateOccurred = convertToLocalDateTime(activity.getDateOccurred());
        return periodOfInterestStart.isBefore(dateOccurred);
    }

    public LocalDateTime convertToLocalDateTime(Date dateToConvert) {
        return dateToConvert.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
    }
}
