package com.npp.france.service;

import com.npp.france.entity.Event;
import com.npp.france.entity.EventPhoto;
import com.npp.france.entity.EventVideo;
import com.npp.france.repository.EventRepository;
import com.npp.france.repository.EventPhotoRepository;
import com.npp.france.repository.EventVideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.UUID;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventPhotoRepository eventPhotoRepository;

    @Autowired
    private EventVideoRepository eventVideoRepository;

    private final Path imageStorageLocation = Paths.get("src/main/resources/static/images").toAbsolutePath().normalize();
    private final Path videoStorageLocation = Paths.get("src/main/resources/static/videos").toAbsolutePath().normalize();

    public EventService() throws IOException {
        Files.createDirectories(imageStorageLocation);
        Files.createDirectories(videoStorageLocation);
    }

    public Event createEvent(String title, String description, String date,
                             List<MultipartFile> photos, List<MultipartFile> videos) throws IOException {
        Event event = new Event();
        event.setTitle(title);
        event.setDescription(description);
        event.setDate(new Date());

        List<EventPhoto> photoEntities = new ArrayList<>();
        for (MultipartFile photo : photos) {
            String photoUrl = saveFile(photo, imageStorageLocation);
            EventPhoto eventPhoto = new EventPhoto();
            eventPhoto.setUrl(photoUrl);
            eventPhoto.setEvent(event);
            photoEntities.add(eventPhoto);
        }
        event.setPhotos(photoEntities);

        List<EventVideo> videoEntities = new ArrayList<>();
        for (MultipartFile video : videos) {
            String videoUrl = saveFile(video, videoStorageLocation);
            EventVideo eventVideo = new EventVideo();
            eventVideo.setUrl(videoUrl);
            eventVideo.setEvent(event);
            videoEntities.add(eventVideo);
        }
        event.setVideos(videoEntities);

        // Save event first to ensure IDs are assigned
        Event savedEvent = eventRepository.save(event);

        // Save photos and videos to their respective tables
        for (EventPhoto photo : photoEntities) {
            photo.setEvent(savedEvent); // Update the event reference
        }
        eventPhotoRepository.saveAll(photoEntities);

        for (EventVideo video : videoEntities) {
            video.setEvent(savedEvent); // Update the event reference
        }
        eventVideoRepository.saveAll(videoEntities);

        return savedEvent;
    }

    private String saveFile(MultipartFile file, Path storageLocation) throws IOException {
        if (!Files.exists(storageLocation)) {
            Files.createDirectories(storageLocation);
        }
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = storageLocation.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return filePath.getFileName().toString(); // Return only the file name
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }
}