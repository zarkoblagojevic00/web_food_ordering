package controllers;

import beans.restaurants.RequestStatus;
import beans.restaurants.requests.Comment;
import services.CommentService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("comments")
public class CommentController {
    @Inject
    private CommentService commentService;

    private @PathParam("restaurantId") long restaurantId;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCommentsForRestaurant() {
        return Response.ok(commentService.getCommentsForRestaurant(restaurantId)).build();
    }

    @GET
    @Path("get")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCommentsForRestaurant(@QueryParam("status") RequestStatus status) {
        return Response.ok(commentService.getCommentsWithStatusForRestaurant(restaurantId, status)).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response postCommentForRestaurant(Comment newComment) {
        Comment posted = commentService.postComment(restaurantId, newComment);
        return Response.ok(posted).build();
    }

    @PUT
    @Path("{commentId}/approval")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response answerPendingComment(@PathParam("commentId") long commentId,  RequestStatus status) {
        Comment answered = commentService.answerPendingComment(commentId, status);
        return Response.ok(answered).build();
    }

}
