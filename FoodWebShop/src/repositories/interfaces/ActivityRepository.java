package repositories.interfaces;

import beans.users.roles.customer.Activity;
import repositories.interfaces.base.Repository;

import java.util.Collection;

public interface ActivityRepository extends Repository<Activity>{
    public Collection<Activity> getActivitiesForUser(long userId);
}
