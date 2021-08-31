package services.exceptions;

public class FieldNotUniqueException extends RuntimeException {
    public FieldNotUniqueException(String message) {
        super(message);
    }
}
