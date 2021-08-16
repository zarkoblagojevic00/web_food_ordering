package services;

import beans.users.roles.customer.*;
import repositories.interfaces.ActivityRepository;

import javax.inject.Inject;
import java.util.Collection;

public class ActivityService {
    final private ActivityRepository activityRepo;
    final private MaliciousBehaviourDetector detector;

    @Inject
    public ActivityService(ActivityRepository activityRepo) {
        this.activityRepo = activityRepo;
        this.detector = new MaliciousBehaviourDetector();
    }

    public CustomerActivityReport createCustomerActivityReport(Customer customer) {
        Collection<Activity> customerActivities = activityRepo.getActivitiesForUser(customer.getId());
        return detector.createActivityReport(customerActivities);
    }

    public UserActivityStatus saveCustomerActivity(Activity activity) {
        activityRepo.save(activity);
        return getCustomerActivityStatus(activity.getUser());
    }

    private UserActivityStatus getCustomerActivityStatus(Customer customer) {
        Collection<Activity> customerActivities = activityRepo.getActivitiesForUser(customer.getId());
        return detector.getCustomerActivityStatus(customerActivities);
    }

}
