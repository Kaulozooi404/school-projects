let currentSketch;
let currentScriptElement;

// Function to dynamically load a new sketch
function loadSketch(path) {
  // Remove the previous sketch if it exists
  if (currentSketch) {
    currentSketch.remove(); // This will stop and remove the previous sketch's canvas
  }
  
  // Remove the previously appended sketch script if it exists
  if (currentScriptElement) {
    currentScriptElement.remove();
  }

  // Create a new p5 sketch
  let sketch = function(p) {
    p.preload = function() {
      // Dynamically create a script element for the new sketch.js file
      currentScriptElement = document.createElement('script');
      currentScriptElement.src = `projects/${path}`;  // Set the source to the selected project's sketch.js file
      document.body.appendChild(currentScriptElement); // Append the script to the body
    };

    p.setup = function() {
      let canvas = p.createCanvas(600, 400);  // Adjust canvas size as needed
      canvas.parent('canvas-container');  // Attach canvas to the div container
    };
  };

  // Instantiate the new p5.js sketch
  currentSketch = new p5(sketch);
}
