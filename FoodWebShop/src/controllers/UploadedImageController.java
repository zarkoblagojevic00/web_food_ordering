package controllers;

import services.util.ImageFileIOProxy;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.File;

@Path("images")
public class UploadedImageController {
    final private ImageFileIOProxy ioProxy;

    public UploadedImageController() {
        this.ioProxy = new ImageFileIOProxy();
    }

    @GET
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response getImage(@QueryParam("path") String path) {
        File picture = ioProxy.getImage(path);
        return Response.ok(picture, MediaType.APPLICATION_OCTET_STREAM)
                .header("Content-Disposition", "attachment; filename=\"" + picture.getName() + "\"")
                .build();
    }
}
