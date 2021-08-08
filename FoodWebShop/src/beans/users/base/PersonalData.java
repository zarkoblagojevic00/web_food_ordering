package beans.users.base;

import java.util.Date;

public class PersonalData {
    private String firstName;
    private String lastName;
    private Gender gender;
    private Date dateOfBirth;

    public PersonalData() {
    }

    public PersonalData(String firstName, String lastName, Gender gender, Date dateOfBirth) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
    }

    public String getFirstName() {
        return firstName;
    }
}
