package beans;

public class TestChild extends Entity{
    private String text;
    private TestSerialUser user;

    public TestChild() {
    }

    public TestChild(String text, TestSerialUser user) {
        this.text = text;
        this.user = user;
    }

    public TestChild(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public TestSerialUser getUser() {
        return user;
    }
}
