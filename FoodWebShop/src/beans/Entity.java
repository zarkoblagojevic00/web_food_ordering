package beans;

public abstract class Entity {
    private long id;
    private boolean deleted;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public Entity() {
        this.id = -1;
        this.deleted = false;
    }
}
