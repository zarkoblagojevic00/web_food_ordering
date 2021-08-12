package security;

import beans.users.base.Role;
import beans.users.base.User;

import javax.ws.rs.core.SecurityContext;
import java.security.Principal;

public class AppSecurityContext implements SecurityContext {
    final private User user;
    final private String schema;

    public AppSecurityContext(User user, String schema) {
        this.user = user;
        this.schema = schema;
    }

    @Override
    public Principal getUserPrincipal() {
        return this.user;
    }

    @Override
    public boolean isUserInRole(String s) {
        return this.user.hasAuthority(Role.valueOf(s));
    }

    @Override
    public boolean isSecure() {
       return "https".equals(this.schema);
    }

    @Override
    public String getAuthenticationScheme() {
        return SecurityContext.BASIC_AUTH;
    }
}
