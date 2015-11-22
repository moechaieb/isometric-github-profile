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
  Important constants.
  For animations to work, the following must be an integer: refreshRate * (squareSide + space)
*/
var squareSide = 0.7;
var thickness = 0.1;
var refreshRate = 4;
var elevation = 3;
var space = 0.3;
var initTranslate = 12;
var center = Point(
  2 * squareSide + 2.5 * space - initTranslate, 
  2 * squareSide + 2.5 * space + initTranslate, 
  0
);

var boardcolors = [
  new Color(64, 64, 64),
  new Color( 0,  0,  0)
];

var progression = [
  new Color(230, 230, 230),
  new Color(220, 180, 160),
  new Color(210, 120, 110),
  new Color(255,  70,  70),
  new Color(255,   0,   0),
  new Color(255, 255, 150),
  new Color(255, 230, 110),
  new Color(255, 210,  50),
  new Color(255, 195,  15),
  new Color(230, 150,  60),
  new Color(230, 110,  25)
];

/*
  Constucts a GraphicsManager object, wrapping an Isomer object
*/
function GraphicsManager(grid) {
  this.iso = new Isomer(document.getElementById('calendar'));
  this.iso.scale = 25;
  this.dt = 0;
  this.tile3Ds = [];
  this.refreshCounter = 1;
  this.angle = 0;
  this.grid = grid;
  this.xSize = grid.xSize;
  this.ySize = grid.ySize;
};

/*
  Draws the board on which the tiles will move.
*/
GraphicsManager.prototype.drawBoard = function() {
  //add board
  this.add(
    Shape.Prism(
      Point(
        -thickness - initTranslate,
        -thickness + initTranslate,
        0
      ), 
      this.xSize * squareSide + (this.xSize + 1) * space, 
      this.ySize * squareSide + (this.ySize + 1) * space, 
      thickness
    ), 
    null, 
    boardcolors[1]
  );
  //initialize the squares
  for (var i = this.xSize - 1; i >= 0; i--) {
    for (var j = this.ySize - 1; j >= 0; j--) {
      this.add(
        new Path([
          Point(
            i * (squareSide + space) + space - initTranslate, 
            j * (squareSide + space) + space + initTranslate, 
            0
          ), 
          Point(
            i * (squareSide + space) + space + squareSide - initTranslate,
            j * (space + squareSide) + space + initTranslate, 
            0
          ),
          Point(
            i * (squareSide + space) + space + squareSide - initTranslate, 
            j * (space + squareSide) + space + squareSide + initTranslate, 
            0
          ),
          Point(
            i * (squareSide + space) + space - initTranslate, 
            j * (space + squareSide) + squareSide + space + initTranslate, 
            0
          )
        ]), 
        null, 
        boardcolors[0]
      );
    };
  };
};

/*
  Contructs a 3D tile representation of a tile object.
*/
GraphicsManager.prototype.makeTile3D = function(tile) {
  return Shape.Prism(
    Point(
      tile.x * (squareSide + space) + space - initTranslate,
      tile.y * (squareSide + space) + space + initTranslate
    ),
    squareSide, 
    squareSide, 
    Math.pow(2, tile.level) * thickness
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
      self.add(self.makeTile3D(tile), null, progression[tile.level]);
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
  var id = window.requestAnimationFrame(this.rotateScene.bind(this));
  this.iso.canvas.clear();
  this.angle += this.dt;
  this.drawBoard();
  this.drawTiles();
  if(this.refreshCounter === refreshRate * 24) {
    this.refreshCounter = 0;
    this.dt = 0;
    window.cancelAnimationFrame(id);
  };
  this.refreshCounter++;
};

/*
  Draws the tile at the correct location (takes into account rotation angle)
*/
GraphicsManager.prototype.add = function(shape, translation, color) {
  if(!translation) {
    this.iso.add(
      shape.rotateZ(
        center,
        this.angle
      ), 
      color
    );
  }
  else {
    this.iso.add(
      shape.rotateZ(
        center,
        this.angle
      ).translate(
        translation.x,
        translation.y,
        translation.z
      ), 
      color
    );
  }
};
