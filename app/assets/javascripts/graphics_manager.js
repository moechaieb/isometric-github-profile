window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/*
  Convenient renames.
*/
var Point = Isomer.Point;
var Path  = Isomer.Path;
var Shape = Isomer.Shape;
var Color = Isomer.Color;

/*
  Constucts a GraphicsManager object, wrapping an Isomer instance
*/
function GraphicsManager(grid) {
  this.iso = new Isomer(document.getElementById('calendar'));
  this.grid = grid;

  this.config = {
    scale : 25,
    translation : { 
      x : -12, 
      y : 12, 
      z : 0 
    },
    boardColors : [ 
      new Color(64, 64, 64), 
      new Color( 0,  0,  0) 
    ],
    colorProgression : [
      new Color(230, 230, 230)
    ]
  }
  
  this.animation = {
    refreshRate : 4,
    refreshCounter : 0,
    angle : 0,
    dTheta : 0,
  }
  
  this.dimensions = {
    x : grid.xSize,
    y : grid.ySize,
    squareSide : 0.7,
    space : 0.3,
    thickness : 0.1
  }

  this.iso.scale = this.config.scale;
};

/*
  Draws the tile at the correct location (takes into account rotation angle)
*/
GraphicsManager.prototype.add = function(shape, color) {
  var config = this.config;
  return this.iso.add(
    shape.rotateZ(
      this.getSceneCenter(),
      this.animation.angle
    ).translate(
      config.translation.x,
      config.translation.y,
      config.translation.z
    ), 
    color
  );
};

/*
  Draws the board on which the tiles will move.
*/
GraphicsManager.prototype.drawBoard = function() {
  var dim = this.dimensions;
  var config = this.config;
  // Draw the board
  this.add(
    Shape.Prism(
      Point(
        -dim.thickness,
        -dim.thickness,
        0
      ), 
      dim.x * dim.squareSide + (dim.x + 1) * dim.space, 
      dim.y * dim.squareSide + (dim.y + 1) * dim.space, 
      dim.thickness
    ),
    config.boardColors[1]
  );
  // Draw the tiles
  for (var i = dim.x - 1; i >= 0; i--) {
    for (var j = dim.y - 1; j >= 0; j--) {
      this.add(
        new Path([
          Point(
            i * (dim.squareSide + dim.space) + dim.space, 
            j * (dim.squareSide + dim.space) + dim.space, 
            0
          ), 
          Point(
            i * (dim.squareSide + dim.space) + dim.space + dim.squareSide,
            j * (dim.space + dim.squareSide) + dim.space, 
            0
          ),
          Point(
            i * (dim.squareSide + dim.space) + dim.space + dim.squareSide, 
            j * (dim.space + dim.squareSide) + dim.space + dim.squareSide, 
            0
          ),
          Point(
            i * (dim.squareSide + dim.space) + dim.space, 
            j * (dim.space + dim.squareSide) + dim.squareSide + dim.space, 
            0
          )
        ]),
        config.boardColors[0]
      );
    };
  };
};

/*
  Contructs a 3D tile representation of a tile object.
*/
GraphicsManager.prototype.makeTile3D = function(tile) {
  var dim = this.dimensions;
  var config = this.config;
  return Shape.Prism(
    Point(
      tile.x * (dim.squareSide + dim.space) + dim.space,
      tile.y * (dim.squareSide + dim.space) + dim.space
    ),
    dim.squareSide, 
    dim.squareSide, 
    Math.pow(2, tile.level) * dim.thickness
  );
};

/*
  Draws all tiles in the grid on the board.
*/
GraphicsManager.prototype.drawTiles = function() {
  var self = this;
  this.iso.canvas.clear();
  this.drawBoard();
  this.grid.eachCell(null, function(x,y,tile) {
    if(tile)
      self.add(self.makeTile3D(tile), self.config.colorProgression[tile.level]);
  });
};

/*
  Prepares the structures before rotating the scene. Must be called before rotateScene()!
*/
GraphicsManager.prototype.preRotate = function(dir) {
  this.dt = Math.PI / (refreshRate * 12);
};

/*
  Rotates the scene to the right or left and then back to its initial position.
*/
GraphicsManager.prototype.rotateScene = function() {
  var animation = this.animation;
  var id = window.requestAnimationFrame(this.rotateScene.bind(this));
  this.iso.canvas.clear();
  animation.angle += animation.dTheta;
  this.drawBoard();
  this.drawTiles();
  if(animation.refreshCounter === animation.refreshRate * 24) {
    animation.refreshCounter = 0;
    animation.dTheta = 0;
    window.cancelAnimationFrame(id);
  };
  animation.refreshCounter++;
};

/*
  Returns the center of the scene.
*/
GraphicsManager.prototype.getSceneCenter = function() {
  return Point(
    2 * this.dimensions.squareSide + 2.5 * this.dimensions.space - this.config.translation.x, 
    2 * this.dimensions.squareSide + 2.5 * this.dimensions.space + this.config.translation.y, 
    this.config.translation.z
  );
}
