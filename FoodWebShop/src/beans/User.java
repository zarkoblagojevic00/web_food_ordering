package beans;

import java.util.Date;

public class User extends Entity{
    private String firstName;
    private String lastName;
    private int points;
    private Date dateOfBirth;
    private TestChild child;

    public User() {
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public int getPoints() {
        return points;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public TestChild getChild() {
        return child;
    }

    public void setChild(TestChild child) {
        this.child = child;
    }

    public User(String firstName, String lastName, int points, Date dateOfBirth) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.points = points;
        this.dateOfBirth = dateOfBirth;
    }

}
