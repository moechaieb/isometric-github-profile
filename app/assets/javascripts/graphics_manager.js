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
    scale : 27,
    translation : { 
      x : -12, 
      y : 12, 
      z : 0 
    },
    boardColors : [ 
      new Color(128, 128, 128), 
      new Color(200, 200, 200) 
    ],
    tileColors : [
      new Color(238, 238, 238),
      new Color(214, 230, 133),
      new Color(140, 198, 101),
      new Color( 68, 163,  64),
      new Color( 30, 104,  35)
    ]
  }
  
  this.dimensions = {
    x : grid.xSize,
    y : grid.ySize,
    squareSide : 0.8,
    space : 0.2,
    thickness : 0.1
  }

  this.iso.scale = this.config.scale;
};

/*
  Draws the tile at the correct location
*/
GraphicsManager.prototype.add = function(shape, color) {
  var config = this.config;
  return this.iso.add(
    shape.translate(
      config.translation.x,
      config.translation.y,
      config.translation.z
    ), 
    color
  );
};

/*
  Draws the board on which the tiles will be drawn.
*/
GraphicsManager.prototype.drawBoard = function() {
  var dim = this.dimensions;
  var config = this.config;

  this.add(
    Shape.Prism(
      Point(
        - dim.thickness,
        - dim.thickness,
        0
      ), 
      dim.x * dim.squareSide + (dim.x + 1) * dim.space, 
      dim.y * dim.squareSide + (dim.y + 1) * dim.space, 
      dim.thickness
    ),
    config.boardColors[1]
  );

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
            (i + 1) * (dim.squareSide + dim.space),
            j    *    (dim.squareSide + dim.space) + dim.space, 
            0
          ),
          Point(
            (i + 1) * (dim.squareSide + dim.space), 
            (j + 1) * (dim.squareSide + dim.space), 
            0
          ),
          Point(
            i    *    (dim.squareSide + dim.space) + dim.space, 
            (j + 1) * (dim.squareSide + dim.space), 
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
GraphicsManager.prototype.make3DTile = function(tile) {
  var dim = this.dimensions;
  var config = this.config;

  return Shape.Prism(
    Point(
      tile.x * (dim.squareSide + dim.space) + dim.space,
      tile.y * (dim.squareSide + dim.space) + dim.space
    ),
    dim.squareSide, 
    dim.squareSide, 
    (tile.level + 0.1) * dim.thickness
  );
};

/*
  Draws the 3D representation of a tile object.
*/
GraphicsManager.prototype.drawTile = function(tile) {
  if(tile)
      this.add(this.make3DTile(tile), this.getTileColor(tile));
};

/*
  Draws all tiles in the grid.
*/
GraphicsManager.prototype.drawTiles = function() {
  var self = this;
  this.grid.eachCell(function(_, _, tile) {
    self.drawTile(tile);
  });
};

/*
  Computes the color of the tile.
*/
GraphicsManager.prototype.getTileColor = function(tile) {
  var max = this.grid.maxLevel;
  var level = tile.level;
  var config = this.config;
  return config.tileColors[
    Math.floor((1 - ((max - level) / max)) * (config.tileColors.length - 1))
  ];
}
