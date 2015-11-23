/*
  Constructs an empty 4 by 4 grid.
*/
function Grid(xSize, ySize) {
  this.xSize = xSize;
  this.ySize = ySize;
  this.tiles = [];
  for(var i = 0; i < xSize; i++) {
    this.tiles[i] = [];
  }
};

/*
  Initializes the grid with two tiles.
*/
Grid.prototype.init = function() {
  // TODO: implement initial calendar
};

/*
  Iterator for the tiles in the grid, applies the given function
  to all tiles in the grid. The order of iteration is decided by
  the direction parameter
*/
Grid.prototype.eachCell = function(dir, fun) {
  if(!dir || dir < 2) {
    for (var i = this.xSize-1; i >= 0; i--) {
      for (var j = this.ySize-1; j >= 0; j--) {
        fun(i, j, this.tiles[i][j]);
      };
    };
  } else {
    for (var i = 0; i < this.xSize; i++) {
      for (var j = 0; j < this.ySize; j++) {
        fun(i, j, this.tiles[i][j]);
      };
    };
  };
};

/*
  Inserts the tile in the grid in the correct cell
*/
Grid.prototype.insertTile = function(tile) {
  this.tiles[tile.x][tile.y] = tile;
};

/*
  Removes the tile from the grid, does nothing when passed null
*/
Grid.prototype.removeTile = function(tile) {
  this.tiles[tile.x][tile.y] = null;
};

/*
  Updates the position of the specified tile, without removing it from the grid.
*/
Grid.prototype.updateTileLevel = function(tile, newLevel) {
  tile = this.getTile({x : tile.x, y: tile.y});
  if(tile)
    tile.level = newLevel;
}

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
