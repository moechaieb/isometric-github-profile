function Calendar() {
  globalCalendar = this;
  this.grid = new Grid(52, 7);
  this.graphicsManager = new GraphicsManager(this.grid);
  this.grid.init();
  this.graphicsManager.drawBoard();
  this.graphicsManager.drawTiles();
};

/*
  Resets the game state. This prevents having to create multiple Game objects.
*/
Calendar.prototype.reset = function() {
  this.grid = new Grid(this.gridSize);
  this.grid.init();
  this.graphicsManager.drawBoard();
  this.graphicsManager.drawTiles();
  this.inputManager.bind();
};
