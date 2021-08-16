package repositories.json.repos;

import beans.users.roles.customer.Activity;
import repositories.interfaces.ActivityRepository;
import repositories.json.repos.base.JsonFileRepository;

import java.util.Collection;
import java.util.stream.Collectors;

public class ActivityJsonFileRepository extends JsonFileRepository<Activity> implements ActivityRepository {
    public ActivityJsonFileRepository() {
        super(Activity.class);
    }

    @Override
    public Collection<Activity> getActivitiesForUser(long userId) {
        return getAll().stream()
                .filter(activity -> activity.isResponsible(userId))
                .collect(Collectors.toList());
    }
}
