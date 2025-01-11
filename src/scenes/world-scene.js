import Phaser from '../lib/phaser.js';
import { WORD_ASSET_KEYS } from '../assets/asset-keys.js';
import { SCENE_KEYS } from "./scene-keys.js";
import { Player } from '../world/characters/player.js';

const TILE_SIZE = 64;

/**@type {import('../types/typedef.js').Coordinate} */
const PLAYER_POSITION = Object.freeze({
    x: 1 * TILE_SIZE,
    y: 1 *  TILE_SIZE,
});

export class WorldScene extends Phaser.Scene{

    #player;

  constructor() {
    super({
      key: SCENE_KEYS.WORLD_SCENE,
    });
  }

  create(){
    this.add.image(0,0, WORD_ASSET_KEYS.WORLD_BACKGROUND, 0).setOrigin(0);
    this.#player = new Player({
        scene: this,
        position: PLAYER_POSITION,
    });
  }
}