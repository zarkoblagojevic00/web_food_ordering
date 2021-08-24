package dtos;

import beans.restaurants.Restaurant;

import java.io.InputStream;

public class RestaurantCreationDTO {
    final private Restaurant restaurant;
    final private InputStream fileInputStream;
    final private String filename;
    final private long selectedManagerId;

    public RestaurantCreationDTO(Restaurant restaurant, InputStream fileInputStream, String filename, long selectedManagerId) {
        this.restaurant = restaurant;
        this.fileInputStream = fileInputStream;
        this.filename = filename;
        this.selectedManagerId = selectedManagerId;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public InputStream getFileInputStream() {
        return fileInputStream;
    }

    public String getFilename() {
        return filename;
    }

    public long getSelectedManagerId() {
        return selectedManagerId;
    }
}
