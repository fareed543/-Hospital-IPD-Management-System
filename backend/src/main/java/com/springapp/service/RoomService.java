package com.springapp.service;

import com.springapp.model.AdmissionRoom;
import com.springapp.model.Room;
import com.springapp.model.Admission;
import com.springapp.repository.AdmissionRoomRepository;
import com.springapp.repository.AdmissionRepository;
import com.springapp.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private AdmissionRoomRepository admissionRoomRepository;

    @Autowired
    private AdmissionRepository admissionRepository;

    public Room addRoom(Room room) {
        return roomRepository.save(room);
    }

    public Room updateRoom(Long id, Room updatedRoom) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new RuntimeException("Room not found"));
        room.setName(updatedRoom.getName());
        room.setCharges(updatedRoom.getCharges());
        room.setDescription(updatedRoom.getDescription());
        return roomRepository.save(room);
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Room getRoomById(Long id) {
        return roomRepository.findById(id).orElseThrow(() -> new RuntimeException("Room not found"));
    }

    // Method to move patient to new room
    public AdmissionRoom movePatientToNewRoom(Long roomId, Long admissionId, AdmissionRoom admissionRoom) {
        // Fetch the admission and room
        Admission admission = admissionRepository.findById(admissionId)
                .orElseThrow(() -> new RuntimeException("Admission not found"));

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        // Set the new room and admission in the AdmissionRoom entity
        admissionRoom.setAdmission(admission);
        admissionRoom.setRoom(room);

        // Save the updated AdmissionRoom
        return admissionRoomRepository.save(admissionRoom);
    }
}
