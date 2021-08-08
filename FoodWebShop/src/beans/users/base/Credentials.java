package beans.users.base;

public class Credentials implements Identifiable {
    private String username;
    private String password;

    public Credentials() {
    }

    public Credentials(String username, String password) {
        this.username = username;
        this.password = password;
    }

    @Override
    public boolean isMyIdentity(Credentials credentials) {
        return username.equals(credentials.username) && password.equals(credentials.password);
    }
}
