// Array to hold all the boids (birds)
let boids = [];

function setup() {
  createCanvas(1000, 500);  // Create a canvas of 600x400 pixels
  for (let i = 0; i < 2000; i++) {
    boids.push(new Boid());  // Create 100 boids
  }
}

function draw() {
  background(51);  // Dark background
  for (let boid of boids) {
    boid.edges();   // Check if the boid hits the edge
    boid.flock(boids);  // Apply flocking behavior
    boid.update();  // Update the position of the boid
    boid.show();    // Draw the boid on the screen
  }
}

class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));  // Random starting position
    this.velocity = createVector(random(-2, 2), random(-2, 2));   // Random starting velocity
    this.acceleration = createVector(0, 0);   // Start with no acceleration
    this.maxForce = 0.2;   // Maximum steering force
    this.maxSpeed = 3;     // Maximum speed
  }

  edges() {
    // Wrap around the edges of the canvas
    if (this.position.x > width) this.position.x = 0;
    if (this.position.x < 0) this.position.x = width;
    if (this.position.y > height) this.position.y = 0;
    if (this.position.y < 0) this.position.y = height;
  }

  // Flocking behavior: separation, alignment, cohesion
  flock(boids) {
    let alignment = this.align(boids);
    let cohesion = this.cohere(boids);
    let separation = this.separate(boids);

    // Add forces to acceleration
    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }

  // Update the position and velocity
  update() {
    this.velocity.add(this.acceleration);  // Add acceleration to velocity
    this.velocity.limit(this.maxSpeed);    // Limit the velocity
    this.position.add(this.velocity);      // Move to the new position
    this.acceleration.mult(0);             // Reset acceleration for the next frame
  }

  // Display the boid as a triangle
  show() {
    strokeWeight(8);
    stroke(255);
    point(this.position.x, this.position.y);  // Draw the boid
  }

  // Alignment: Steer towards the average heading of nearby boids
  align(boids) {
    let perceptionRadius = 50;
    let steering = createVector(0, 0);
    let total = 0;

    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other != this && d < perceptionRadius) {
        steering.add(other.velocity);  // Add the velocity of neighbors
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);  // Get the average velocity
      steering.setMag(this.maxSpeed);  // Set magnitude to max speed
      steering.sub(this.velocity);     // Steering = desired velocity - current velocity
      steering.limit(this.maxForce);   // Limit the force
    }
    return steering;
  }

  // Cohesion: Steer towards the average position of nearby boids
  cohere(boids) {
    let perceptionRadius = 50;
    let steering = createVector(0, 0);
    let total = 0;

    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other != this && d < perceptionRadius) {
        steering.add(other.position);  // Add the position of neighbors
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);  // Get the average position
      steering.sub(this.position);  // Desired position - current position
      steering.setMag(this.maxSpeed);  // Set magnitude to max speed
      steering.sub(this.velocity);
      steering.limit(this.maxForce);  // Limit the force
    }
    return steering;
  }

  // Separation: Steer to avoid crowding local boids
  separate(boids) {
    let perceptionRadius = 25;
    let steering = createVector(0, 0);
    let total = 0;

    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other != this && d < perceptionRadius) {
        let diff = p5.Vector.sub(this.position, other.position);  // Calculate direction to move away
        diff.div(d * d);  // Weight by distance (the closer, the stronger the force)
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);  // Average out
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }
}
