package beans.users.base;

public interface Identifiable {
    boolean isMyIdentity(Credentials credentials);
}
