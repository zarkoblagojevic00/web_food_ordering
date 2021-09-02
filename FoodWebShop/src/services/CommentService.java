package services;

import beans.restaurants.RequestStatus;
import beans.restaurants.requests.Comment;
import beans.users.roles.customer.Customer;
import dtos.CommentOverviewDTO;
import repositories.interfaces.CommentRepository;
import repositories.interfaces.CustomerRepository;

import javax.inject.Inject;
import java.util.Collection;
import java.util.stream.Collectors;

public class CommentService {
    final private CommentRepository commentRepo;
    final private CustomerRepository customerRepo;

    @Inject
    public CommentService(CommentRepository commentRepo, CustomerRepository customerRepo) {
        this.commentRepo = commentRepo;
        this.customerRepo = customerRepo;
    }

    public Collection<CommentOverviewDTO> getCommentsForRestaurant(long restaurantId) {
        return commentRepo.getCommentsForRestaurant(restaurantId).stream()
                .map(this::createCommentOverviewDTO)
                .collect(Collectors.toList());
    }

    public Collection<CommentOverviewDTO> getCommentsWithStatusForRestaurant(long restaurantId, RequestStatus status) {
        return commentRepo.getCommentsForRestaurant(restaurantId).stream()
                .filter(comment -> comment.getStatus() == status)
                .map(this::createCommentOverviewDTO)
                .collect(Collectors.toList());
    }

    public Comment postComment(long restaurantId, Comment newComment) {
        return commentRepo.save(new Comment(restaurantId, newComment));
    }

    private CommentOverviewDTO createCommentOverviewDTO(Comment comment) {
        Customer author = customerRepo.get(comment.getAuthor().getId());
        return new CommentOverviewDTO(comment, author);
    }

    public Comment answerPendingComment(long commentId, RequestStatus status) {
        Comment existing = commentRepo.get(commentId);
        if (status == RequestStatus.APPROVED) {
            existing.approve();
        } else {
            existing.reject();
        }
        return commentRepo.update(existing);
    }

}
