package services.exceptions;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class FieldNotUniqueExceptionMapper implements ExceptionMapper<FieldNotUniqueException> {
    @Override
    public Response toResponse(FieldNotUniqueException e) {
        return Response.status(Response.Status.CONFLICT).build();
    }
}
