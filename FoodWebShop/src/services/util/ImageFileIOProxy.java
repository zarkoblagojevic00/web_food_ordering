package services.util;

import config.PathFinder;

import javax.ws.rs.WebApplicationException;
import java.io.*;
import java.util.UUID;

public class ImageFileIOProxy {
    final private PathFinder pathFinder;

    public ImageFileIOProxy() {
        pathFinder = new PathFinder("Resources", "images");
    }

    public String saveImage(FileUploadDTO fileUploadDTO) {
        try {
            saveBinaryData(fileUploadDTO);
        } catch (IOException e) {
            throw new WebApplicationException("Error while uploading file. Please try again !!");
        }
        return pathFinder.getAppendedToSubRootUnix();
    }

    public File getImage(String relPath) {
        pathFinder.appendToCurrentPath(relPath);
        return new File(pathFinder.getCurrentPath());
    }

    private void saveBinaryData(FileUploadDTO fileUploadDTO) throws IOException {
        tryCreateDirectory(fileUploadDTO.getResourceFolderName(), fileUploadDTO.getResourceSubfolderName());
        writeFile(fileUploadDTO.getFileInputStream(), fileUploadDTO.getFileName());
    }

    private void tryCreateDirectory(String folderName, String subfolderName) throws IOException {
        pathFinder.appendToCurrentPath(folderName, subfolderName);
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
