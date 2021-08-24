package services.util;

import config.PathFinder;

import javax.ws.rs.WebApplicationException;
import java.io.*;

public class ImageFileIOProxy {
    final private PathFinder pathFinder;

    public ImageFileIOProxy() {
        pathFinder = new PathFinder("Resources", "images");
    }

    public String saveImage(InputStream fileInputStream, String folderName, long subfolderId, String filename) {
        try {
            saveBinaryData(fileInputStream, folderName, subfolderId, filename);
        } catch (IOException e) {
            throw new WebApplicationException("Error while uploading file. Please try again !!");
        }
        return pathFinder.getAppendedToSubRootUnix();
    }

    public File getImage(String relPath) {
        pathFinder.appendToCurrentPath(relPath);
        return new File(pathFinder.getCurrentPath());
    }

    private void saveBinaryData(InputStream fileInputStream, String folderName, long subfolderId, String filename) throws IOException {
        tryCreateDirectory(folderName, subfolderId);
        writeFile(fileInputStream, filename);
    }

    private void tryCreateDirectory(String folderName, long subfolderId) throws IOException {
        pathFinder.appendToCurrentPath(folderName, Long.toString(subfolderId));
        File newImage = new File(pathFinder.getCurrentPath());
        newImage.mkdirs();
    }

    private void writeFile(InputStream fileInputStream, String filename) throws IOException {
        pathFinder.appendToCurrentPath(filename);
        OutputStream out = new FileOutputStream(pathFinder.getCurrentPath());

        int read = 0;
        byte[] bytes = new byte[1024];

        while ((read = fileInputStream.read(bytes)) != -1)
        {
            out.write(bytes, 0, read);
        }
        out.flush();
        out.close();
    }

}
