/**
 * Represents a Hobby entity.
 */
export interface Hobby {
  /** Unique identifier (ObjectId string) */
  id: string;
  /** Title of the hobby */
  title: string;
  /** Category for grouping hobbies */
  category: string;
  /** Description of the hobby */
  description: string;
  /** ISO timestamp when created */
  createdAt?: string;
  /** ISO timestamp when updated */
  updatedAt?: string;
}

/**
 * Represents a Goal associated with a User and a Hobby.
 */
export interface Goal {
  /** Unique identifier (ObjectId string) */
  id: string;
  /** Objective description */
  objective: string;
  /** Period unit in ISO 8601 duration format (e.g., 'P1M') */
  unit: string;
  /** Number of steps toward the goal */
  steps: number;
  /** ISO timestamp when created */
  createdAt?: string;
  /** ISO timestamp when updated */
  updatedAt?: string;
  /** User ID (reference) */
  userId?: string;
  /** Hobby ID (reference) */
  hobbyId?: string;
}

/**
 * Represents a Task under a specific Goal.
 */
export interface Task {
  /** Unique identifier (ObjectId string) */
  id: string;
  /** Name of the task */
  taskName: string;
  /** Description of the task */
  description: string;
  /** Duration in ISO 8601 format (e.g., 'PT30M') */
  duration: string;
  /** How many times to repeat */
  repetition: number;
  /** ISO timestamp when created */
  createdAt?: string;
  /** ISO timestamp when updated */
  updatedAt?: string;
  /** Goal ID (reference) */
  goalId?: string;
}

export type Period = 'Hour' | 'Day' | 'Week' | 'Month' | 'Year';
