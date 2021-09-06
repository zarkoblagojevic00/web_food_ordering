package security;

import beans.users.base.User;
import beans.users.roles.Guest;
import services.UserService;
import services.auth.AuthenticationService;

import javax.annotation.Priority;
import javax.inject.Inject;
import javax.inject.Scope;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.PreMatching;
import javax.ws.rs.ext.Provider;

@Provider
@PreMatching
@Priority(Priorities.AUTHENTICATION)
public class JWTAuthenticationFilter implements ContainerRequestFilter {
    @Inject
    private UserService userService;

    @Override
    public void filter(ContainerRequestContext requestContext) {
        if (isAuthRequest(requestContext))
            return;
        try {
            setSecurityContext(requestContext);
        } catch (Exception e) {
            System.out.println("No such user!");
            e.printStackTrace();
        }
    }

    private boolean isAuthRequest(ContainerRequestContext requestContext) {
        return requestContext.getUriInfo().getPath().contains("auth");
    }

    private void setSecurityContext(ContainerRequestContext requestContext) {
        User currentUser = getCurrentUser(requestContext);
        String scheme = getScheme(requestContext);
        requestContext.setSecurityContext(new AppSecurityContext(currentUser, scheme));
    }

    private User getCurrentUser(ContainerRequestContext requestContext) {
        String token = extractToken(requestContext);
        return (token == null || token.isEmpty()) ? createGuestUser() : authenticateUser(token);
    }

    private Guest createGuestUser() {
        return new Guest();
    }

    private String extractToken(ContainerRequestContext requestContext) {
        String authHeaderValue = requestContext.getHeaderString("authorization");
        return (authHeaderValue == null) ? null : getTokenFromHeader(authHeaderValue);
    }

    private String getTokenFromHeader(String authHeaderValue) {
        return authHeaderValue.replaceFirst("Bearer", "").trim();
    }

    private User authenticateUser(String token) {
        JwtUtil jwtUtil = new JwtUtil();
        if (!jwtUtil.isValidToken(token)) {
            return createGuestUser();
        }
        String username = jwtUtil.extractUsername(token);
        return userService.findUserByUsername(username);
    }

    private String getScheme(ContainerRequestContext requestContext) {
        return requestContext.getUriInfo().getRequestUri().getScheme();
    }
}
