/*
  Constructs a new tile.
*/
function Tile(position, level) {
  this.x = position.x;
  this.y = position.y;
  this.level = level;
};

/*
  Updates the position of the tile.
*/
Tile.prototype.updatePosition = function(position) {
  this.x = position.x;
  this.y = position.y;
};
