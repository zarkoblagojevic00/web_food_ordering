package dtos;

import beans.restaurants.RequestStatus;
import beans.restaurants.requests.Comment;
import beans.users.roles.customer.Customer;

public class CommentOverviewDTO {
    final private long id;
    final private String authorFullName;
    final private int mark;
    final private String content;
    final private RequestStatus status;

    public CommentOverviewDTO(Comment comment, Customer author) {
        id = comment.getId();
        authorFullName = author.getFirstName() + " " + author.getLastName();
        mark = comment.getMark();
        content = comment.getContent();
        status = comment.getStatus();
    }
}
