package com.habbits.maintainer.models.entities;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.habbits.maintainer.models.entities.config.ObjectConfig;
import lombok.Data;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data @Document(collection = "tasks")
public class Task {
    @JsonSerialize(using = ObjectConfig.ObjectSerializerId.class)
    @JsonDeserialize(using = ObjectConfig.ObjectDeserializerId.class)
    @Id private ObjectId id;
    @Indexed(unique = true) @NonNull private String taskName;
    @NonNull private String description;
    @NonNull private Period duration;
    private int repetition;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    @DBRef private Goal goal;
}
