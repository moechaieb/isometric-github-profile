/*
  Constructs an empty 4 by 4 grid.
*/
function Grid(xSize, ySize) {
  this.xSize = xSize;
  this.ySize = ySize;
  this.tiles = [];
  this.maxLevel = 0;
  for(var i = 0; i < xSize; i++) {
    this.tiles[i] = [];
    for(var j = 0; j < ySize; j++) {
      this.insertTile(
        new Tile(
          { x : i, y : j },
          Math.floor(Math.random() * 50)
        )
      );
    }
  }
};

/*
  Iterator for the tiles in the grid, applies the given function
  to all tiles in the grid. The order of iteration is decided by
  the direction parameter
*/
Grid.prototype.eachCell = function(fun) {
  for (var i = this.xSize-1; i >= 0; i--) {
    for (var j = this.ySize-1; j >= 0; j--) {
      fun(i, j, this.tiles[i][j]);
    };
  };
};

/*
  Inserts the tile in the grid in the correct cell
*/
Grid.prototype.insertTile = function(tile) {
  this.tiles[tile.x][tile.y] = tile;
  if(tile.level > this.maxLevel)
    this.maxLevel = tile.level;
};

/*
  Removes the tile from the grid, does nothing when passed null
*/
Grid.prototype.removeTile = function(tile) {
  this.tiles[tile.x][tile.y] = null;
};

Grid.prototype.isOutOfBounds = function(pos) {
  return (pos.x >= this.xSize || pos.y >= this.ySize || pos.x < 0 || pos.y < 0);
}

Grid.prototype.getTile = function(pos) {
  if(this.isOutOfBounds(pos))
    return false;
  return this.tiles[pos.x][pos.y];
}

/*
  Generates a new tile at a random position and adds it to the grid
*/
Grid.prototype.generateTile = function(pos, level) {
  this.insertTile(new Tile(pos, level));
};
