function Grid(tile_levels, xSize, ySize) {
  this.xSize = xSize;
  this.ySize = ySize;
  this.tiles = [];
  this.maxLevel = 0;
  for(var i = 0; i < xSize; i++) {
    this.tiles[i] = [];
  };
  var self = this;
  this.eachTile(function(x, y, _) {
    if(tile_levels[x] && tile_levels[x][y]) {
      self.generateTile(x,y,tile_levels[x][y]);
    }
  });
};

function Tile(position, level) {
  this.x = position.x;
  this.y = position.y;
  this.level = level;
};

Grid.prototype.eachTile = function(f) {
  for (var i = this.xSize-1; i >= 0; i--) {
    for (var j = this.ySize-1; j >= 0; j--) {
      f(i, j, this.tiles[i][j]);
    };
  };
};

Grid.prototype.generateTile = function(x, y, level) {
  this.tiles[x][y] = new Tile({ x : x, y : y }, level);
  if(level > this.maxLevel)
      this.maxLevel = level;
};
