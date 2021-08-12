package services.exceptions;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class BadCredentialsExceptionMapper implements ExceptionMapper<BadCredentialsException> {

    @Override
    public Response toResponse(BadCredentialsException e) {
        return Response.status(Response.Status.NOT_FOUND).build();
    }
}
