package beans;

public class TestChild extends Entity{
    private String text;
    private User user;

    public TestChild() {
    }

    public TestChild(String text, User user) {
        this.text = text;
        this.user = user;
    }

    public TestChild(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public User getUser() {
        return user;
    }
}
