package dtos;

import beans.users.base.Gender;
import beans.users.base.User;
import beans.users.roles.customer.UserActivityStatus;

import java.util.Date;

public abstract class UserOverviewDTO {
    final private String username;
    final private String firstName;
    final private String lastName;
    final private Gender gender;
    final private Date dateOfBirth;
    final private UserActivityStatus activityStatus;

    public UserOverviewDTO(User user) {
        this.username = user.getUsername();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.gender = user.getGender();
        this.dateOfBirth = user.getDateOfBirth();
        this.activityStatus = user.getActivityStatus();
    }
}
