 package com.npp.france.controller;

import org.springframework.beans.factory.annotation.Autowired;
import com.npp.france.entity.Event;
import com.npp.france.service.EventService;
import com.npp.france.repository.EventRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.time.ZonedDateTime;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.io.IOException;
import java.util.Date;
import java.io.File;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventService eventService;


    private final Path imageStorageLocation = Paths.get("src/main/resources/static/images").toAbsolutePath().normalize();
    private final Path videoStorageLocation = Paths.get("src/main/resources/static/videos").toAbsolutePath().normalize();

    public EventController() throws IOException {
        Files.createDirectories(imageStorageLocation);
        Files.createDirectories(videoStorageLocation);
    }


    @GetMapping("/all")
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // @GetMapping("/{id}")
    // public ResponseEntity<Event> getEventById(@PathVariable Long id) {
    //     Event event = eventRepository.findById(id)
    //             .orElseThrow(() -> new CustomNotFoundException("Event not found with id " + id));
    //     return ResponseEntity.ok(event);
    // }

    // @PostMapping("/create")
    // public Event createEvent(@RequestBody Event event) {
    //       Event createdEvent = eventRepository.save(event);
    //     return new ResponseEntity<>(createdEvent, HttpStatus.CREATED);
    // }
    // public EventController(EventRepository eventRepository) {
    //     this.eventRepository = eventRepository;
    // }

    @PostMapping("/create")
    @CrossOrigin(origins = "http://localhost:4200")
   public ResponseEntity<Event> createEvent(@RequestParam("title") String title,
                                             @RequestParam("description") String description,
                                             @RequestParam("date") String date,
                                             @RequestParam("photos") List<MultipartFile> photos,
                                             @RequestParam("videos") List<MultipartFile> videos) {
         try {

            //  ZoneId parisZoneId = ZoneId.of("Europe/Paris");
            DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
            LocalDate parsedDate = LocalDate.parse(date, formatter);
            
               // Handle photos
                        for (MultipartFile photo : photos) {
                            String fileName = UUID.randomUUID().toString() + "_" + StringUtils.cleanPath(photo.getOriginalFilename());
                            Path targetLocation = imageStorageLocation.resolve(fileName);
                            Files.copy(photo.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
                        }
            
                        //Handle videos
                     
                            for (MultipartFile video : videos) {
                                String fileName = UUID.randomUUID().toString() + "_" + StringUtils.cleanPath(video.getOriginalFilename());
                                Path targetLocation = videoStorageLocation.resolve(fileName);
                                Files.copy(video.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
                            }
                
                     
                      
                        Event createdEvent = eventService.createEvent(title, description, parsedDate, photos, videos);
                        return new ResponseEntity<>(createdEvent, HttpStatus.CREATED);
        }catch (IOException e) {
        e.printStackTrace();  // Log stack trace for debugging
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    } 

                                             }
    
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Optional<Event> event = eventService.getEventById(id);
        return event.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }


}