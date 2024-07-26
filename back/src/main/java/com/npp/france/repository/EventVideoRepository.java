package com.npp.france.repository;

import com.npp.france.entity.EventVideo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventVideoRepository extends JpaRepository<EventVideo, Long> {
}