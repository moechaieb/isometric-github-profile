function Calendar(grid, debugMode) {
  if(debugMode == true)
    debug = this;
  this.grid = new Grid(grid, 53, 7);
  this.graphicsManager = new GraphicsManager(this.grid);
  this.graphicsManager.draw();
};
