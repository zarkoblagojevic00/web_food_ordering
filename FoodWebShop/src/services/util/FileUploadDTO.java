package services.util;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;

import java.io.InputStream;
import java.util.UUID;

public class FileUploadDTO {
    final private InputStream fileInputStream;
    final private String uniqueName;
    final private String realName;
    final private String resourceFolderName;
    final private boolean useUniqueName;
    final private String extension;
    private String resourceSubfolderName;

    public FileUploadDTO(InputStream fileInputStream,
                         FormDataContentDisposition fileMetaData,
                         String resourceFolderName,
                         long resourceEntityId,
                         boolean useUniqueName) {
        this.fileInputStream = fileInputStream;
        this.realName = fileMetaData.getFileName();
        this.resourceFolderName = resourceFolderName;
        setResourceSubfolderName(resourceEntityId);
        this.extension = parseExtension();
        this.uniqueName = generateUniqueName();
        this.useUniqueName = useUniqueName;
    }

    public FileUploadDTO(InputStream fileInputStream,
                         FormDataContentDisposition fileMetaData,
                         String resourceFolderName,
                         boolean useUniqueName) {
        this.fileInputStream = fileInputStream;
        this.realName = fileMetaData.getFileName();
        this.resourceFolderName = resourceFolderName;
        this.extension = parseExtension();
        this.uniqueName = generateUniqueName();
        this.useUniqueName = useUniqueName;
    }

    public InputStream getFileInputStream() {
        return fileInputStream;
    }

    public String getExtension() {
        return extension;
    }

    public String getFileName() {
        return (useUniqueName) ? uniqueName : realName;
    }

    public String getResourceFolderName() {
        return resourceFolderName;
    }

    public String getResourceSubfolderName() {
        return resourceSubfolderName;
    }

    public void setResourceSubfolderName(long resourceEntityId) {
        this.resourceSubfolderName = Long.toString(resourceEntityId);
    }

    private String parseExtension() {
        if (!realName.contains(".")) {
            return "";
        }
        return realName.split("\\.")[1];
    }

    private String generateUniqueName() {
        String uuid = UUID.randomUUID().toString();
        return uuid + "." + extension;
    }
}
