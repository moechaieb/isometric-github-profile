/*
  Constructs an empty x by y grid.
*/
function Grid(tile_levels, xSize, ySize) {
  this.xSize = xSize;
  this.ySize = ySize;
  this.tiles = [];
  this.maxLevel = 0;
  for(var i = 0; i < xSize; i++) {
    this.tiles[i] = [];
  };
  var self = this;
  this.eachCell(function(x, y, _) {
    if(tile_levels[x] && tile_levels[x][y]) {
      self.generateTile(x,y,tile_levels[x][y]);
    }
  });
};

/*
  Constructs a new tile.
*/
function Tile(position, level) {
  this.x = position.x;
  this.y = position.y;
  this.level = level;
};

/*
  Iterator for the tiles in the grid, applies the given function
  to all tiles in the grid.
*/
Grid.prototype.eachCell = function(f) {
  for (var i = this.xSize-1; i >= 0; i--) {
    for (var j = this.ySize-1; j >= 0; j--) {
      f(i, j, this.tiles[i][j]);
    };
  };
};

/*
  Generates a new tile at a position (x,y) and adds it to the grid
*/
Grid.prototype.generateTile = function(x, y, level) {
  this.tiles[x][y] = new Tile({ x : x, y : y }, level);
  if(level > this.maxLevel)
      this.maxLevel = level;
};

/*
  Removes the tile from the grid
*/
Grid.prototype.removeTile = function(x, y) {
  if(x >= 0 && x < this.xSize && y >= 0 && y < this.ySize)
    this.tiles[x][y] = null;
};
