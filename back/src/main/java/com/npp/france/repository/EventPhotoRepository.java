package com.npp.france.repository;

import com.npp.france.entity.EventPhoto;
import com.npp.france.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventPhotoRepository extends JpaRepository<EventPhoto, Long> {
}
