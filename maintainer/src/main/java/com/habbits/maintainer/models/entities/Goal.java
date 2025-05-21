package com.habbits.maintainer.models.entities;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.habbits.maintainer.models.entities.config.ObjectConfig;
import lombok.Data;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "goals")
public class Goal {
    @JsonSerialize(using = ObjectConfig.ObjectSerializerId.class)
    @JsonDeserialize(using = ObjectConfig.ObjectDeserializerId.class)
    @Id private ObjectId id;
    @NonNull private String objective;
    @NonNull private Period unit;
    private int steps;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    @DBRef private User user;
    @DBRef private Hobby hobby;
}


