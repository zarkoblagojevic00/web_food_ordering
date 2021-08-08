package beans;

import java.util.Date;
import java.util.List;

public class TestSerialUser extends Entity{
    private String firstName;
    private String lastName;
    private int points;
    private Date dateOfBirth;
    private TestChild child;
    private List<TestChild> children;

    public TestSerialUser() {
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

    public List<TestChild> getChildren() {
        return children;
    }

    public void setChildren(List<TestChild> children) {
        this.children = children;
    }


    public void setChild(TestChild child) {
        this.child = child;
    }

    public TestSerialUser(String firstName, String lastName, int points, Date dateOfBirth) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.points = points;
        this.dateOfBirth = dateOfBirth;
    }

}
