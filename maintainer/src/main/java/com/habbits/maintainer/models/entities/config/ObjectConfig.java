package com.habbits.maintainer.models.entities.config;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.bson.types.ObjectId;

import java.io.IOException;

public class ObjectConfig {
    public static class ObjectSerializerId extends JsonSerializer<ObjectId> {
        @Override
        public void serialize(ObjectId id, JsonGenerator gen,
                              SerializerProvider serializers) throws IOException {
            if(id == null) {
                gen.writeNull();
            } else {
                gen.writeString(id.toHexString());
            }
        }
    }

    public static class ObjectDeserializerId extends JsonDeserializer<ObjectId> {
        @Override
        public ObjectId deserialize(JsonParser p, DeserializationContext ctx) throws IOException{
           String id = p.getValueAsString();
           return id == null ? null : new ObjectId(id);
        }
    }
}
