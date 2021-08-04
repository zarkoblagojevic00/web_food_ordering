package beans;

public class TestChild extends Entity{
    private String child;
    private User user;


    public TestChild(String child, User user) {
        this.child = child;
        this.user = user;
    }

    public String getChild() {
        return child;
    }

    public User getUser() {
        return user;
    }
}
